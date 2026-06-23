import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PlaceholderPage({ icon: Icon, title, description }: PlaceholderPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex items-center justify-center bg-[#F4F4F5] dark:bg-[#09090B]"
    >
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Icon className="w-8 h-8 text-[#A1A1AA]" />
        </div>
        <h2 className="text-lg font-semibold text-[#18181B] dark:text-[#FAFAFA] mb-1.5">
          {title}
        </h2>
        <p className="text-[13px] text-[#A1A1AA] max-w-[280px] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
