"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import hasTextMovAnim from "@/lib/animation/hasTextMovAnim";
import Link from "next/link";
import Image from "next/image";
import WebSectionTItle from "@/components/sectionTitle/WebSectionTItle";
type Props = {
  contactTitle: string;
  btn_text: string;
  shape?: string;
};

const WebContactBanner = ({ contactTitle, btn_text, shape }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
      hasTextMovAnim();
    },
    { scope: containerRef }
  );

  return (
    <div className="container2" ref={containerRef}>
      <div className="py-[60px] xl:py-[140px] px-[30px] bg-background-3 relative z-[1] overflow-hidden ">
        <div className="shape-1 absolute hidden -right-[6%] md:block w-[270px] top-[-35%] lg:w-[340px] lg:top-[-45%] xl:w-[440px] xl:top-[-15%] z-[-1] ">
          <Image
            src={shape ? shape : "/assets/imgs/shape/img-s-73.png"}
            width={439}
            height={660}
            alt="shape-1"
          />
        </div>
        <div className="text-center">
          <WebSectionTItle
            title={contactTitle}
            className="has_text_mov_anim font-normal leading-[.94] text-text-fixed-2 mx-auto max-w-[450px] lg:max-w-[580px] xl:max-w-[730px] 2xl:max-w-[830px]"
          />
          <div className="has_fade_anim text-center mt-[14px] lg:mt-6 uppercase">
            <Link
              href="/contact-bold"
              className="wc-btn-underline btn-text-flip text-text-fixed-2 gap-[10px] pb-1 text-[14px] leading-none"
            >
              <span data-text={btn_text}>{btn_text}</span>
              <Image
                src="/assets/imgs/icon/arrow-right-half-light.png"
                width={21}
                height={7}
                alt="icon-img"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebContactBanner;
