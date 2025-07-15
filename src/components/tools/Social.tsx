import Link from "next/link";

// icons
import {
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";

// lib
import { cn } from "@/lib/utils";

type SocialType = {
  name: string;
  link: string;
  value?: string;
};

export const SocialShare1 = (item: SocialType, className?: string) => {
  switch (item.name) {
    case "Tw":
      return (
        <Link
          href={item.link}
          target="_blank"
          key={item.link}
          className={cn("relative z-10", className)}
        >
          <FaTwitter />
        </Link>
      );
    case "In":
      return (
        <Link
          href={item.link}
          target="_blank"
          key={item.link}
          className={cn("relative z-10", className)}
        >
          <FaInstagram />
        </Link>
      );
    default:
      return null;
  }
};
