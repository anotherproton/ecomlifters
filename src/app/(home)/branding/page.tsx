"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BrandingRedirect = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to homepage since branding is now the homepage
    router.replace("/");
  }, [router]);

  return <div>Redirecting to homepage...</div>;
};

export default BrandingRedirect;
