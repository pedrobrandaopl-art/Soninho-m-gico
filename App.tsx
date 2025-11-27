
import React from 'react';
import { StarryBackground } from './components/StarryBackground';
import { StoryGenerator } from './components/StoryGenerator';
import { CryInterpreter } from './components/CryInterpreter';
import { Moon, Star, Heart, ShieldCheck, Clock, CheckCircle2, Quote, Sparkles, CloudMoon, Baby } from 'lucide-react';

function App() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-indigo-50 selection:bg-magic-300 selection:text-night-900 font-sans">
      <StarryBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-20 pb-16 px-4 md:pt-32 md:pb-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full border border-white/20 mb-6 animate-fade-in-up backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Sparkles className="text-magic-300 w-4 h-4" />
            <span className="text-indigo-100 text-sm font-bold tracking-wide uppercase">O segredo do sono tranquilo</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.1] text-white drop-shadow-2xl">
            Crie a História Mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-magic-300 via-amber-200 to-magic-300 animate-pulse">Linda e Calmante</span> <br/> Para Seu Bebê Dormir
          </h1>
          
          <p className="text-lg md:text-2xl text-indigo-100 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Uma história única, mágica e feita agora com o nome do seu filho. Ajude-o a relaxar, se sentir seguro e adormecer feliz em poucos minutos.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-6 items-center">
            <button 
              onClick={scrollToGenerator}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-magic-500 to-amber-500 hover:from-magic-400 hover:to-amber-400 text-night-900 font-extrabold text-xl rounded-full shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_rgba(245,158,11,0.7)] transition-all transform hover:-translate-y-1 hover:scale-105"
            >
              Quero Criar a História Agora
            </button>
            <span className="text-sm text-indigo-300 opacity-80 flex items-center gap-2">
              <ShieldCheck size={16} /> 100% Gratuito e Seguro
            </span>
          </div>
        </div>
      </section>

      {/* --- PROVA / EMOÇÃO --- */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-night-900/80 to-indigo-950/80 backdrop-blur-md border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-magic-300 font-bold uppercase tracking-wider text-sm">
              <Heart className="w-4 h-4" fill="currentColor" /> Por que funciona?
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              A Mágica de Ouvir o Próprio Nome
            </h2>
            <p className="text-indigo-100 text-lg leading-loose opacity-90">
              Imagine o rostinho dele quando ouvir que <strong>ele é o herói</strong> da história. A psicologia mostra que a personalização cria um senso imediato de <strong>segurança e pertencimento</strong>. Quando a criança se sente segura, o sono vem mais rápido, profundo e sem choros.
            </p>
            
            <div className="space-y-5 pt-4">
              {[
                { title: "Conexão Emocional Única", desc: "Momentos de amor que viram memórias eternas." },
                { title: "Calmaria Instantânea", desc: "Narrativa desenhada para reduzir a agitação do dia." },
                { title: "Sono Seguro e Feliz", desc: "Seu bebê dorme sabendo que é amado e protegido." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-magic-500 p-2 rounded-full mt-1 shadow-lg shadow-magic-500/20">
                    <Star className="text-night-900 w-5 h-5" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-indigo-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center relative">
             <div className="absolute inset-0 bg-magic-500/20 blur-[100px] rounded-full animate-pulse"></div>
             <div className="relative bg-white/10 p-4 rounded-[2rem] border border-white/20 backdrop-blur-sm rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop" 
                  alt="Mãe lendo para bebê dormindo" 
                  className="rounded-[1.5rem] shadow-2xl object-cover h-[500px] w-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-night-800 p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <CheckCircle2 className="text-green-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-300 uppercase font-bold">Resultado</p>
                    <p className="text-white font-bold">Bebê dormindo em 10min</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- COMO FUNCIONA --- */}
      <section className="relative z-10 py-24 px-4 bg-night-900">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">Criar Magia é Simples Assim</h2>
          <p className="text-indigo-200 text-xl font-light">Em 3 passos, você transforma a noite da sua família.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { 
              icon: <Baby size={40} />, 
              title: "1. Conte quem ele é", 
              desc: "Digite o nome carinhoso do seu bebê e a idade dele." 
            },
            { 
              icon: <Sparkles size={40} />, 
              title: "2. Escolha o tema", 
              desc: "Pode ser 'Ursinho Sonhador', 'Viagem à Lua' ou o que imaginar." 
            },
            { 
              icon: <CloudMoon size={40} />, 
              title: "3. Receba a História", 
              desc: "A IA escreve um conto perfeito e relaxante em segundos." 
            }
          ].map((step, i) => (
            <div key={i} className="relative bg-indigo-900/20 border border-indigo-500/20 p-8 rounded-3xl text-center hover:bg-indigo-800/30 transition-all group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-magic-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 bg-indigo-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-magic-300 group-hover:scale-110 transition-transform duration-500 ring-1 ring-indigo-500/30">
                {step.icon}
              </div>
              <h3 className="relative z-10 text-2xl font-bold mb-4 text-white font-heading">{step.title}</h3>
              <p className="relative z-10 text-indigo-200 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- O QUE VOCÊ RECEBE --- */}
      <section className="relative z-10 py-20">
         <div className="absolute inset-0 bg-indigo-900/30 skew-y-3 transform origin-bottom-right"></div>
         <div className="max-w-5xl mx-auto px-6 relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">O Que Você Recebe?</h2>
                <p className="text-indigo-200">Muito mais que um texto. Um ritual de amor.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  "História 100% Inédita e Exclusiva",
                  "Personalização com Nome e Idade",
                  "Tom Hipnótico Comprovado",
                  "Vocabulário Seguro para Infância",
                  "Releitura Infinita (leia toda noite)",
                  "Acesso Imediato no Celular"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle2 className="text-green-400 w-5 h-5" />
                    </div>
                    <span className="text-lg text-indigo-50 font-medium group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </section>

      {/* --- POR QUE FUNCIONA (Psicologia) --- */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-magic-300 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6 text-white">Ciência + Afeto = Sono Profundo</h2>
          <p className="text-indigo-200 text-lg md:text-xl leading-relaxed">
            O cérebro infantil ama previsibilidade e segurança. Ao ouvir uma história calma onde ele é o protagonista em um ambiente seguro, os níveis de cortisol (estresse) baixam e a melatonina (hormônio do sono) age livremente. É como um abraço em forma de palavras.
          </p>
        </div>
      </section>

      {/* --- TESTEMUNHOS --- */}
      <section className="relative z-10 py-24 bg-night-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16">Mamães que Finalmente Descansaram</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Júlia M.", 
                role: "Mãe do Theo, 2 anos", 
                text: "Eu estava exausta. O Theo lutava contra o sono toda noite. Quando li a história 'Theo e a Lua de Algodão', ele nem chegou no final. Dormiu na metade! Chorei de alívio." 
              },
              { 
                name: "Camila R.", 
                role: "Mãe da Sofia, 4 anos", 
                text: "A Sofia pedia histórias, mas as dos livros a deixavam agitada. As histórias daqui são pura calmaria. O tom é perfeito, lento, doce. Mudou nossas noites." 
              },
              { 
                name: "Patrícia L.", 
                role: "Mãe do Bento, 8 meses", 
                text: "Não sabia que funcionava pra bebê tão novinho, mas o som do meu nome lendo o nome dele relaxa ele na hora. É nosso momento sagrado de conexão." 
              }
            ].map((t, i) => (
              <div key={i} className="bg-indigo-950/40 p-10 rounded-3xl border border-white/5 relative hover:bg-indigo-900/40 transition-colors">
                <Quote className="absolute top-8 right-8 text-magic-500 opacity-20 w-12 h-12" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-indigo-100 italic mb-8 text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-magic-300 to-amber-500 rounded-full flex items-center justify-center text-night-900 font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-indigo-400 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUEM SOMOS --- */}
      <section className="relative z-10 py-12 text-center px-4 opacity-70 hover:opacity-100 transition-opacity">
        <p className="text-indigo-300 max-w-2xl mx-auto text-sm leading-relaxed">
          <strong className="text-white block mb-2">Quem Somos</strong>
          Nascemos do desejo de ajudar mães exaustas a encontrarem paz. Unimos tecnologia e psicologia infantil para criar laços reais de amor e noites tranquilas.
        </p>
      </section>

      {/* --- GERADOR (CTA FINAL) --- */}
      <section id="generator" className="relative z-10 py-24 px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-lg">
              Sua Noite de Paz <br/><span className="text-magic-300">Começa Agora</span>
            </h2>
            <p className="text-xl text-indigo-200">Preencha abaixo e veja a mágica acontecer em segundos.</p>
          </div>
          
          <CryInterpreter />
          <StoryGenerator />

          <div className="text-center mt-12 opacity-60 text-xs text-indigo-300 max-w-xl mx-auto">
            * Ao gerar a história, você concorda em usar para fins pessoais de amor e carinho. Recomendado para crianças de 0 a 5 anos.
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-8 text-center text-indigo-400 text-sm border-t border-white/5 bg-night-900">
        <p>© 2024 Histórias Mágicas Para Bebê Dormir. Feito com pó de pirlimpimpim ✨</p>
      </footer>
    </div>
  );
}

export default App;
