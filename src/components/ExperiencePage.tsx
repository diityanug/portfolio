import React from 'react';

const ExperiencePage = () => {
  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "LG Sinarmas Technology Solution",
      location: "South Korea",
      period: "Present",
      description: "Berfokus pada pengembangan Frontend dengan React dan TypeScript. Mengembangkan dan mengelola UI untuk proyek konfigurasi Autonomous Process Control (APC), serta memimpin transisi teknis infrastruktur frontend menggunakan Bun."
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "Freelance / Projects",
      location: "Remote",
      period: "2025 - 2026",
      description: "Membangun komponen UI dinamis untuk prediksi data, mengimplementasikan web scraping menggunakan Selenium dan n8n, serta eksplorasi integrasi model machine learning ke ekosistem JavaScript."
    }
  ];

  return (
    <div className="flex flex-col px-8 md:px-16 pb-12 min-h-[calc(100vh-116px)] justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Header Kiri */}
        <div className="lg:col-span-4 flex flex-col pt-2">
          <h1 className="font-telegraf font-bold text-6xl md:text-[82.4px] leading-none mb-4 tracking-tight">
            Work<br />Experience
          </h1>
          <div className="w-16 border-t-2 border-black mt-6"></div>
        </div>

        {/* List Pengalaman Kanan */}
        <div className="lg:col-span-8 flex flex-col gap-12 mt-4 lg:mt-0">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
              <div className="w-32 font-telegraf text-sm tracking-widest text-gray-400 mt-1">
                {exp.period}
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="font-telegraf font-bold text-2xl tracking-tight mb-1">
                  {exp.role}
                </h2>
                <h3 className="font-libre text-md uppercase tracking-widest text-gray-500 mb-4 font-extralight">
                  {exp.company} — {exp.location}
                </h3>
                <p className="font-libre text-lg leading-relaxed text-gray-800 font-extralight max-w-2xl text-justify">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExperiencePage;