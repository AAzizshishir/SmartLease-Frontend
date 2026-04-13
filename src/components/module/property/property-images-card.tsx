"use client";
import { Button } from "@/components/ui/button";
import { Images } from "@/types/property.type";
import Image from "next/image";
import Link from "next/link";

const PropertyImageCard = ({
  propertyId,
  images,
}: {
  propertyId: string;
  images: Images[];
}) => {
  return (
    <div className="border p-4 rounded-2xl">
      <div className="grid grid-cols-3 gap-2 overflow-x-auto">
        {images.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            alt="Images"
            className="rounded-lg"
            height={400}
            width={300}
          />
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <Button>Add Image</Button>
        <Button>Delete Image</Button>
      </div>
    </div>
  );
};

export default PropertyImageCard;
