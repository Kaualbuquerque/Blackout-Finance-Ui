import { useEffect } from "react";

// components/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  onClear: () => void;
}

function ErrorMessage({ message, onClear }: ErrorMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClear();
    }, 4000); // Oculta após 4 segundos

    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return <p style={{ color: "red", marginTop: "10px" }}>{message}</p>;
}

export default ErrorMessage;