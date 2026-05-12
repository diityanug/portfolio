import React from 'react';

const AboutPage = () => {
  return (
    /* h-[calc(100vh-116px)] memastikan konten pas di satu layar tanpa scroll */
    <div className="flex flex-col px-8 md:px-16 pb-12 h-[calc(100vh-116px)] justify-center">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Sisi Kiri: Foto Profil dengan rasio yang pas agar tidak memakan tempat ke bawah */}
        <div className="lg:col-span-5 flex justify-start">
          <div className="w-full max-w-[450px] aspect-[4/5] lg:aspect-[3/4] max-h-[70vh] bg-gray-100 overflow-hidden">
            <img 
              src="/images/profile-photo.jpg" 
              alt="Aditya Profile" 
              className="w-full h-full object-cover grayscale contrast-110"
            />
          </div>
        </div>

        {/* Sisi Kanan: Konten Teks */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="font-telegraf font-bold text-[82.4px] leading-none mb-4 tracking-tight">
            About Me
          </h1>
          
          <h2 className="font-libre text-xl uppercase tracking-[0.3em] mb-8 text-gray-500 font-extralight">
            Software Engineer
          </h2>
          
          {/* Garis aksen pendek */}
          <div className="w-20 border-t-2 border-black mb-10"></div>
          
          <div className="font-libre text-lg leading-relaxed space-y-6 max-w-lg text-left font-extralight text-gray-800">
            <p>
              Saya adalah seorang Software Engineer yang berbasis di Korea Selatan, 
              dengan fokus pada pengembangan Frontend menggunakan React dan TypeScript.
            </p>
            <p>
              Memiliki minat besar dalam otomasi, web scraping, dan integrasi machine learning 
              ke dalam UI yang dinamis dan minimalis.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;