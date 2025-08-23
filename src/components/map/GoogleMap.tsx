"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";

const GoogleMap = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const pinElement = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasPinContent(pinElement.current);
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={pinElement}
      className="map_area main-section-style bg-white dark:bg-[#1a1a1a]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <div className="text-center mb-8">
            <div>
              <span className="has_fade_anim text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[30px] uppercase !font-getaway !leading-none font-normal text-gray-600 dark:text-gray-300">
                Visit Our Office
              </span>
            </div>
            <div className="mt-5 xl:mt-[30px]">
              <h2 className="has_fade_anim text-[40px] sm:text-[50px] lg:text-[70px] xl:text-[80px] 2xl:text-[100px] !font-normal !font-getaway uppercase max-w-[800px] mx-auto">
                Find Us Here
              </h2>
            </div>
          </div>
          
          <div className="has_fade_anim">
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative w-full h-[450px] rounded-lg shadow-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.1809940569087!2d77.11614269387935!3d28.632264102082033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e022b815ad2a593%3A0x73f00f43b0c5afd2!2sEcom%20Lifters!5e0!3m2!1sen!2sin!4v1755860349035!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="EcomLifters Office Location"
                  onError={(e) => {
                    const target = e.target as HTMLIFrameElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'absolute inset-0 w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-center p-4';
                    fallback.innerHTML = `
                      <div>
                        <p class="text-lg font-semibold mb-2">EcomLifters Office</p>
                        <p class="text-gray-600 dark:text-gray-300">1st Floor, J91, Block J, Beri Wala Bagh, Hari Nagar, New Delhi, Delhi, 110064</p>
                      </div>
                    `;
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>EcomLifters</strong> - Your trusted e-commerce growth partner
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                Located in the heart of Delhi, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;
