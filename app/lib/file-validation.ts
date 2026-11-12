export const MAX_UPLOAD_FILE_SIZE = 12 * 1024 * 1024;

export function splitFilesBySize(files: File[], maxSize = MAX_UPLOAD_FILE_SIZE) {
  return {
    accepted: files.filter((file) => file.size <= maxSize),
    rejected: files.filter((file) => file.size > maxSize),
  };
}
