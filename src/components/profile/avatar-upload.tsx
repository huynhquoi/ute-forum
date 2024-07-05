import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import useFirebase from '@/hooks/useFirebase';
import { Input } from '../ui/input';

// Định nghĩa types ở đây nếu cần
type Point = { x: number; y: number };
type Area = { x: number; y: number; width: number; height: number };

interface AvatarUploadProps {
  onUploadComplete: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onUploadComplete }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { uploadFile, setProgressCallback } = useFirebase();

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setIsOpen(true);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
      }, 'image/jpeg');
    });
  };

  const onUpload = useCallback(async () => {
    if (image && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        const file = new File([croppedImage], 'avatar.jpg', { type: 'image/jpeg' });
        
        setProgressCallback((progress) => {
          console.log(`Upload is ${progress}% done`);
        });

        const url = await uploadFile(file, 'avatars');
        onUploadComplete(url as string);
        setIsOpen(false);
      } catch (e) {
        console.error(e);
      }
    }
  }, [image, croppedAreaPixels, uploadFile, onUploadComplete, setProgressCallback]);

  return (
    <>
      <Input type="file" accept="image/*" onChange={onFileChange} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cắt ảnh đại diện</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-64">
            {image && (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={onUpload}>Tải lên</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarUpload;