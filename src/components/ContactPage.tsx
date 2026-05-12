import React from 'react';

const ContactPage = () => {
  return (
    <div className="flex flex-col px-8 md:px-16 pb-16 min-h-[calc(100vh-116px)]">
      
      <div className="pt-40 md:pt-56">
        <h1 className="font-telegraf font-bold text-5xl md:text-[80px] leading-[1.1] tracking-tight max-w-4xl">
          Let’s Build Something Great!
        </h1>
        
        <p className="mt-4 font-libre text-3xl font-extralight tracking-tight">
            I’m always excited to work on meaningful projects. Reach out anytime.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-12 mt-auto">
        
        {/* Social Links & Email */}
        <div className="flex gap-10">
          <a 
            href="https://linkedin.com/in/diityanug" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/diityanug" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="mailto:diityanug13@gmail.com" 
            className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            Email
          </a>
        </div>

        {/* Location */}
        <div className="flex flex-col lg:items-end lg:text-right">
          <p className="font-libre text-sm uppercase tracking-[0.4em] text-gray-400 mb-2 font-extralight">Current Location</p>
          <p className="font-telegraf font-bold text-xl flex items-center gap-2 lg:justify-end">
            <span>📍</span>
            <span>Cibitung, Indonesia</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;