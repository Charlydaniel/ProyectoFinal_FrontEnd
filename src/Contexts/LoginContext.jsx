import { createContext, useState, useEffect } from "react";

// 1. Crear el contexto
export const LoginContext = createContext({ isLoading: true });

// 2. Crear el Provider (nombre con mayúscula y exportado)
const LoginProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(true);

  // 3. Usar useEffect para que se ejecute una sola vez
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 4. Pasar el valor del contexto
  return (
    <LoginContext.Provider value={{ isLoading }}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider
