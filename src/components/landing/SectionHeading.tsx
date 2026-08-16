'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  align?: 'left' | 'center';
  description?: string;
  eyebrow: string;
  id?: string;
  title: string;
}

export function SectionHeading({
  align = 'center',
  description,
  eyebrow,
  id,
  title
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`flex max-w-3xl flex-col ${alignment}`}
    >
      <span className="inline-flex rounded-[7px] border border-[#CFE2F7] bg-[#EFF7FF] px-3 py-1.5 text-[10px] font-black uppercase text-[#176BFF]">
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 text-[24px] font-extrabold leading-tight text-[#091536] sm:text-[32px]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-[13px] font-medium leading-6 text-[#64748B] sm:text-[14px]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
