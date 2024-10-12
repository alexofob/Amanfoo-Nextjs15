import { useCallback, useState } from "react";
import { type Area, type Point } from "react-easy-crop";

import getCroppedImg from "@/components/layout/crop-image";
import { toast } from "@/components/ui/use-toast";

type Props = {
  preview: string | null;
  setPreview: (value: string) => void;
  showCropModal: (value: boolean) => void;
  showUploadModal: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFile: (file: File) => void;
};

export function useImageCropModal({
  preview,
  setPreview,
  setFile,
  showCropModal,
  showUploadModal,
}: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const [isCropping, setIsCropping] = useState(false);

  const cropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setIsCropping(true);
    try {
      const { file, url } = await getCroppedImg(preview, croppedAreaPixels, rotation);
      setPreview(url);
      setFile(file);
      showCropModal(false);
      showUploadModal(true);
    } catch (e) {
      toast({
        title: "Photo Crop Failed!",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error(e);
    }
    setIsCropping(false);
  };

  const handleCancel = useCallback(() => {
    showCropModal(false);
  }, [showCropModal]);

  return {
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
  };
}
