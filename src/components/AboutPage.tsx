import Typewriter from './Typewriter';

const AboutPage = () => {
  const education = [
    {
      degree: "Bachelor of Accounting",
      school: "Tadulako University",
      period: "2017 - 2022",
      details: "Focused on Financial Accounting and Taxation.",
      link: "https://drive.google.com/..." // Ganti dengan link Ijazah
    },
    {
      degree: "Master of Computer Science",
      school: "President University",
      period: "2023 - 2025",
      details: "Focused on Business Intelligence.",
      link: "https://drive.google.com/..." // Ganti dengan link Ijazah
    }
  ];

  const certificates = [
    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2025",
      link: "https://aws.amazon.com/..." 
    },
    {
      title: "React Advanced Patterns",
      issuer: "Frontend Masters",
      year: "2024",
      link: "https://frontendmasters.com/..." 
    },
    {
      title: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2023",
      link: "https://www.scrum.org/..."
    }
  ];

  return (
    <div className="texture-about flex flex-col px-8 md:px-16 pb-16 min-h-[calc(100vh-116px)] pt-4 md:pt-12">
      
      {/* ================= SECTION: ABOUT ME ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-start mb-24">
        
        {/* Kolom 1: Judul About Me */}
        <div className="xl:col-span-3 flex flex-col">
          <h1 className="font-lejour font-normal text-6xl md:text-[82.4px] leading-[0.9] mb-4 tracking-tight">
            <div className="pb-4"><Typewriter text="About" /></div>
            <div><Typewriter text="Me" delay={0.3} /></div>
          </h1>
          <div className="w-16 border-t-2 border-black/30 mt-6 mb-8 xl:mb-0"></div>
          
        </div>
        
        {/* Kolom 2: Slot Foto Profile (Disesuaikan ukurannya agar tidak terlalu raksasa) */}
        <div className="xl:col-span-4 flex w-full justify-center xl:justify-start">
          <div className="w-full max-w-[260px] xl:max-w-[280px] aspect-[4/5] overflow-hidden bg-gray-50 border border-black/5">
            <img 
              src="/images/profile.jpg" 
              alt="Aditya Nugraha Irwan" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Kolom 3: Deskripsi Profil (Rata Kiri-Kanan) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <p className="font-poppins text-lg leading-relaxed text-gray-800 font-extralight text-justify mt-2 xl:mt-0">
            Saya adalah seorang Software Engineer yang berfokus pada pengembangan antarmuka (Frontend) menggunakan ekosistem React dan TypeScript. Saat ini, saya bekerja secara profesional di Korea Selatan, bertanggung jawab dalam mengembangkan dan mengelola UI untuk proyek konfigurasi Autonomous Process Control (APC).
          </p>
          <p className="font-poppins text-lg leading-relaxed text-gray-800 font-extralight text-justify">
            Selain membangun arsitektur web yang modern dan skalabel, saya juga memiliki ketertarikan mendalam pada bidang otomatisasi, ekstraksi data (web scraping), serta eksplorasi integrasi model Machine Learning ke dalam ekosistem JavaScript.
          </p>
        </div>
      </div>

      <div className="w-full border-t border-black/10 mb-20"></div>

      {/* ================= SECTION: EDU & CERT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Education Section */}
        <div className="flex flex-col">
          <h2 className="font-lejour font-normal text-5xl mb-10 tracking-tight">
            <Typewriter text="Education" />
          </h2>
          <div className="flex flex-col gap-10">
            {education.map((edu, i) => (
              <div key={i} className="group">
                <span className="font-telegraf text-sm text-gray-400 tracking-widest uppercase">{edu.period}</span>
                
                {/* Gelar sebagai Link Ijazah */}
                <div className="mt-1">
                  <a href={edu.link} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <h3 className="font-telegraf font-bold text-2xl hover:text-gray-500 transition-colors cursor-pointer">
                      {edu.degree} <span className="text-sm align-top opacity-0 group-hover:opacity-100 transition-opacity ml-1">↗</span>
                    </h3>
                  </a>
                </div>
                <div className="w-12 border-t border-black/20 my-2 group-hover:w-20 transition-all duration-500"></div>
                <p className="font-poppins text-lg text-gray-600 font-extralight uppercase tracking-wider">{edu.school}</p>
                <p className="font-poppins text-md text-gray-500 font-extralight leading-relaxed">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="flex flex-col">
          <h2 className="font-lejour font-normal text-5xl mb-10 tracking-tight">
            <Typewriter text="Certificates" />
          </h2>
          <div className="flex flex-col gap-2">
            {certificates.map((cert, i) => (
              <a 
                key={i} 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex justify-between items-end border-b border-black/10 py-5 group hover:border-black transition-colors duration-500"
              >
                <div className="flex flex-col pr-4">
                  <h3 className="font-telegraf font-bold text-xl group-hover:text-gray-600 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="font-poppins text-sm text-gray-500 uppercase tracking-widest font-extralight mt-1">
                    {cert.issuer} <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </p>
                </div>
                <span className="font-telegraf text-sm text-gray-400 whitespace-nowrap">{cert.year}</span>
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutPage;