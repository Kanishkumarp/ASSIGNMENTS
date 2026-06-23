const provider = (process.env.MODEL_PROVIDER || 'openai').toLowerCase();

function getApiConfig() {
  if (provider === 'groq') {
    return {
      apiKey: process.env.GROQ_API_KEY,
      modelName: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      label: 'Groq',
    };
  }

  return {
    apiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    label: 'OpenAI',
  };
}

function getPromptInstructions(promptType: string) {
  const map: Record<string, string> = {
    default: 'Answer clearly and accurately using the provided document context. Use bullet points when helpful and keep the output easy to read.',
    detailed: 'Provide a detailed explanation with context, key points, caveats, and a short summary at the end.',
    concise: 'Answer briefly and directly with only the most important details.',
    technical: 'Answer from a technical perspective using precise terminology, structured steps, and practical notes.',
  };

  return map[promptType] || map.default;
}

export async function generateAnswer(question: string, documentText: string, promptType = 'default'): Promise<{ output: string; model: string; provider: string; promptType: string }> {
  const instructions = getPromptInstructions(promptType);

  const config = getApiConfig();

  if (config.apiKey) {
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.modelName,
          temperature: Number(process.env.TEMPERATURE || 0.1),
          messages: [
            { role: 'system', content: `You are a QA assistant. ${instructions}` },
            { role: 'user', content: `Document context:\n${documentText}\n\nQuestion:\n${question}` },
          ],
        }),
      });

      const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
      const output = (data.choices?.[0]?.message?.content || 'No answer returned by the model.').trim();

      return {
        output,
        model: config.modelName,
        provider,
        promptType,
      };
    } catch (error) {
      console.warn('AI model call failed, using fallback response.', error);
    }
  }

  return {
    output: `Fallback answer (${promptType}):\n\nThe document context supports your question, but the live model is currently unavailable.\nPlease add your ${provider === 'groq' ? 'Groq' : 'OpenAI'} API key in the environment file to enable real AI responses.`,
    model: 'fallback',
    provider,
    promptType,
  };
}

export function getModelInfo() {
  const config = getApiConfig();

  return {
    provider,
    model: config.modelName,
    temperature: Number(process.env.TEMPERATURE || 0.1),
  };
}
