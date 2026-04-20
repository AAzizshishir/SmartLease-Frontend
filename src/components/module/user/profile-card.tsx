// components/shared/ProfileCard.tsx
"use client";

import { useState, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { Camera, Pencil, X, Check } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile, useUpdateProfile } from "@/hooks/useUsers";

// ─── Avatar ──────────────────────────────────────────────────

const AvatarSection = ({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative w-20 h-20 mx-auto">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-xl font-semibold text-muted-foreground">
          {initials}
        </div>
      )}

      <button
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 hover:bg-primary/90 transition-colors"
      >
        <Camera className="h-3 w-3" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) updateProfile({ image: file }); // ← useUpdateProfile
        }}
      />
    </div>
  );
};

// ─── Name Edit ───────────────────────────────────────────────

const NameEdit = ({ currentName }: { currentName: string }) => {
  const [editing, setEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm({
    defaultValues: { name: currentName },
    onSubmit: async ({ value }) => {
      if (!value.name.trim() || value.name === currentName) {
        setEditing(false);
        return;
      }
      updateProfile(
        { name: value.name },
        { onSuccess: () => setEditing(false) },
      );
    },
  });

  if (!editing) {
    return (
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg font-semibold">{currentName}</p>
        <button
          onClick={() => setEditing(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex items-center gap-2"
    >
      <form.Field name="name">
        {(field) => (
          <Input
            autoFocus
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            className="h-8 text-center"
          />
        )}
      </form.Field>
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="h-8 w-8"
        disabled={isPending}
      >
        <Check className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="h-8 w-8"
        onClick={() => setEditing(false)}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </form>
  );
};

// ─── Main ────────────────────────────────────────────────────

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  ADMIN: "default",
  LANDLORD: "secondary",
  TENANT: "outline",
};

const ProfileCard = () => {
  const { data, isLoading } = useGetProfile();

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <Skeleton className="w-20 h-20 rounded-full mx-auto" />
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
          <Separator />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const user = data?.data;
  if (!user) return null;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-center">My profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AvatarSection image={user.image} name={user.name} />

        <div className="text-center space-y-1">
          <NameEdit currentName={user.name} />
          <Badge variant={roleBadgeVariant[user.role] ?? "outline"}>
            {user.role}
          </Badge>
        </div>

        <Separator />

        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Email verified
            </span>
            <Badge
              variant={user.emailVerified ? "default" : "destructive"}
              className="text-xs"
            >
              {user.emailVerified ? "Verified" : "Not verified"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge
              variant={user.status === "ACTIVE" ? "default" : "destructive"}
              className="text-xs"
            >
              {user.status}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Member since</span>
            <span className="text-sm">
              {format(new Date(user.createdAt), "dd MMM yyyy")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
