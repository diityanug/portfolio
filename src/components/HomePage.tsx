import { useNavigate } from 'react-router-dom';
import Typewriter from './Typewriter';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-8 md:px-16 pb-16 min-h-[calc(100vh-116px)] justify-end">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-end">
        
        {/* Kolom Kiri */}
        <div className="xl:col-span-7 flex flex-col items-start mb-12 xl:mb-0">
          <h1 className="font-lejour font-normal text-5xl md:text-7xl xl:text-[90px] leading-[0.9] tracking-tight mb-6 md:mb-7">
            <div className="pb-4"><Typewriter text="Aditya Nugraha" /></div>
            <div><Typewriter text="Irwan" delay={0.6} /></div>
          </h1>
          
          <div className="w-full max-w-[400px] border-t border-black/20 mb-6"></div>
          
          <p className="font-poppins text-base md:text-xl xl:text-[25px] leading-relaxed text-gray-800 font-extralight text-left">
            <Typewriter text="Software Engineer | Frontend Engineer | Machine Learning" delay={1.8} />
          </p>
        </div>

        {/* Kolom Kanan: Foto dan Tombol */}
        <div className="xl:col-span-5 flex flex-col items-end w-full">
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