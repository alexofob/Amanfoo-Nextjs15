import Image from "next/image";
import { type AvatarProps } from "@radix-ui/react-avatar";

import Icons from "@/components/shared/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Senior } from "@/domain/models/senior";

interface UserAvatarProps extends AvatarProps {
  user: Pick<Senior, "imageUrl" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.imageUrl ? (
        <Image
          src={user.imageUrl ?? "/avatar.png"}
          alt={user.name || "Picture"}
          width={50}
          height={50}
          className="aspect-square h-full w-full"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name ?? ""}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
