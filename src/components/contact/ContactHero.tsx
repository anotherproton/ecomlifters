"use client";

import { convertWithBr } from "@/lib/helper/converter";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import Link from "next/link";

type Props = {
  title: string;
  direct_contact: {
    title: string;
    link: string;
  };
  images: string[];
};

const ContactHero = ({ title, direct_contact, images }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );
  return (
    <section className="inner-container" ref={containerRef}>
      <div className="pt-[127px] xl:pt-[147px] 2xl:pt-[217px] pb-[30px] md:me-[calc((100vw-var(--container-max-widths))/-2-3px)]">
        <div className="grid gap-y-10 gap-x-[60px] lg:grid-cols-[1fr_580px] xl:grid-cols-[1fr_840px] 2xl:grid-cols-[1fr_960px]">
          {/* <h1
            className="inner-section-title large has_fade_anim 2xl:!text-[120px] !leading-[0.94]"
            dangerouslySetInnerHTML={convertWithBr(title)}
          /> */}
         
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
