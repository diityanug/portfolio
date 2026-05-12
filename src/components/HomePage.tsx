import { useNavigate } from 'react-router-dom';
import Typewriter from './Typewriter';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-8 md:px-16 pb-16 min-h-[calc(100vh-116px)] justify-end">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7 flex flex-col items-start">
          <h1 className="font-telegraf font-bold text-[82.4px] leading-[0.95] tracking-tight mb-10">
            {/* Nama Baris 1 */}
            <Typewriter text="Aditya Nugraha" />
            <br />
            {/* Nama Baris 2 - Mulai setelah Baris 1 selesai (~1.2 detik) */}
            <Typewriter text="Irwan" delay={1.2} />
          </h1>
          
          <div className="w-full max-w-[400px] border-t border-black/20 mb-6"></div>
          
          <p className="font-libre text-3xl font-extralight tracking-tight">
            {/* Job Title - Mulai paling terakhir */}
            <Typewriter text="Software Engineer" delay={1.8} />
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col items-end w-full">
          <div className="flex gap-4 mb-12 w-full justify-end">
            <div className="w-1/2 max-w-[240px] aspect-[3/4] overflow-hidden">
              <img src="/images/architecture-1.jpg" alt="1" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            <div className="w-1/2 max-w-[240px] aspect-[3/4] overflow-hidden">
              <img src="/images/architecture-2.jpg" alt="2" className="w-full h-full object-cover grayscale" />
            </div>
          </div>

          <button 
            onClick={() => navigate('/about')}
            className="border border-black px-14 py-4 font-libre text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;