import React from 'react';
import Typewriter from './Typewriter';

const EduCertPage = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University Name", // Silakan sesuaikan
      period: "2018 - 2022",
      details: "Focus on Software Engineering and Information Systems."
    }
  ];

  const certificates = [
    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2025"
    },
    {
      title: "React Advanced Patterns",
      issuer: "Frontend Masters",
      year: "2024"
    },
    {
      title: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2023"
    }
  ];

  return (
    <div className="flex flex-col px-8 md:px-16 pb-12 min-h-[calc(100vh-116px)] justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Section Education */}
        <div className="flex flex-col">
          <h1 className="font-telegraf font-bold text-5xl mb-10 tracking-tight">
            <Typewriter text="Education" />
          </h1>
          <div className="flex flex-col gap-8">
            {education.map((edu, i) => (
              <div key={i} className="group">
                <span className="font-telegraf text-sm text-gray-400 tracking-widest uppercase">{edu.period}</span>
                <h3 className="font-telegraf font-bold text-2xl mt-1">{edu.degree}</h3>
                <p className="font-libre text-lg text-gray-600 font-extralight uppercase tracking-wider">{edu.school}</p>
                <div className="w-12 border-t border-black/20 my-4 group-hover:w-20 transition-all duration-500"></div>
                <p className="font-libre text-md text-gray-500 font-extralight leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Certificates */}
        <div className="flex flex-col">
          <h1 className="font-telegraf font-bold text-5xl mb-10 tracking-tight">
            <Typewriter text="Certificates" />
          </h1>
          <div className="flex flex-col gap-6">
            {certificates.map((cert, i) => (
              <div key={i} className="flex justify-between items-end border-b border-black/10 pb-4 group hover:border-black transition-colors duration-500">
                <div className="flex flex-col">
                  <h3 className="font-telegraf font-bold text-xl">{cert.title}</h3>
                  <p className="font-libre text-sm text-gray-500 uppercase tracking-widest font-extralight">{cert.issuer}</p>
                </div>
                <span className="font-telegraf text-sm text-gray-400">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EduCertPage;