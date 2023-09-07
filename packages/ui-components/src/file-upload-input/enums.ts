export enum FileType {
  FILE = "FILE",
  IMAGE = "IMAGE",
}

export enum FileErrorType {
  INVALID_TYPE = "file-invalid-type",
  FILE_TOO_LARGE = "file-too-large",
}

export enum FileErrorText {
  INVALID_TYPE_TXT = "Invalid file format",
  FILE_TOO_LARGE_TXT = "File exceeds the maximum upload size",
}
