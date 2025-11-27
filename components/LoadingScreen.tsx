import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // 30ms * 100 = 3000ms (3 seconds)

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} // Slower exit
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <img src="/OKS Auto/OKS Auto Logo dark mode.png" alt="O.K.S Auto" className="h-20 md:h-32 w-auto object-contain" />
                </motion.div>

                {/* Counter */}
                <div className="text-4xl md:text-6xl font-black text-white mb-4 font-mono tracking-tighter">
                    {count}%
                </div>

                {/* Loading Bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${count}%` }}
                        transition={{ ease: "linear", duration: 0.03 }} // Smooth updates with state
                        className="h-full bg-accent"
                    />
                </div>

                <div className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-white/30">
                    Initializing Systems
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
