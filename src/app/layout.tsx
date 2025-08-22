import "../styles/globals.css";
import "@/styles/main.css";
import Provider from "@/provider";
import BrandingHeader from "@/components/headers/BrandingHeader";
import Footer1 from "@/components/footer/Footer1";
import navigation from "@/config/navigation.json";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import WhatsAppButton from "@/components/tools/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="instrument">
            <ScrollSmootherComponent />
            <ToolsComponent />
            <ScrollTop />
            <WhatsAppButton />
            <div className="has-smooth" id="has_smooth"></div>
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <BrandingHeader onlyDark />
                <div>{children}</div>
                <Footer1 footerNav={navigation.footer1} />
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
