import Typewriter from './Typewriter';

const ExperiencePage = () => {
  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "LG Sinarmas",
      location: "Central Jakarta, Indonesia",
      period: "June 2025 - Present",
      logo: "/LG_Sinarmas_Logo_Vector.svg",
      description: "Berfokus pada pengembangan Frontend dengan React dan TypeScript. Mengembangkan dan mengelola UI untuk proyek konfigurasi Autonomous Process Control (APC), serta memimpin transisi teknis infrastruktur frontend menggunakan Bun."
    },
  ];

  return (
    <div className="flex flex-col px-8 md:px-16 pb-12 min-h-[calc(100vh-116px)] justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        
        {/* Kolom Kiri: Judul */}
        <div className="xl:col-span-5 flex flex-col pt-2 mb-10 xl:mb-0">
          <h1 className="font-lejour font-normal text-6xl md:text-[82.4px] leading-[0.9] mb-4 tracking-tight">
            {/* Pakai div dan pb-4 buat ngasih jarak spesifik dari Work ke Experience */}
            <div className="pb-4"><Typewriter text="Work" /></div>
            <div><Typewriter text="Experience" delay={0.5} /></div>
          </h1>
          <div className="w-16 border-t-2 border-black mt-6"></div>
        </div>

        {/* Kolom Kanan: Konten */}
        <div className="xl:col-span-7 flex flex-col gap-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex flex-col md:flex-row gap-8 md:gap-12 group">
              
              {/* Sisi Kiri (Sekarang Cuma Logo) */}
              <div className="w-32 flex flex-col items-center md:items-start flex-none">
                <div className="w-full h-12 flex items-center justify-center md:justify-start">
                   <img 
                    src={exp.logo} 
                    alt={exp.company} 
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Sisi Kanan (Detail + Periode Pindah ke Sini) */}
              <div className="flex-1 flex flex-col">
                <h2 className="font-telegraf font-bold text-2xl tracking-tight mb-1">
                  {exp.role}
                </h2>
                {/* Margin bottom dikecilin jadi mb-1 biar nempel sama periode */}
                <h3 className="font-poppins text-md uppercase tracking-widest text-gray-500 mb-1 font-light">
                  {exp.company} — {exp.location}
                </h3>
                <div className="font-poppins text-sm tracking-widest text-gray-400 mb-5 font-light">
                  {exp.period}
                </div>
                <p className="font-poppins text-lg leading-relaxed text-gray-800 font-extralight max-w-2xl text-justify">
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