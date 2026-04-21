"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteUnitImage, useUploadUnitImages } from "@/hooks/useUnits";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types/session.type";
import { Unit } from "@/types/unit.type";
import Image from "next/image";
import { useState } from "react";

const UnitImageCard = ({ unitId, unit }: { unitId: string; unit: Unit }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const { mutate: addImage, isPending } = useUploadUnitImages(unitId);

  const { mutate: deleteImage, isPending: isDeleting } =
    useDeleteUnitImage(unitId);

  const handleUpload = () => {
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    addImage(formData);
  };

  const { data: sessionData } = useSession();
  const session = sessionData as AppSession | null;
  const role = session?.user.role;

  return (
    <div className="border p-6 my-2 rounded-2xl" data-unit-id={unitId}>
      {unit?.images.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No images yet. Add your first image.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6 overflow-x-auto">
          {unit?.images.map((img) => (
            <div key={img.id} className="flex flex-col gap-2">
              <div className="w-full h-50 relative">
                <Image
                  src={img.url}
                  alt="Property image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              {unit.status === "vacant" && role === "LANDLORD" && (
                <Button
                  onClick={() => deleteImage(img.id)}
                  variant="destructive"
                  size="sm"
                  disabled={isDeleting}
                >
                  Delete Image
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {unit.status === "vacant" && role === "LANDLORD" && (
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
      )}
    </div>
  );
};

export default UnitImageCard;
