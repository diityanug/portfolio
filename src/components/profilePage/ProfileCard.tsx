import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@utils/animation';
import type { EducationItem, CertificateItem } from '../../types/about';

export const EducationCard = ({
  degree,
  school,
  period,
  gpa,
  details,
  link
}: EducationItem): ReactElement => (
  <motion.div
    variants={fadeUpVariants}
    className="w-full"
  >
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group bg-white rounded-3xl border border-black/5 hover:border-black/10 p-7 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5E7657] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />
      <span className="font-telegraf text-xs text-gray-400 tracking-widest uppercase mb-3 block">
        {period}
      </span>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-poppins font-semibold text-xl md:text-2xl text-[#2A2320] group-hover:text-[#5E7657] transition-colors pr-4">
          {degree}
        </h3>
        <span className="text-xl text-[#5E7657] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out">
          ↗
        </span>
      </div>
      <p className="font-poppins text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider mb-2">
        {school}
      </p>
      <p className="font-google text-xs text-gray-500 uppercase tracking-wider mb-5">
        GPA: <span className="font-bold text-gray-700">{gpa}</span> / 4.00
      </p>
      <div className="w-full border-t border-black/5 my-5" />
      <p className="font-poppins text-sm text-gray-500 font-light leading-relaxed">
        {details}
      </p>
    </a>
  </motion.div>
);

export const CertificateRow = ({
  title,
  issuer,
  year,
  link
}: CertificateItem): ReactElement => (
  <motion.div variants={fadeUpVariants}>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-between items-center border-b border-black/[0.08] py-6 group hover:border-black/30 transition-colors duration-300"
    >
      <div className="flex flex-col pr-6 transform group-hover:translate-x-2 transition-transform duration-300 ease-out">
        <h3 className="font-poppins font-semibold text-sm md:text-base text-[#2A2320] group-hover:text-[#5E7657] transition-colors mb-1.5">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <p className="font-poppins text-[11px] md:text-xs text-gray-500 uppercase tracking-widest font-light">
            {issuer}
          </p>
          <span className="text-gray-300 group-hover:text-[#5E7657] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-sm">
            ↗
          </span>
        </div>
      </div>
      <span className="font-telegraf text-xs md:text-sm text-gray-400 whitespace-nowrap pl-2">
        {year}
      </span>
    </a>
  </motion.div>
);