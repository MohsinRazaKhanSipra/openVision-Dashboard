import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FullScreenLoader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: ["0 0 10px #a855f7", "0 0 20px #a855f7", "0 0 10px #a855f7"]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-4xl font-bold text-purple-500 tracking-wider"
            >
              openVision
            </motion.div>
            <motion.div
              className="w-48 h-1 bg-purple-900 rounded-full overflow-hidden relative"
            >
              <motion.div 
                className="absolute inset-y-0 left-0 bg-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
