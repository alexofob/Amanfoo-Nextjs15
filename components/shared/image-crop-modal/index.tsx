"use client";

import { Loader2 } from "lucide-react";
import Cropper from "react-easy-crop";

import Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

import { useImageCropModal } from "./image-crop-modal.hooks";

type Props = {
  preview: string | null;
  cropModal: boolean;
  showCropModal: (value: boolean) => void;
  showUploadModal: (value: boolean) => void;
  setPreview: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFile: (file: File) => void;
  aspect?: number;
};

export default function ImageCropModal({
  preview,
  cropModal,
  showUploadModal,
  showCropModal,
  setPreview,
  setFile,
  aspect = 1 / 1,
}: Props) {
  const {
    crop,
    zoom,
    rotation,
    setCrop,
    setRotation,
    cropComplete,
    setZoom,
    handleCancel,
    isCropping,
    cropImage,
  } = useImageCropModal({ preview, setPreview, showUploadModal, showCropModal, setFile });
  return (
    <Dialog open={cropModal} onOpenChange={showCropModal}>
      <DialogTrigger asChild>
        <div className="absolute left-0 top-0 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-primary/40 text-white opacity-0 group-hover:opacity-100 dark:bg-secondary/40">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-xs hover:bg-transparent hover:text-white"
            asChild
          >
            <Icons.edit className="mr-1 h-3 w-3" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Image Crop</DialogTitle>
        </DialogHeader>
        <div className="relative h-52 w-full sm:h-96">
          {preview ? (
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={cropComplete}
              onZoomChange={setZoom}
            />
          ) : null}
        </div>
        <div className="mx-3 my-2 flex flex-col">
          <div className="mb-1 w-full">
            <p className="mb-3">Zoom: {zoomPercent(zoom)}</p>
            <Slider
              defaultValue={[zoom]}
              max={3}
              min={1}
              step={0.1}
              aria-labelledby="Zoom"
              onValueChange={([zoom]) => setZoom(zoom)}
            />
          </div>
          <div className="mt-5 w-full">
            <p className="mb-3">Rotate: {rotation + "°"}</p>
            <Slider
              defaultValue={[rotation]}
              max={360}
              min={0}
              aria-labelledby="Rotate"
              onValueChange={([rotation]) => setRotation(rotation)}
            />
          </div>
        </div>

        <DialogFooter>
          <div className="mt-10">
            <Button
              onClick={handleCancel}
              className="mr-10 text-destructive hover:text-destructive"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isCropping} onClick={cropImage} className="ml-10">
              {isCropping ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cropping...
                </>
              ) : (
                "Crop"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}%`;
};
