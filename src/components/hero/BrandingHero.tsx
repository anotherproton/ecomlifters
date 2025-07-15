"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import VideoModal from "@/components/tools/VideoModal";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import { ActionBtnType } from "@/types";
import hasCharAnim from "@/lib/animation/hasCharAnim";
import { convertWithBrSpan } from "@/lib/helper/converter";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import { useDirection, useLayout } from "@/context/app.context";
import { cn } from "@/lib/utils";
import BranAboutArea from "../about/BranAboutArea";

type Props = {
  title: string;
  sub_title: string;
  description: string;
  image: string;
  video: string;
  action_btn?: ActionBtnType;
};

const BrandingHero = ({
  title,
  sub_title,
  description,
  image,
  video,
  action_btn,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  const { layout } = useLayout();
  const { direction } = useDirection();

  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(!isOpen);
  };
  const pinElement = useRef<HTMLDivElement>(null!);
  useGSAP(
    () => {
      hasPinContent(pinElement.current);
      hasFadeAnim();
    },
    { scope: containerRef }
  );
  useGSAP(
    () => {
      hasCharAnim();
    },
    { dependencies: [direction], scope: containerRef }
  );

  return (
    <section ref={pinElement} className="hero-area z-10 pb-[130px] relative">
      <div className="absolute w-full h-full -z-10 top-0 start-0">
        <Image
          src={image}
          alt="Hero image"
          className="w-full h-full"
          style={{ objectFit: "cover" }}
          height={2110}
          width={1920}
        />
      </div>
      <div className="container">
        <div
          ref={containerRef}
          className="pt-[120px] pb-[50px] md:pb-[80px] lg:pb-[120px] xl:pb-[150px] 2xl:pt-[200px] 2xl:pb-[200px]"
        >
          <div className="grid gap-y-[30px]  gap-x-[60px] grid-cols-auto items-end lg:grid-cols-[auto,335px] xl:grid-cols-[auto,435px]">
            <div>
              <h1
                className={cn(
                  "has_char_anim branding-hero-title !font-getaway text-text-fixed uppercase !font-normal text-[60px] mt-0 mb-0 [&>span]:mb-[20px] [&>span:last-child]:mb-0 sm:text-[60px] sm:mt-[-2px] [&>span]:sm:mb-[25px] md:text-[100px] md:mt-[-2px] md:tracking-[-0.04em] [&>span]:md:mb-[30px] xl:text-[140px] [&>span]:xl:mb-[35px] 2xl:text-[120px] 2xl:mt-[-3px] [&>span]:2xl:mb-[40px]",
                  layout === "box" &&
                    "xxl:text-[210px] 2xl:mt-0 [&>span]:2xl:mb-[45px] 2xl:max-w-[900px]"
                )}
                dangerouslySetInnerHTML={convertWithBrSpan(title, "no-animate")}
              />
            </div>

            <div>
              <div className="relative rounded-[30px] overflow-hidden inline-block" style={{display:"none"}}>
                <Image
                  src="/assets/imgs/hero/branding/img-s23.jpg"
                  className="w-[60%] rounded-[30px] h-full "
                  width={435}
                  height={260}
                  alt="image"
                />
                <span
                  onClick={() => setIsOpen(!isOpen)}
                  className="h-[80px] w-[80px] border-[2px] text-[18px] rounded-full flex items-center justify-center pos-center cursor-pointer"
                >
                  <FaPlay className="text-text-fixed-2" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <BranAboutArea aboutData={{ sub_title, description, action_btn }} />
      </div>
      <VideoModal link={video} isOpen={isOpen} close={closeDialog} />
    </section>
  );
};

export default BrandingHero;
