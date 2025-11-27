
import React, { useState } from 'react';
import { interpretCry } from '../services/geminiService';
import { CryInterpretationResponse, LoadingState } from '../types';
import { HeartHandshake, Baby, Activity, Moon, Sun, AlertCircle, RefreshCw, Heart } from 'lucide-react';

// Helper icon
const WindIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
);

const STATES = [
  { id: 'agitado', label: 'Bebê Agitado', icon: <Activity size={18} /> },
  { id: 'chorando', label: 'Chorando sem parar', icon: <AlertCircle size={18} /> },
  { id: 'inquieto', label: 'Muito Inquieto', icon: <WindIcon size={18} /> },
  { id: 'acordando', label: 'Acordando à noite', icon: <Moon size={18} /> },
  { id: 'manhoso', label: 'Bebê Manhoso', icon: <Baby size={18} /> },
];

export const CryInterpreter: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<CryInterpretationResponse | null>(null);

  const handleSelect = async (stateLabel: string) => {
    setSelectedState(stateLabel);
    setStatus(LoadingState.GENERATING);
    try {
      const data = await interpretCry(stateLabel);
      setResult(data);
      setStatus(LoadingState.COMPLETE);
    } catch (e) {
      setStatus(LoadingState.ERROR);
    }
  };

  const reset = () => {
    setStatus(LoadingState.IDLE);
    setResult(null);
    setSelectedState(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-20 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-400"></div>
        
        {!result ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-pink-500/20 px-4 py-1.5 rounded-full text-pink-200 text-xs font-bold uppercase tracking-widest mb-4">
                <HeartHandshake size={14} /> Apoio Emocional
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                O bebê está chorando ou agitado?
              </h3>
              <p className="text-indigo-200 text-sm md:text-base max-w-lg mx-auto">
                Selecione como ele está agora para recebermos uma orientação rápida e acolhedora antes da história.
              </p>
            </div>

            {status === LoadingState.GENERATING ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <RefreshCw className="w-10 h-10 text-pink-300 animate-spin" />
                <p className="text-pink-200 font-medium animate-pulse">Respirando fundo e buscando calma...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {STATES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleSelect(st.label)}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-indigo-500/20 hover:bg-pink-500/30 border border-indigo-400/30 hover:border-pink-400 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1"
                  >
                    <div className="text-indigo-200 group-hover:text-pink-100 transition-colors">
                      {st.icon}
                    </div>
                    <span className="text-white font-bold text-sm text-center">{st.label}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="animate-fade-in-up space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xl font-heading font-bold text-pink-200 flex items-center gap-2">
                <Heart size={20} fill="currentColor" /> Acolhimento para agora
              </h4>
              <button onClick={reset} className="text-xs text-indigo-300 hover:text-white underline">
                Voltar
              </button>
            </div>

            <div className="bg-pink-900/20 p-5 rounded-2xl border border-pink-500/20">
              <p className="text-white text-lg leading-relaxed font-medium">
                {result.explanation}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-indigo-300 text-sm font-bold uppercase mb-3">Pode ser...</h5>
                <ul className="space-y-2">
                  {result.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-indigo-100 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0"></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-indigo-300 text-sm font-bold uppercase mb-3">Tente agora...</h5>
                <ul className="space-y-2">
                  {result.actions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-white font-medium text-sm">
                       <span className="text-green-400 text-xs mt-0.5">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mt-4">
              <p className="text-indigo-200 italic text-center mb-4">
                "{result.comfortForMom}"
              </p>
              <div className="bg-indigo-950/50 p-4 rounded-xl text-center border border-indigo-500/20">
                 <p className="text-green-300 text-sm font-bold flex items-center justify-center gap-2">
                    <Sun size={14} /> Dica Final: {result.stabilization}
                 </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
