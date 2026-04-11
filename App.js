import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Droplet, Wind, Loader2, CheckCircle2, ShieldCheck, Apple, CheckSquare } from "lucide-react";

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const symptomsList = [
    "Cough", "Sneezing", "Runny Nose",
    "Stomach Pain", "Bloating", "Gas",
    "Anxiety", "Fatigue", "Headache"
  ];

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await response.json();
      setTimeout(() => { // Small delay to show the smooth animation
        setResult(data);
        setLoading(false);
      }, 800);
    } catch (error) {
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(2,6,23,1))] p-6 md:p-12 text-slate-100 flex flex-col items-center font-sans overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* Header section */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-4 mb-10 pt-4"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Leaf className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 drop-shadow-sm">
          Ayurveda AI
        </h1>
        <p className="text-emerald-200/70 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto">
          Discover ancient holistic wisdom tailored to your modern wellness needs.
        </p>
      </motion.div>

      {/* Main Content View */}
      <div className="w-full max-w-4xl flex flex-col gap-10 items-center">
        
        {/* Symptoms Form Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="w-full relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative w-full bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl">
            
            <h2 className="text-2xl font-medium mb-8 text-slate-200 flex items-center justify-center gap-3">
              How are you feeling today?
            </h2>

            <div className="flex flex-wrap gap-4 justify-center">
              {symptomsList.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={symptom}
                    onClick={() => handleCheckboxChange(symptom)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm md:text-base font-medium transition-colors duration-300 ${
                      isSelected
                        ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400"
                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
                    }`}
                  >
                    {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4 opacity-50" />}
                    {symptom}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileHover={selectedSymptoms.length > 0 ? { scale: 1.02 } : { scale: 1 }}
              whileTap={selectedSymptoms.length > 0 ? { scale: 0.98 } : { scale: 1 }}
              onClick={handleSubmit}
              disabled={loading || selectedSymptoms.length === 0}
              className={`mt-10 w-full md:w-2/3 mx-auto flex items-center justify-center py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                loading || selectedSymptoms.length === 0
                  ? "bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700"
                  : "bg-emerald-500 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] border border-emerald-400"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin w-6 h-6 text-emerald-500" />
                  <span className="text-slate-300">Communing with the texts...</span>
                </span>
              ) : (
                "Reveal Your Holistic Path"
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Dynamic Result Card */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div 
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-emerald-500/30 rounded-3xl blur-md opacity-70" />
              <div className="relative w-full bg-slate-900/80 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-8">
                
                {/* Disease Banner */}
                <div className="text-center pb-8 border-b border-white/5">
                  <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-800 text-teal-300 border border-teal-500/30 text-xs font-semibold tracking-widest uppercase">
                    Detected Imbalance
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
                    {result.disease}
                  </h2>
                </div>


                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Remedies Section */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="flex flex-col bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl"
                  >
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                      <Droplet className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-300 mb-4 text-lg">Curated Remedies</h3>
                    <ul className="space-y-3 mt-auto">
                      {result.remedies?.map((item, i) => (
                        <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start gap-3">
                          <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Herbs Section */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="flex flex-col bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl"
                  >
                    <div className="bg-teal-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-teal-500/20">
                      <Wind className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="font-semibold text-teal-300 mb-4 text-lg">Key Botanicals</h3>
                    <ul className="space-y-3 mt-auto">
                      {result.herbs?.map((item, i) => (
                        <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start gap-3">
                          <CheckSquare className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Diet Section */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className="flex flex-col bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl"
                  >
                    <div className="bg-lime-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-lime-500/20">
                      <Apple className="w-6 h-6 text-lime-400" />
                    </div>
                    <h3 className="font-semibold text-lime-300 mb-4 text-lg">Dietary Wisdom</h3>
                    <ul className="space-y-3 mt-auto">
                      {result.diet?.map((item, i) => (
                        <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start gap-3">
                          <CheckSquare className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" /> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;