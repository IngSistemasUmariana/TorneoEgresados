// src/modules/register/components/StepContainer.tsx
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const StepContainer: React.FC<PropsWithChildren & { key?: string }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -22 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);
