import React from 'react';

const ContactPage = () => {
  return (
    <div className="flex flex-col px-8 md:px-16 pb-16 min-h-[calc(100vh-116px)]">
      
      {/* Bagian Atas: Judul Utama diturunkan lebih jauh */}
      <div className="pt-40 md:pt-56">
        <h1 className="font-telegraf font-bold text-5xl md:text-[82.4px] leading-[1.1] tracking-tight max-w-4xl">
          Let's build something<br />exceptional together.
        </h1>
      </div>
      
      {/* Bagian Bawah: Rata bawah (kiri & kanan) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-12 mt-auto">
        
        {/* Kiri Bawah: Social Links & Email */}
        <div className="flex gap-10">
          <a 
            href="https://linkedin.com/in/adityanugrahairwan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/adityanugrahairwan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="mailto:aditya.nugraha@example.com" 
            className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            Email
          </a>
        </div>

        {/* Kanan Bawah: Lokasi */}
        <div className="flex flex-col lg:items-end lg:text-right">
          <p className="font-libre text-sm uppercase tracking-[0.4em] text-gray-400 mb-2 font-extralight">Current Location</p>
          <p className="font-telegraf font-bold text-xl">South Korea</p>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;