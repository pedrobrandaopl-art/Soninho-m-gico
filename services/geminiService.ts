
import { GoogleGenAI } from "@google/genai";
import { StoryParams, StoryResponse, CryInterpretationResponse } from "../types";

const SYSTEM_INSTRUCTION = `
Você é uma especialista mundial em sono infantil e storytelling terapêutico.
Sua missão é criar histórias hipnóticas, personalizadas e profundamente relaxantes, além de rotinas de sono acolhedoras.
Você ajusta o ritmo, o vocabulário e a atmosfera baseada exatamente no estado emocional do bebê e no estilo solicitado.
Nunca quebre o personagem de "contadora de histórias mágica e maternal".
`;

export const generateStory = async (params: StoryParams): Promise<StoryResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Constructing the detailed prompt based on user inputs
    const prompt = `
    ATENÇÃO: Você deve gerar um conteúdo altamente personalizado para sono infantil.

    DADOS DO PROTAGONISTA:
    – Nome do Bebê: ${params.babyName}
    – Idade: ${params.age}
    – Tema Central da História: ${params.theme}
    ${params.favoriteAnimal ? `– Bichinho Favorito: ${params.favoriteAnimal}` : ''}
    ${params.comfortObject ? `– Objeto de Conforto: ${params.comfortObject}` : ''}
    ${params.favoriteColor ? `– Cor Favorita: ${params.favoriteColor}` : ''}
    ${params.caregiverName ? `– Nome de quem lê (Mãe/Pai): ${params.caregiverName}` : ''}

    CONFIGURAÇÃO DA ATMOSFERA:
    – Estilo da História: ${params.storyStyle || 'Calma e relaxante'}
    – Estado Atual do Bebê: ${params.babyState || 'Normal/Precisando relaxar'}
    – Ritmo de Leitura Desejado: ${params.readingRhythm || 'Lento e suave'}
    
    ${params.includeRoutine ? `
    SOLICITAÇÃO DE ROTINA DE SONO:
    – Horário de Dormir: ${params.sleepTime || 'Não informado'}
    – Preferências de Rotina: ${params.routinePreferences || 'Calma e acolhimento'}
    ` : ''}

    === INSTRUÇÕES PARA A ROTINA (Se solicitada) ===
    Se o campo "includeRoutine" for true no JSON de resposta, siga estas regras estritas:
    1. Crie uma rotina de 5 a 10 minutos, calma e segura.
    2. Ambiente Ideal: Descreva luz, som e temperatura em 1 parágrafo.
    3. Passo a Passo: 5 a 8 passos curtos ("Passo 1: ...").
    4. Mini Script: 3 a 5 frases carinhosas para os pais falarem.
    5. Preparação: 1 mini parágrafo conectando com a história.

    === INSTRUÇÕES PARA A HISTÓRIA (Obrigatória) ===
    1. A história deve ter entre 8 a 12 parágrafos.
    2. Adapte o texto ao ESTADO DO BEBÊ (ex: se agitado, comece mais envolvente e vá diminuindo o ritmo; se quase dormindo, seja extremamente lento e monótono).
    3. Incorpore os "detalhes mágicos" (bichinho, cor, objeto) de forma natural na trama.
    4. Use descrições sensoriais ricas (luz, tato, sons suaves).
    5. O tom deve ser de proteção absoluta e amor incondicional.
    6. Não mencione ser uma IA.

    === ESTRUTURA DE RESPOSTA (JSON OBRIGATÓRIO) ===
    Responda APENAS com um objeto JSON válido contendo:
    
    {
      ${params.includeRoutine ? `
      "routine": {
        "environment": "Texto sobre o ambiente...",
        "steps": ["Passo 1: ...", "Passo 2: ..."],
        "script": ["Frase 1...", "Frase 2..."],
        "transition": "Texto de transição..."
      },` : ''}
      "title": "Título da História",
      "content": "Texto da história com quebras de linha \\n",
      "relaxationEnding": "Texto de relaxamento final (3 frases + micro meditação + despedida)",
      "recommendation": "Sugestão para a próxima história"
    }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");

    const json = JSON.parse(text);

    // Normalize relaxationEnding
    if (Array.isArray(json.relaxationEnding)) {
      json.relaxationEnding = json.relaxationEnding.join('\n');
    } else if (typeof json.relaxationEnding !== 'string') {
      json.relaxationEnding = String(json.relaxationEnding || '');
    }

    // Normalize routine content if present
    if (json.routine) {
        if (!Array.isArray(json.routine.steps)) json.routine.steps = [];
        if (!Array.isArray(json.routine.script)) json.routine.script = [];
        if (typeof json.routine.environment !== 'string') json.routine.environment = '';
        if (typeof json.routine.transition !== 'string') json.routine.transition = '';
    }

    return json as StoryResponse;

  } catch (error) {
    console.error("Erro ao gerar história:", error);
    throw error;
  }
};

export const interpretCry = async (babyState: string): Promise<CryInterpretationResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
    Você é um assistente especializado em interpretação emocional do choro do bebê e acolhimento materno.
    O usuário escolheu a seguinte opção sobre o estado do bebê: "${babyState}".

    Gere uma resposta JSON com a seguinte estrutura obrigatória:

    1. explanation: Explicação calma e simples sobre o que esse comportamento pode significar emocionalmente. (Sem linguagem médica, tom acolhedor).
    2. reasons: Uma lista curta (array de strings) de possíveis motivos (ex: fome, salto, superestimulação, busca por contato).
    3. actions: Lista (array de strings) do que a mãe pode fazer AGORA. Passos práticos e gentis.
    4. comfortForMom: Uma frase ou parágrafo curto de acolhimento para a mãe se sentir segura e não julgada.
    5. stabilization: Passos finais para ajudar a estabilizar o ambiente (1 frase longa ou parágrafo curto).

    REGRAS:
    - Não use linguagem médica complexa.
    - Foque em apoio emocional e rotina.
    - Seja breve, objetivo e extremamente reconfortante.
    - Não mencione que é IA.

    Responda apenas com o JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");
    
    return JSON.parse(text) as CryInterpretationResponse;

  } catch (error) {
    console.error("Erro ao interpretar choro:", error);
    throw error;
  }
};
