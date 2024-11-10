// src/utils/config.ts
interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  azureEndpoint: string;
  azureApiKey: string;
}

export const validateEnvConfig = (): EnvConfig => {
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_AZURE_ENDPOINT',
    'VITE_AZURE_API_KEY'
  ];

  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // URL validation
  const supabaseUrl = new URL(import.meta.env.VITE_SUPABASE_URL);
  const azureEndpoint = new URL(import.meta.env.VITE_AZURE_ENDPOINT);

  return {
    supabaseUrl: supabaseUrl.toString(),
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    azureEndpoint: azureEndpoint.toString(),
    azureApiKey: import.meta.env.VITE_AZURE_API_KEY
  };
};