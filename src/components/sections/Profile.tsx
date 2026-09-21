import { motion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer, TRANSITION } from '../../utils/animations';

// --- Profile (Editorial) ---
const Profile = () => {
  return (
    <section id="profile" className="pt-16 md:pt-24 pb-28 md:pb-40 px-4 md:px-8 bg-white relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left: Photo */}
          <motion.div variants={fadeUp} className="lg:col-span-5 w-full relative">
            <div className="aspect-3/4 w-full max-w-md bg-black/5 border border-black/10 p-2 mx-auto lg:mx-0">
              <div className="w-full h-full relative overflow-hidden bg-white">
                <img 
                  src="/Profile_pics.webp" 
                  alt="Aditya Nugraha" 
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-out mix-blend-multiply" 
                />
              </div>
            </div>
            {/* Minimal ID Badge */}
            <div className="absolute -bottom-6 right-0 md:-right-6 bg-white border border-black/10 p-4 shadow-xl shadow-black/5 max-w-50">
              <div className="font-bold text-ink text-sm tracking-tight uppercase">Aditya Nugraha</div>
              <div className="text-xs text-steel">Software Engineer</div>
            </div>
          </motion.div>

          {/* Right: Typography & Stack */}
          <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col pt-8 lg:pt-12">
            <h2 
              tabIndex={0}
              onTouchStart={() => {}}
              className="group text-[40px] md:text-[64px] font-bold text-ink mb-10 tracking-[-0.03em] leading-[1.05] uppercase cursor-pointer lg:cursor-default focus:outline-none"
            >
              {/* HELLO: Solid Black -> Hollow Primary */}
              <span className="inline-block transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#5645d4] group-focus:text-transparent group-focus:[-webkit-text-stroke:2px_#5645d4] group-active:text-transparent group-active:[-webkit-text-stroke:2px_#5645d4]">
                HELLO
              </span>{" "}
              {/* THERE: Solid Steel -> Solid Black */}
              <span className="inline-block text-steel transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] delay-75 group-hover:text-ink group-focus:text-ink group-active:text-ink">
                THERE
              </span>{" "}
              {/* ~: Solid Primary -> Hollow Black, Rotate */}
              <span className="inline-block text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] delay-100 group-hover:rotate-[20deg] group-hover:scale-110 group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#1a1a1a] group-focus:rotate-[20deg] group-focus:scale-110 group-focus:text-transparent group-focus:[-webkit-text-stroke:2px_#1a1a1a] group-active:rotate-[20deg] group-active:scale-110 group-active:text-transparent group-active:[-webkit-text-stroke:2px_#1a1a1a]">
                ~
              </span> <br className="hidden md:block" />
              {/* I'M: Hollow Black -> Solid Primary */}
              <span className="inline-block text-transparent [-webkit-text-stroke:2px_#1a1a1a] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] delay-150 group-hover:text-primary group-hover:[-webkit-text-stroke:0px] group-focus:text-primary group-focus:[-webkit-text-stroke:0px] group-active:text-primary group-active:[-webkit-text-stroke:0px]">
                I'M
              </span>{" "}
              {/* ADITYA: Solid Black -> Hollow Black */}
              <span className="inline-block transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] delay-200 group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#1a1a1a] group-focus:text-transparent group-focus:[-webkit-text-stroke:2px_#1a1a1a] group-active:text-transparent group-active:[-webkit-text-stroke:2px_#1a1a1a]">
                ADITYA
              </span>
            </h2>
            
            <div className="flex flex-col">
              <div className="h-px w-12 bg-black/20 mb-8"></div>
              <div className="text-steel leading-[1.8] text-base md:text-[17px] flex flex-col gap-6 max-w-2xl mb-12">
                <p>
                  A Software Engineer focused on frontend development using <strong>TypeScript</strong> and <strong>React</strong>, while also exploring backend development with Python and FastAPI. I enjoy building modern, clean, and user-friendly web applications while continuously learning and improving my skills.
                </p>
                <p>
                  Outside of coding, I love playing games and spending time with sports, especially badminton and basketball. I can play other sports too, but whether I’m actually good at them is another story. I always enjoy trying new things and simply having fun with whatever I’m doing.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-ink">Core Stack</div>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  {['TypeScript', 'React', 'Python', 'FastAPI'].map(tech => (
                    <div key={tech} className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 bg-white shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default group">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-primary transition-colors"></div>
                      <span className="text-sm font-semibold text-ink tracking-wide">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
