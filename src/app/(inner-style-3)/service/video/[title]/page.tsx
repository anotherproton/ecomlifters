import { notFound } from "next/navigation";
import { getAllPages } from "@/lib/helper/contentConverter";
import { getMainPage } from "@/lib/helper/contentConverter";
import MDXContent from "@/components/tools/MDXContent";
import ClientArea from "@/components/clients/ClientArea";
import SeoData from "@/components/tools/SeoData";
import ContactBanner from "@/components/banner/ContactBanner";
import WebServiceDetails from "@/components/service/web/WebServiceDetails";
import WebServiceDetailsFaq from "@/components/service/web/WebServiceDetailsFaq";

type Props = {
  params: {
    title: string;
  };
};

export const generateStaticParams = () => {
  const services = getAllPages("/services/video");
  const paths = services.map((program) => ({
    title: program.slug,
  }));

  return paths;
};

const service = ({ params }: Props) => {
  const services = getAllPages("/services/video");
  const { data: brands } = getMainPage("/brands/brands1.mdx");

  if (!(services && services.length)) {
    notFound();
  }
  const service = services.find((item) => item.slug === params.title);

  if (!(service && service.data)) {
    notFound();
  }

  const { title, meta, faqs, faq_title, contactTitle, btn_text } =
    service.data || {};

  return (
    <main className="details-bold">
      <SeoData
        title={title}
        meta_title={meta?.meta_title}
        description={meta?.meta_description}
      />
      <WebServiceDetails {...service} />
      <WebServiceDetailsFaq {...service} />
      <div className="web-service-details inner-container">
        <MDXContent content={service.content} />
        <ContactBanner contactTitle={contactTitle} btn_text={btn_text} />
        <ClientArea brands={brands.brands} />
      </div>
    </main>
  );
};

export default service;
