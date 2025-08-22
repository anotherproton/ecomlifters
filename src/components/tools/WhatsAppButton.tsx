"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+91-7982069421";
    const message = "Hello! I'd like to get in touch with you.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      className="fixed w-[60px] h-[60px] right-[5px] md:right-[10px] lg:right-[20px] bottom-[120px] md:bottom-[125px] lg:bottom-[145px] xl:bottom-[85px] z-[9991] rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
      onClick={handleWhatsAppClick}
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-[28px] h-[28px] text-white m-auto" />
    </button>
  );
};

export default WhatsAppButton;
