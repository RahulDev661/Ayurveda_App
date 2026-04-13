import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles, Loader2, CheckCircle2 } from "lucide-react";

export default function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const symptomsList = [
    "Cough", "Sneezing", "Runny Nose",
    "Stomach Pain", "Bloating", "Gas",
    "Anxiety", "Fatigue", "Headache"
  ];

  const toggleSymptom = (symptom) => {
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
      const res = await fetch("https://ayurveda-app-3886.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await res.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 800);
    } catch {
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex flex-col items-center p-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-3">
          <Leaf className="w-12 h-12 text-emerald-400" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Ayurveda AI
        </h1>
        <p className="text-slate-400 mt-2">
          Smart wellness powered by ancient science 🌿
        </p>
      </motion.div>

      {/* Symptom Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
        <h2 className="text-xl mb-6 text-center text-slate-300">
          Select your symptoms
        </h2>

        <div className="flex flex-wrap gap-3 justify-center">
          {symptomsList.map((symptom) => {
            const active = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 border ${
                  active
                    ? "bg-emerald-500 text-black border-emerald-400 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {symptom}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || selectedSymptoms.length === 0}
          className="mt-8 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition disabled:opacity-40"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" /> Processing...
            </span>
          ) : (
            "Analyze"
          )}
        </button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
          >
            <div className="text-center mb-6">
              <Sparkles className="mx-auto text-emerald-400 mb-2" />
              <h2 className="text-3xl font-bold">{result.disease}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {/* Remedies */}
              <div className="bg-black/30 p-5 rounded-2xl">
                <h3 className="text-emerald-400 mb-3">Remedies</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {result.remedies?.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-4" /> {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Herbs */}
              <div className="bg-black/30 p-5 rounded-2xl">
                <h3 className="text-teal-400 mb-3">Herbs</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {result.herbs?.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-4" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diet */}
              <div className="bg-black/30 p-5 rounded-2xl">
                <h3 className="text-lime-400 mb-3">Diet</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {result.diet?.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-4" /> {d}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
