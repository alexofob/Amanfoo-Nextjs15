import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { hasFileNameSpaces } from "@/lib/utils";
import { removeImageFromCDN } from "@/app/_actions/file";

const fileTypes = ["image"];

export function useUploader(
  fileUrl: string,
  setFile: Dispatch<SetStateAction<File | null | undefined>>,
  setFileName: Dispatch<SetStateAction<string | null | undefined>>,
) {
  const [preview, setPreview] = useState<string | null>(fileUrl);

  const [cropModal, showCropModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(fileUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length === 0) return;
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      showCropModal(true);
      setFileName(acceptedFiles[0].name);
    },
    [setFileName]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    maxFiles: 1,
    multiple: false,
    validator(file) {
      if (hasFileNameSpaces(file.name)) {
        return {
          code: "Spaces in file name",
          message: "Spaces in file names are not acceptable!",
        };
      }
      return null;
    },
  });

  const handleCancel = useCallback(() => {
    if (preview) {
      setFile(null);
      URL.revokeObjectURL(preview);
      setPreview(null);
      setFileName(null);
    }
    if (uploadedImage) {
      removeImageFromCDN(uploadedImage)
        .then(() => setUploadedImage(null))
        .catch((error) => console.error(error));
    }
  }, [preview, setFile, setFileName, uploadedImage]);

  return {
    handleCancel,
    getRootProps,
    getInputProps,
    cropModal,
    preview,
    showCropModal,
    setPreview,
    setFile,
    uploadedImage,
    setUploadedImage,
  };
}
