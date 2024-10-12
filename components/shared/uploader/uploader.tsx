"use client";

import { type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { type DropzoneInputProps, type DropzoneRootProps } from "@uploadthing/react";
import { Loader2 } from "lucide-react";

import Icons from "@/components/shared/icons";
import ImageCropModal from "@/components/shared/image-crop-modal";
import { Button } from "@/components/ui/button";
import { type Business } from "@/domain/models/business";

type Props = {
  handleUpload: (business: Business) => () => void;
  handleCancel: () => void;
  isUploading: boolean;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  cropModal: boolean;
  showCropModal: Dispatch<SetStateAction<boolean>>;
  preview: string | null;
  setPreview: Dispatch<SetStateAction<string | null>>;
  setFile: Dispatch<SetStateAction<File | null | undefined>>;
  setFileName: Dispatch<SetStateAction<string | null | undefined>>;
  uploadedImage: string | null;
  business: NonNullable<Business>;
  aspect?: number;
  imageClassName?: string;
  backgroundWidthClassName?: string;
};

export default function Uploader({
  preview,
  getRootProps,
  getInputProps,
  cropModal,
  showCropModal,
  setPreview,
  setFile,
  isUploading,
  handleCancel,
  uploadedImage,
  handleUpload,
  business,
  aspect = 16 / 9,
  imageClassName = "",
  backgroundWidthClassName = "w-64",
}: Props) {
  if (!preview) {
    return (
      <div
        className=" flex h-60 items-center justify-center border border-dashed focus-visible:outline-none "
        {...getRootProps()}
      >
        <input className="" {...getInputProps()} />
        <div className=" space-y-2 text-center">
          <div className="flex cursor-pointer flex-col items-center gap-y-2">
            <span className=" text-md">Drop Here</span>
            <Icons.download size={40} />
          </div>
          <p className=" text-muted-foreground">OR</p>
          <p className=" cursor-pointer text-sm">Click here</p>
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className={`relative h-40  ${backgroundWidthClassName}`}>
        <Image src={preview} alt="File preview" className={imageClassName} loading="lazy" fill />
        <ImageCropModal
          showUploadModal={() => null}
          aspect={aspect}
          {...{
            preview,
            cropModal,
            showCropModal,
            setPreview,
            setFile,
          }}
        />
      </div>
      <div className=" mt-10">
        {!isUploading && (
          <Button
            onClick={handleCancel}
            className="text hover:text-accent-foreground"
            variant="outline"
          >
            Change
          </Button>
        )}
        {Boolean(preview) && !Boolean(uploadedImage) ? (
          <Button disabled={isUploading} onClick={handleUpload(business)} className="ml-10">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
