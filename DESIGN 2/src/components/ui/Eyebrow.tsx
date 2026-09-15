import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

// --- Eyebrow Badge ---
const Eyebrow = ({ text }: { text: string }) => (
  <motion.div variants={fadeUp} className="inline-block mb-6">
    <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-black/5 text-ink/70 border border-black/5">
      {text}
    </span>
  </motion.div>
);


export default Eyebrow;
