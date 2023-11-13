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
  const [isFileUploading, setIsFileUploading] = useState(false);

  const getPresignedUrls = async (
    fileNames: string[]
  ): Promise<Array<IdAndLink | null>> => {
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

    const uploaded = await axios.put<IdAndLink>(presignedUrl, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log({ uploaded });

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
      if (!presignedUrl?.link || !currentFile) return false;

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

  const uploadChangedFiles = async (
    files: FileUpload[],
    options?: UploadOptions
  ) => {
    setIsFileUploading(true);
    const indexes: number[] = [];

    const fileNames = files
      .filter((file, index) => {
        if (file.newFile.name !== file.previousFileName) {
          return true;
        }

        indexes.push(index);
        return false;
      })
      .map((file) => file.newFile.name);

    const presignedUrls = await getPresignedUrls(fileNames);

    const uploadPromises = presignedUrls.map((presignedUrl, index) => {
      const currentFile = files[index];
      if (!presignedUrl?.link || !currentFile) return false;

      return uploadFilesWithRetry(
        presignedUrl.link,
        currentFile.newFile,
        options?.maxRetries,
        options?.retryCount
      );
    });

    await Promise.all(uploadPromises);

    const returnUrls = files.map((_, index) => {
      if (!indexes.includes(index)) {
        return presignedUrls[index];
      }

      return {
        id: null,
        link: null,
      };
    });

    setIsFileUploading(false);

    return returnUrls;
  };

  return {
    loading: loading || isFileUploading,
    getPresignedUrls,
    uploadFile,
    getUrlsAndUpload,
    uploadChangedFiles,
  };
};

export default useFileUpload;
