import { convertWithBrSpan } from "@/lib/helper/converter";
import { cn } from "@/lib/utils";

const DesignSectionTitle = ({
  title,
  className,
  heading1 = false,
  animation = "has_text_mov_anim",
}: {
  title: string;
  className?: string;
  heading1?: boolean;
  animation?: string;
}) => {
  return (
    <>
      {heading1 ? (
        <h1
          className={cn("design-section-title", animation, className)}
          dangerouslySetInnerHTML={convertWithBrSpan(title)}
        />
      ) : (
        <h2
          className={cn("design-section-title", animation, className)}
          dangerouslySetInnerHTML={convertWithBrSpan(title)}
        />
      )}
    </>
  );
};

export default DesignSectionTitle;
