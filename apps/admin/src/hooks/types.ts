export type IdAndLink = {
  id: string;
  link: string;
};

export type UploadOptions = {
  maxRetries?: number;
  retryCount?: number;
};

export type UseFileUploadReturn = {
  loading: boolean;
  getPresignedUrls: (
    fileNames: string[],
    skip?: boolean
  ) => Promise<Array<IdAndLink | null>>;
  uploadFile: (file: File, presignedUrl: string) => Promise<boolean>;
  getUrlsAndUpload: (
    files: Array<File | null>,
    options?: UploadOptions
  ) => Promise<Array<IdAndLink | null>>;
  uploadChangedFiles: (
    files: FileUpload[],
    options?: UploadOptions
  ) => UploadChangedFilesReturn | null;
};

export type UploadChangedFilesReturn = Promise<
  Array<IdAndLink | { id: null; link: null } | null>
>;

export type FileUpload = {
  newFile: File;
  previousFileName: string;
};

export type UploadFilesWithRetry = (
  url: string,
  files: File,
  maxRetries?: number,
  retryCount?: number
) => Promise<boolean>;
