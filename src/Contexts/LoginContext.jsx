import { createContext, useState, useEffect } from "react";
import ENVIRONMENT from "../config/environment";

export const LoginContext = createContext({ isLoading: true });

const LoginProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(true);
  const url_register=`/register`
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoginContext.Provider value={{ isLoading,url_register}}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider
