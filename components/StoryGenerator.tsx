import React, { useState } from 'react';
import { Sparkles, Moon, BookOpen, RefreshCw, Star, Heart, Music, Wind, Smile, User, Palette, Cat, Archive, Settings2, Clock, CheckCircle2, ListChecks } from 'lucide-react';
import { generateStory } from '../services/geminiService';
import { StoryParams, StoryResponse, LoadingState } from '../types';

export const StoryGenerator: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [params, setParams] = useState<StoryParams>({
    babyName: '',
    age: '',
    theme: '',
    storyStyle: 'História calma e relaxante',
    babyState: 'Bebê precisando relaxar',
    readingRhythm: 'Leitura média (maternal)',
    favoriteAnimal: '',
    comfortObject: '',
    favoriteColor: '',
    caregiverName: '',
    includeRoutine: false,
    sleepTime: '',
    routinePreferences: ''
  });
  
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [story, setStory] = useState<StoryResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.babyName || !params.theme) return;

    setStatus(LoadingState.GENERATING);
    try {
      const result = await generateStory(params);
      setStory(result);
      setStatus(LoadingState.COMPLETE);
    } catch (error) {
      setStatus(LoadingState.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(LoadingState.IDLE);
    setStory(null);
    setParams(prev => ({ ...prev, theme: '' })); // Keep name/age/prefs, clear theme for new story
  };

  if (status === LoadingState.COMPLETE && story) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Routine Card (Only if generated) */}
        {story.routine && (
            <div className="bg-indigo-900/40 backdrop-blur-xl border border-indigo-400/30 rounded-[2rem] p-8 md:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-indigo-500"></div>
                <div className="flex items-center gap-3 mb-6 text-teal-200 uppercase tracking-widest text-sm font-bold">
                    <ListChecks size={20} /> Rotina de Sono Personalizada
                </div>

                <div className="space-y-8">
                    <div className="bg-night-900/50 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-white font-heading font-bold text-lg mb-2 flex items-center gap-2">
                             🌙 Ambiente Ideal
                        </h4>
                        <p className="text-indigo-200 leading-relaxed">{story.routine.environment}</p>
                    </div>

                    <div>
                        <h4 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
                            👣 Passo a Passo de Calmaria
                        </h4>
                        <div className="space-y-3">
                            {story.routine.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-indigo-100">
                                    <span className="bg-indigo-500/20 text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                                        {idx + 1}
                                    </span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-900/40 to-night-900/40 p-6 rounded-2xl border border-white/5 italic">
                        <h4 className="text-indigo-300 text-sm font-bold uppercase mb-3 flex items-center gap-2">
                            💬 Frases de Carinho (Sussurre para o bebê)
                        </h4>
                        <div className="space-y-2 text-indigo-100">
                            {story.routine.script.map((line, idx) => (
                                <p key={idx}>"{line}"</p>
                            ))}
                        </div>
                    </div>

                    <div className="text-center text-indigo-300 font-medium pt-2 animate-pulse">
                        {story.routine.transition}
                    </div>
                </div>
            </div>
        )}

        {/* Main Story Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-magic-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex justify-center mb-8">
                <div className="bg-indigo-500/20 p-3 rounded-full border border-white/10">
                    <Moon size={40} className="text-magic-300" fill="currentColor" />
                </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 text-center leading-tight drop-shadow-md">
                {story.title}
            </h3>
            
            <div className="prose prose-invert prose-lg max-w-none mb-12 leading-loose text-indigo-50 font-sans tracking-wide text-lg md:text-xl">
            {story.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && <p key={idx} className="mb-6 opacity-90 first-letter:text-3xl first-letter:font-heading first-letter:text-magic-300">{paragraph}</p>
            ))}
            </div>
        </div>

        {/* Relaxation & Meditation Card */}
        <div className="bg-indigo-950/60 backdrop-blur-md border border-magic-300/30 rounded-[2rem] p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-night-900/50"></div>
            <div className="relative z-10 text-center space-y-6">
                <div className="flex items-center justify-center gap-2 text-magic-300 uppercase tracking-widest text-sm font-bold">
                    <Wind size={16} /> Sessão de Relaxamento Final
                </div>
                <div className="space-y-4 text-indigo-100 italic text-lg font-medium">
                    {/* Defensive check for string before splitting */}
                    {typeof story.relaxationEnding === 'string' ? (
                        story.relaxationEnding.split('\n').map((line, idx) => (
                            line.trim() && <p key={idx}>{line}</p>
                        ))
                    ) : (
                        <p>{story.relaxationEnding}</p>
                    )}
                </div>
            </div>
        </div>

        {/* Recommendation & Actions */}
        <div className="flex flex-col items-center gap-6">
            {story.recommendation && (
                <div className="bg-white/5 px-6 py-3 rounded-full border border-white/10 text-indigo-200 text-sm flex items-center gap-2">
                    <Sparkles size={14} className="text-magic-300" />
                    <strong>Dica Mágica:</strong> {story.recommendation}
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <button 
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-magic-500 hover:bg-magic-400 text-night-900 font-bold text-lg rounded-full transition-all transform hover:scale-105 shadow-lg shadow-magic-500/30"
                >
                    <RefreshCw size={20} />
                    Criar Nova História
                </button>
                <button 
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full transition-all border border-white/20 hover:border-white/40"
                >
                    <BookOpen size={20} />
                    Salvar / Imprimir
                </button>
            </div>
        </div>

      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden group">
       {/* Decorative */}
       <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-magic-500/20 transition-colors duration-1000"></div>
       <div className="absolute top-8 right-8 text-magic-300 animate-pulse">
          <Star size={24} fill="currentColor" />
       </div>

      <div className="text-center mb-10">
        <h3 className="text-3xl font-heading font-bold text-white mb-2">
            Vamos Criar a História?
        </h3>
        <p className="text-indigo-200">
            Personalize cada detalhe para um sono perfeito.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-indigo-100 font-bold ml-1 text-lg">
             <User size={18} className="text-magic-300"/> Qual o nome do seu bebê?
          </label>
          <input
            type="text"
            required
            className="w-full px-6 py-4 rounded-2xl bg-night-900/60 border border-indigo-500/30 text-white text-lg placeholder-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-magic-300 transition-all shadow-inner"
            placeholder="Ex: Miguel, Alice..."
            value={params.babyName}
            onChange={(e) => setParams({ ...params, babyName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="block text-indigo-100 font-bold ml-1 text-lg">Idade</label>
                <div className="relative">
                    <select
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-night-900/60 border border-indigo-500/30 text-white text-lg focus:outline-none focus:ring-2 focus:ring-magic-300 appearance-none cursor-pointer"
                        value={params.age}
                        onChange={(e) => setParams({ ...params, age: e.target.value })}
                    >
                        <option value="" disabled>Selecione...</option>
                        <option value="0 a 12 meses">0-12 meses (Sensorial)</option>
                        <option value="1 a 2 anos">1-2 anos (Repetitivo)</option>
                        <option value="3 a 5 anos">3-5 anos (Lúdico)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-indigo-100 font-bold ml-1 text-lg">
                    <Heart size={18} className="text-magic-300"/> Tema
                </label>
                <input
                    type="text"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-night-900/60 border border-indigo-500/30 text-white text-lg placeholder-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-magic-300"
                    placeholder="Ex: Floresta, Praia..."
                    value={params.theme}
                    onChange={(e) => setParams({ ...params, theme: e.target.value })}
                />
            </div>
        </div>

        {/* Advanced Toggle */}
        <div className="pt-4 border-t border-white/10">
            <button 
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-magic-300 font-bold hover:text-magic-100 transition-colors mx-auto"
            >
                <Settings2 size={18} />
                {showAdvanced ? "Ocultar Detalhes Mágicos" : "Personalizar Atmosfera e Detalhes"}
            </button>
        </div>

        {/* Advanced Section */}
        {showAdvanced && (
            <div className="space-y-6 animate-fade-in-up bg-black/20 p-6 rounded-3xl border border-white/5">
                
                {/* Mood & Atmosphere */}
                <div className="space-y-4">
                    <h4 className="text-white font-heading font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                        <Moon size={18} className="text-indigo-300"/> Atmosfera do Sono
                    </h4>
                    
                    <div className="space-y-2">
                        <label className="text-sm text-indigo-300 font-semibold uppercase tracking-wider">Como o bebê está agora?</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white focus:ring-2 focus:ring-magic-300"
                            value={params.babyState}
                            onChange={(e) => setParams({ ...params, babyState: e.target.value })}
                        >
                            <option value="Bebê agitado">Agitado (Precisa acalmar)</option>
                            <option value="Bebê manhoso">Manhoso (Precisa de colo)</option>
                            <option value="Bebê quase dormindo">Quase dormindo (Manter o sono)</option>
                            <option value="Bebê precisando relaxar">Normal (Rotina de sono)</option>
                            <option value="Bebê acordando à noite">Acordou na madrugada (Reconforto)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-indigo-300 font-semibold uppercase tracking-wider">Estilo da História</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white focus:ring-2 focus:ring-magic-300"
                            value={params.storyStyle}
                            onChange={(e) => setParams({ ...params, storyStyle: e.target.value })}
                        >
                            <option value="História calma e relaxante">Calma e Relaxante (Padrão)</option>
                            <option value="História mágica com criaturas fofas">Mágica com Criaturas Fofas</option>
                            <option value="História com foco em respiração">Foco em Respiração</option>
                            <option value="Conto com o nome do bebê como protagonista">Bebê como Herói Absoluto</option>
                            <option value="História com sonoridade suave">Sonoridade Musical/Poética</option>
                        </select>
                    </div>

                     <div className="space-y-2">
                        <label className="text-sm text-indigo-300 font-semibold uppercase tracking-wider">Ritmo da Leitura</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white focus:ring-2 focus:ring-magic-300"
                            value={params.readingRhythm}
                            onChange={(e) => setParams({ ...params, readingRhythm: e.target.value })}
                        >
                            <option value="Leitura lenta e suave">Lenta e Suave</option>
                            <option value="Leitura média (maternal)">Média (Voz de Mãe)</option>
                            <option value="Leitura com pausas">Com Pausas para Respirar</option>
                            <option value="Leitura estilo ninar">Estilo Canção de Ninar</option>
                        </select>
                    </div>
                </div>

                {/* Routine Toggle Section */}
                <div className="space-y-4 pt-4">
                     <h4 className="text-white font-heading font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                        <ListChecks size={18} className="text-indigo-300"/> Rotina de Sono (Opcional)
                    </h4>
                    
                    <div className="flex items-center gap-3">
                         <input 
                            type="checkbox" 
                            id="includeRoutine"
                            checked={params.includeRoutine}
                            onChange={(e) => setParams({...params, includeRoutine: e.target.checked})}
                            className="w-5 h-5 rounded bg-night-900/80 border-indigo-500/50 text-magic-500 focus:ring-magic-500"
                         />
                         <label htmlFor="includeRoutine" className="text-white font-medium cursor-pointer select-none">
                            Incluir Rotina de Sono Personalizada
                         </label>
                    </div>

                    {params.includeRoutine && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in pl-2 border-l-2 border-magic-500/30 ml-1">
                            <div className="space-y-1">
                                <label className="text-xs text-indigo-300 ml-1 flex items-center gap-1"><Clock size={12}/> Horário de Dormir</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white placeholder-indigo-500/50"
                                    placeholder="Ex: 20:30"
                                    value={params.sleepTime || ''}
                                    onChange={(e) => setParams({ ...params, sleepTime: e.target.value })}
                                />
                            </div>
                             <div className="space-y-1">
                                <label className="text-xs text-indigo-300 ml-1 flex items-center gap-1"><CheckCircle2 size={12}/> Preferências (Banho, Música...)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white placeholder-indigo-500/50"
                                    placeholder="Ex: Banho morno, massagem..."
                                    value={params.routinePreferences || ''}
                                    onChange={(e) => setParams({ ...params, routinePreferences: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Magic Details */}
                <div className="space-y-4 pt-4">
                    <h4 className="text-white font-heading font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-indigo-300"/> Toques de Amor (Opcional)
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-indigo-300 ml-1 flex items-center gap-1"><Cat size={12}/> Bichinho Favorito</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white placeholder-indigo-500/50"
                                placeholder="Ex: Ursinho, Gatinho..."
                                value={params.favoriteAnimal || ''}
                                onChange={(e) => setParams({ ...params, favoriteAnimal: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-indigo-300 ml-1 flex items-center gap-1"><Archive size={12}/> Objeto de Conforto</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white placeholder-indigo-500/50"
                                placeholder="Ex: Naninha, Chupeta..."
                                value={params.comfortObject || ''}
                                onChange={(e) => setParams({ ...params, comfortObject: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-indigo-300 ml-1 flex items-center gap-1"><Palette size={12}/> Cor Favorita</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white placeholder-indigo-500/50"
                                placeholder="Ex: Azul, Amarelo..."
                                value={params.favoriteColor || ''}
                                onChange={(e) => setParams({ ...params, favoriteColor: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-indigo-300 ml-1 flex items-center gap-1"><Smile size={12}/> Quem está lendo?</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-night-900/80 border border-indigo-500/30 text-white placeholder-indigo-500/50"
                                placeholder="Ex: Mamãe, Papai, Vovó..."
                                value={params.caregiverName || ''}
                                onChange={(e) => setParams({ ...params, caregiverName: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}

        <button
          type="submit"
          disabled={status === LoadingState.GENERATING}
          className="w-full mt-6 py-6 bg-gradient-to-r from-magic-500 to-amber-500 hover:from-magic-400 hover:to-amber-400 text-night-900 font-extrabold text-xl rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {status === LoadingState.GENERATING ? (
            <>
              <RefreshCw className="animate-spin w-6 h-6" /> Tecendo Sonhos...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" fill="currentColor" /> Gerar História Mágica
            </>
          )}
        </button>
      </form>
    </div>
  );
};