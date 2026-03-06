export interface VoiceLabels {
  connecting: string;
  connected: string;
  listening: string;
  processing: string;
  speaking: string;
  idle: string;
  error: string;
  reconnecting: string;
  form: string;
  tapToSpeak: string;
  backToText: string;
  endCall: string;
  you: string;
  ai: string;
  name: string;
  email: string;
  phone: string;
  submit: string;
  submitting: string;
  formTitle: string;
  formError: string;
  connectionError: string;
  microphoneError: string;
  retry: string;
  preFormTitle: string;
  preFormSubtitle: string;
  skipForm: string;
}

export const VOICE_LABELS: Record<"es" | "en", VoiceLabels> = {
  es: {
    connecting: "CONECTANDO",
    connected: "CONECTADO",
    listening: "ESCUCHANDO",
    processing: "PROCESANDO",
    speaking: "HABLANDO",
    idle: "LISTO",
    error: "ERROR",
    reconnecting: "RECONECTANDO",
    form: "TUS DATOS",
    tapToSpeak: "Habla para comenzar",
    backToText: "Volver a texto",
    endCall: "Terminar",
    you: "Tu",
    ai: "AI",
    name: "Nombre",
    email: "Email",
    phone: "Telefono (opcional)",
    submit: "Continuar",
    submitting: "Enviando...",
    formTitle: "Para ayudarte mejor",
    formError: "Por favor completa todos los campos correctamente",
    connectionError: "No se pudo conectar. Verifica tu conexion.",
    microphoneError: "Click ðŸ”’ en la barra de direcciones para permitir microfono",
    retry: "Reintentar",
    preFormTitle: "ANTES DE EMPEZAR",
    preFormSubtitle: "Comparte tus datos principales para activar el modo voz",
    skipForm: "Saltar por ahora",
  },
  en: {
    connecting: "CONNECTING",
    connected: "CONNECTED",
    listening: "LISTENING",
    processing: "PROCESSING",
    speaking: "SPEAKING",
    idle: "READY",
    error: "ERROR",
    reconnecting: "RECONNECTING",
    form: "YOUR DETAILS",
    tapToSpeak: "Speak to begin",
    backToText: "Back to text",
    endCall: "End",
    you: "You",
    ai: "AI",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    submit: "Continue",
    submitting: "Sending...",
    formTitle: "To help you better",
    formError: "Please fill in all fields correctly",
    connectionError: "Could not connect. Check your connection.",
    microphoneError: "Click ðŸ”’ in address bar to allow microphone",
    retry: "Retry",
    preFormTitle: "BEFORE WE START",
    preFormSubtitle: "Share your main details to activate voice mode",
    skipForm: "Skip for now",
  },
};
