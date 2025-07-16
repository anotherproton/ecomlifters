"use client";

import siteConfig from "@/config/siteConfig.json";
import { usePathname } from "next/navigation";

const SeoData = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
}: {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}) => {
  const { meta_image, meta_author, meta_description } = siteConfig.metadata;
  const { base_url, title: site_title } = siteConfig.site_info;
  const pathname = usePathname();

  const finalTitle = meta_title ? meta_title : title ? title : site_title;
  const finalDescription = description ? description : meta_description;
  const finalImage = image ? image : meta_image;
  const fullImageUrl = `${base_url}${finalImage}`;

  return (
    <>
      {/* title */}
      <title>{finalTitle}</title>

      {/* canonical url */}
      {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

      {/* noindex robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* meta-description */}
      <meta name="description" content={finalDescription} />

      {/* author from config.json */}
      <meta name="author" content={meta_author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site_title} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={`${base_url}${pathname}`} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={`${site_title} - ${finalTitle}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ecomlifters" />
      <meta name="twitter:creator" content="@ecomlifters" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${site_title} - ${finalTitle}`} />

      {/* WhatsApp specific */}
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={fullImageUrl} />
    </>
  );
};

export default SeoData;
