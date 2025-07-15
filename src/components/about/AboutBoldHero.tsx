"use client";
import { ActionBtnType } from "@/types";
import WebAboutTop from "@/components/about/WebAboutTop";
import ImageComponent from "../tools/ImageComponent";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";

type Props = {
  data: {
    image?: string;
    title: string;
    subTitle: string;
    description: string;
    shape1: {
      dark: string;
      light: string;
    };
    clients_thumb: {
      dark: string;
      light: string;
    };
    total_clients: string;
    action_btn: ActionBtnType;
    gallery: string[];
  };
};

const AboutBoldHero = ({ data }: Props) => {
  const { image, gallery } = data;
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  return (
    <section className="pt-[80px] 2xl:pt-[100px]" ref={containerRef}>
      <div className="overflow-hidden">
       
      </div>
      <div className="inner-container">
        <div className="section-spacing-top relative">
          <WebAboutTop {...data} />

          <div className="grid gap-[15px] lg:gap-[30px] flex-col md:flex-row mt-[40px] sm:mt-[-90px] lg:mt-[-120px] xl:mt-[-170px]">
            <div className="z-[-1] has_fade_anim grid gap-[30px] grid-cols-1 sm:grid-cols-[180px] lg:grid-cols=[240px] xl:grid-cols-[310px] 2xl:grid-cols-[410px] justify-end">
              <div>
                {gallery?.[0] && (
                 
                )}
              </div>
            </div>
            <div className="has_fade_anim grid gap-[15px] lg:gap-[30px] sm:grid-cols-[1fr,180px] lg:grid-cols-[1fr,240px] xl:grid-cols-[1fr,310px] 2xl:grid-cols-[1fr,410px] sm:ms-[calc((100vw-var(--container-max-widths))/-2-12px)]">
              <div>
                {gallery?.[1] && (
                 
                )}
              </div>
              <div>
                {gallery?.[2] && (
                 
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBoldHero;
