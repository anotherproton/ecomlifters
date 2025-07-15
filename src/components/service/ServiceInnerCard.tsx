import { TServiceType } from "@/types";
import ImageComponent from "../tools/ImageComponent";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

type Props = {
  service: TServiceType;
};

const ServiceInnerCard = ({ service }: Props) => {
  const { icon, title, features } = service?.data;

  return (
    <div className="group px-[30px] xl:px-[70px] border-s border-[#ECE7E4] dark:border-[#252525] hover:border-theme/30 transition-all duration-300">
      <div className="pb-[25px] xl:pb-12">
        <div className="w-[60px] h-[60px] rounded-xl bg-theme/10 dark:bg-theme/20 flex items-center justify-center group-hover:bg-theme/20 dark:group-hover:bg-theme/30 transition-all duration-300">
          <ImageComponent
            src={typeof icon === "object" ? icon?.dark : icon}
            darkSrc={typeof icon === "object" ? icon?.light : icon}
            width={32}
            height={32}
            alt="icon"
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <Link href={`/`}>
        <h2 className="text-[24px] xl:text-[30px] pb-[25px] leading-[1.08] group-hover:text-theme transition-colors duration-300 font-medium">
          {title}
        </h2>
      </Link>
      <div className="space-y-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 group/item hover:bg-background/30 dark:hover:bg-background-2/30 rounded-lg p-2 -ml-2 transition-all duration-200"
          >
            <div className="mt-1 flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-theme/20 dark:bg-theme/30 flex items-center justify-center group-hover/item:bg-theme group-hover/item:text-white transition-all duration-200">
                <FaCheck className="w-2.5 h-2.5 text-theme group-hover/item:text-white" />
              </div>
            </div>
            <span className="text-[14px] text-text-3 font-normal leading-[1.5] group-hover/item:text-[#96bf47] transition-colors duration-200">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceInnerCard;
