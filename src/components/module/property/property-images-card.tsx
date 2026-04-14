"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeletePropertyImage,
  useUploadPropertyImages,
} from "@/hooks/useProperties";
import { Images } from "@/types/property.type";
import Image from "next/image";
import { useState } from "react";

const PropertyImageCard = ({
  propertyId,
  images,
}: {
  propertyId: string;
  images: Images[];
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const { mutate: addImage, isPending } = useUploadPropertyImages(propertyId);

  const { mutate: deleteImage, isPending: isDeleting } =
    useDeletePropertyImage(propertyId);

  const handleUpload = () => {
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    addImage(formData);
  };

  return (
    <div className="border p-4 rounded-2xl" data-property-id={propertyId}>
      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No images yet. Add your first image.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 overflow-x-auto">
          {images.map((img) => (
            <div key={img.id} className="flex flex-col gap-2">
              <div className="w-full h-48 relative">
                <Image
                  src={img.url}
                  alt="Property image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <Button
                onClick={() => deleteImage(img.id)}
                variant="destructive"
                size="sm"
                disabled={isDeleting}
              >
                Delete Image
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4 flex justify-end mt-2">
        {/* Add Image Button */}
        {!showUpload ? (
          <Button onClick={() => setShowUpload(true)}>Add Image</Button>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Images</h3>
              <Button variant="outline" onClick={() => setShowUpload(false)}>
                Cancel
              </Button>
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const selectedFiles = e.target.files
                  ? Array.from(e.target.files)
                  : [];
                setFiles(selectedFiles);
              }}
            />
            {files.length > 0 && (
              <ul className="mt-2 text-sm list-disc pl-4">
                {files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
            <Button
              onClick={handleUpload}
              disabled={isPending}
              className="mt-4"
            >
              {isPending ? "Uploading..." : "Upload Images"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImageCard;
