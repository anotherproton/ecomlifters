import Logo from "@/components/elements/logo/Logo";
import FooterNav from "@/components/footer/FooterNav";
import siteConfig from "@/config/siteConfig.json";
import EmailInput from "@/components/elements/input/EmailInput";
import { SocialShare1 } from "../tools/Social";

type Props = {
  footerNav: {
    id: number;
    title: string;
    children?: {
      name: string;
      path: string;
      isLocation?: boolean;
    }[];
  }[];
};

const Footer1 = ({ footerNav }: Props) => {
  const { site_info, footer_info, social } = siteConfig;
  const { label, company } = footer_info?.copyright || {};
  const [firstWord, ...remainingWords] = company.split(" ");
  return (
    <footer className="main-section-style !pb-0 bg-background-fixed">
      <div className="container">
                <div className="section-spacing-top pb-[54px] xl:pb-[94px] overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden xl:block">
            <div className="grid gap-y-20 gap-x-[60px] justify-between xl:grid-cols-[1fr,190px,190px,385px]">
              <div className="flex items-start gap-[60px]">
                <div className="relative">
                  <Logo
                    light={true}
                    url={site_info?.logo}
                    customWidth={200}
                    customHeight={54}
                    className="max-h-[54px] !w-auto"
                  />
                </div>
                <div className="flex-1">
                  {footerNav.slice(0, 2).map((item) => (
                    <div key={item.id} className="mb-8">
                      <FooterNav {...item} />
                    </div>
                  ))}
                </div>
              </div>
              {footerNav.slice(2).map((item) => (
                <FooterNav key={item.id} {...item} />
              ))}
              <div className="order-1 sm:order-0">
                <h2 className="title text-text-fixed-2 text-[22px] xl:text-[30px] leading-[.73]">
                  Newsletter
                </h2>
                <div className="newstaller_text mt-[29px] text-text-fixed-2">
                  <p className="text-[#999999">
                    Feel free to reach out if you want to collaborate with us, or
                    simply have a chat.
                  </p>
                </div>
                <EmailInput />
              </div>
            </div>
          </div>
          
          {/* Mobile/Tablet Layout */}
          <div className="xl:hidden grid gap-y-[50px] gap-x-[60px] justify-between grid-cols-[auto] sm:grid-cols-[auto,auto] md:grid-cols-[auto,auto,auto]">
            <div className="relative">
              <Logo
                light={true}
                url={site_info?.logo}
                customWidth={200}
                customHeight={54}
                className="max-h-[34px] !w-auto"
              />
            </div>
            {footerNav.map((item) => (
              <FooterNav key={item.id} {...item} />
            ))}
            <div className="sm:col-span-2 order-1 sm:order-0">
              <h2 className="title text-text-fixed-2 text-[22px] xl:text-[30px] leading-[.73]">
                Newsletter
              </h2>
              <div className="newstaller_text mt-[29px] text-text-fixed-2">
                <p className="text-[#999999">
                  Feel free to reach out if you want to collaborate with us, or
                  simply have a chat.
                </p>
              </div>
              <EmailInput />
            </div>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="border-t border-[#202020] mt-[50px] xl:mt-[90px]">
          <div className="container">
            <div className="py-[30px] xl:py-[40px] flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="title text-text-fixed-2 text-[18px] xl:text-[22px] leading-[.73] mb-4">
                  Follow Us
                </h2>
                <ul className="flex gap-5 justify-center md:justify-start">
                  {social.map((item, i) => (
                    <li key={`social_share-${i}`}>
                      {SocialShare1(
                        item,
                        " text-text-fixed-3 hover:text-text-fixed-2"
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <p className="font-medium text-text-fixed-3">
                  {label}
                  <span className="text-text-fixed-2">{firstWord}</span>{" "}
                  {remainingWords.join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
