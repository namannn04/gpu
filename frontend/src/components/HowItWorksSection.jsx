import { motion } from 'framer-motion';
import { FiCpu, FiDollarSign, FiAward, FiCheckCircle } from 'react-icons/fi';

const cards = [
  {
    icon: FiCpu,
    step: "1",
    title: "Enter Your Workload",
    description: "Define your GPU task needs — performance, resolution, compute demands — for exact matches.",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    glow: "shadow-[0_0_20px_#3b82f6]"
  },
  {
    icon: FiDollarSign,
    step: "2",
    title: "Get Real-Time Pricing",
    description: "Analyze market prices instantly with vendor-wise trends to spot best deals.",
    gradient: "from-teal-500 via-cyan-500 to-sky-500",
    glow: "shadow-[0_0_20px_#06b6d4]"
  },
  {
    icon: FiAward,
    step: "3",
    title: "Smart GPU Suggestions",
    description: "50+ parameters analyzed by AI to recommend best-fit GPUs within budget.",
    gradient: "from-pink-500 via-fuchsia-600 to-purple-700",
    glow: "shadow-[0_0_20px_#ec4899]"
  },
  {
    icon: FiCheckCircle,
    step: "4",
    title: "Compare & Finalize",
    description: "Detailed comparisons: benchmarks, efficiency, vendor trust — all in one view.",
    gradient: "from-lime-500 via-emerald-500 to-green-600",
    glow: "shadow-[0_0_20px_#22c55e]"
  }
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-white text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cards.map(({ icon: Icon, ...card }, index) => (
            <motion.div
              key={index}
              className={`relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl ${card.glow}`}
              initial="offscreen"
              whileInView="onscreen"
              whileHover={{ y: -10 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              variants={cardVariants}
            >
              {/* Animated Orb */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Step badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md border border-white/10">
                {card.step}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5 border border-white/10">
                <Icon className="text-white text-2xl" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-white">{card.title}</h3>
              <p className="text-sm text-white/80 mb-4">{card.description}</p>
              <div className="mt-auto text-xs opacity-70 pt-2 border-t border-white/10">STEP {card.step}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
