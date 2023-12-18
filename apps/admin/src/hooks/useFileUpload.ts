import axios, { AxiosError } from "axios";
import { useState } from "react";

import { usePresignedUrlLazyQuery } from "~graphql-api";

import {
  FileUpload,
  IdAndLink,
  UploadFilesWithRetry,
  UploadOptions,
  UseFileUploadReturn,
} from "./types";

const useFileUpload = (): UseFileUploadReturn => {
  const [getPresigned, { loading }] = usePresignedUrlLazyQuery({
    fetchPolicy: "network-only",
  });
  const [isFileUploading] = useState(false);

  const getPresignedUrls = async (
    fileNames: string[]
  ): Promise<Array<IdAndLink | null>> => {
    if (!fileNames?.length) return [];

    const { data: links } = await getPresigned({
      fetchPolicy: "network-only",
      variables: {
        fileNames,
      },
    });

    return links?.presignedUrl ?? [];
  };

  const uploadFile = async (
    file: File,
    presignedUrl: string
  ): Promise<boolean> => {
    if (!file?.name || !presignedUrl) return false;

    await axios.put<IdAndLink>(presignedUrl, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  };

  const uploadFilesWithRetry: UploadFilesWithRetry = async (
    url,
    file,
    maxRetries = 0,
    retryCount = 0
  ) => {
    try {
      return await uploadFile(file, url);
    } catch (error) {
      if (
        (error as AxiosError)?.response?.status === 503 &&
        retryCount < maxRetries
      ) {
        return uploadFilesWithRetry(url, file, maxRetries, retryCount + 1);
      }

      throw error;
    }
  };

  const getUrlsAndUpload = async (
    files: Array<File | null>,
    options?: UploadOptions
  ): Promise<Array<IdAndLink | null>> => {
    const fileNames = files.map((file) => file?.name ?? "");

    const presignedUrls = await getPresignedUrls(fileNames);

    const uploadPromises = presignedUrls.map((presignedUrl, index) => {
      const currentFile = files[index];

      if (!presignedUrl?.link || !currentFile) return null;

      return uploadFilesWithRetry(
        presignedUrl.link,
        currentFile,
        options?.maxRetries,
        options?.retryCount
      );
    });

    await Promise.all(uploadPromises);

    return presignedUrls;
  };

  return {
    loading: loading || isFileUploading,
    getPresignedUrls,
    uploadFile,
    getUrlsAndUpload,
  };
};

export default useFileUpload;
