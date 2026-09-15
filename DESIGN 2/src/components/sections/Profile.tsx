import { motion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer, TRANSITION } from '../../utils/animations';
import Eyebrow from '../ui/Eyebrow';

// --- Profile (Editorial) ---
const Profile = () => {
  return (
    <section id="profile" className="py-24 md:py-40 px-4 md:px-8 bg-[#FAFAFA] relative border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left: Photo */}
          <motion.div variants={fadeUp} className="lg:col-span-5 w-full relative">
            <div className="aspect-[3/4] w-full max-w-[450px] bg-black/5 border border-black/10 p-2 mx-auto lg:mx-0">
              <div className="w-full h-full relative overflow-hidden bg-white">
                <img 
                  src="/pic_aboutMe.webp" 
                  alt="Aditya Nugraha" 
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-out mix-blend-multiply" 
                />
              </div>
            </div>
            {/* Minimal ID Badge */}
            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white border border-black/10 p-4 shadow-xl shadow-black/5 max-w-[200px]">
              <div className="font-mono text-[10px] text-steel tracking-widest uppercase mb-1">ID // 001</div>
              <div className="font-bold text-ink text-sm tracking-tight uppercase">Aditya Nugraha</div>
              <div className="text-xs text-steel">Frontend Engineer</div>
            </div>
          </motion.div>

          {/* Right: Typography & Stack */}
          <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col pt-8 lg:pt-12">
            <Eyebrow text="Profile" />
            <h2 className="text-[40px] md:text-[64px] font-bold text-ink mb-10 tracking-[-0.03em] leading-[1.05] uppercase">
              Crafting systems, <br className="hidden md:block" />
              not just pages.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div className="h-px w-8 bg-black/20 mb-6"></div>
                <p className="text-steel leading-[1.7] text-base md:text-lg mb-8">
                  Software Engineer specializing in modern web development. I focus on bridging the gap between robust, scalable architecture and flawless, intuitive user interfaces.
                </p>
              </div>
              
              <div>
                <div className="h-px w-8 bg-black/20 mb-6"></div>
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-ink mb-2">Core Stack</div>
                  {['TypeScript', 'React', 'Node.js', 'Python', 'Go'].map(tech => (
                    <div key={tech} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 bg-black/20 group-hover:bg-primary transition-colors"></div>
                      <span className="text-sm md:text-base font-medium text-steel group-hover:text-ink transition-colors uppercase tracking-wide">
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
