import hasCountAnim from "@/lib/animation/hasCountAnim";
import { useGSAP } from "@gsap/react";
import ImageComponent from "../tools/ImageComponent";
import { useRef } from "react";

type Props = {
  cardData: {
    icon: {
      dark: string;
      light: string;
    };
    count: number;
    description: string;
  };
};

const AboutAwardCard = ({ cardData }: Props) => {
  const { icon, count, description } = cardData;
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasCountAnim();
    },
    { scope: containerRef }
  );

  return (
    <div
      className="pl-10 border-l first:pl-0 first:border-0"
      ref={containerRef}
    >
      <div className="meta grid gap-[18px] grid-cols-[30px_auto]">
        <div className="icon">
        
        
        </div>
        <div className="content">
          <h3 className="number text-[36px] leading-[.85]">
            <span data-count={count} className="has_count_anim">
              {count}
            </span>
            +
          </h3>
          <p className="text mt-[11px] max-w-[630px]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutAwardCard;
