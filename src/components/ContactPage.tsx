import Typewriter from './Typewriter';

const ContactPage = () => {
  return (
    <div className="flex flex-col px-6 md:px-16 pb-16 min-h-[calc(100vh-116px)]">
      
      <div className="pt-24 md:pt-40 lg:pt-56">
        <h1 className="font-telegraf font-bold text-4xl md:text-5xl lg:text-[80px] leading-[1.1] tracking-tight max-w-4xl">
          <Typewriter text="Let’s Build Something Great!" />
        </h1>
        
        {/* FIX DI SINI: Pake div supaya container-nya nge-wrap, dan Typewriter dipisah biar aman */}
        <div className="mt-4 md:mt-6 font-poppins text-xl md:text-3xl font-extralight tracking-tight max-w-3xl text-gray-800 leading-snug">
          <div className="block md:hidden">
            {/* Versi Mobile: Teks dipotong manual biar gak offside */}
            <Typewriter text="I’m always excited to work on" />
            <br />
            <Typewriter text="meaningful projects. Reach out anytime." delay={1.5} />
          </div>
          <div className="hidden md:block">
            {/* Versi Desktop: Tetap satu baris manis */}
            <Typewriter text="I’m always excited to work on meaningful projects. Reach out anytime." />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-16 mt-16 md:mt-auto">
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <a 
            href="https://linkedin.com/in/diityanug" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-row md:flex-col items-center gap-4 md:gap-3 group cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5px] group-hover:stroke-gray-500 transition-colors">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="font-telegraf font-bold text-xs md:text-sm tracking-[0.3em] uppercase border-b border-black/30 md:border-black pb-1 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
              LinkedIn
            </span>
          </a>

          <a 
            href="https://github.com/diityanug" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-row md:flex-col items-center gap-4 md:gap-3 group cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5px] group-hover:stroke-gray-500 transition-colors">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.32a12.3 12.3 0 0 0-6.2 0C6.15 2.5 5 2.8 5 2.8a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 12c0 5.6 3.35 6.6 6.5 7a4.8 4.8 0 0 0-1 3.02v4"></path>
              <path d="M8 19c-3 1-4-1-5-1"></path>
            </svg>
            <span className="font-telegraf font-bold text-xs md:text-sm tracking-[0.3em] uppercase border-b border-black/30 md:border-black pb-1 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
              GitHub
            </span>
          </a>

          <a 
            href="https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=diityanug13@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-row md:flex-col items-center gap-4 md:gap-3 group cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5px] group-hover:stroke-gray-500 transition-colors">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span className="font-telegraf font-bold text-xs md:text-sm tracking-[0.3em] uppercase border-b border-black/30 md:border-black pb-1 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
              Email
            </span>
          </a>
        </div>

        <div className="flex flex-col items-start lg:items-end lg:text-right w-full lg:w-auto border-t lg:border-t-0 border-black/10 pt-8 lg:pt-0">
          <p className="font-poppins text-xs md:text-sm uppercase tracking-[0.4em] text-gray-400 mb-2 font-extralight">Current Location</p>
          <p className="font-seasons text-lg md:text-xl flex items-center gap-2 lg:justify-end">
             Cibitung, Indonesia
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;