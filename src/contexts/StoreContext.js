import React, {
  createContext,
  useState,
  useEffect,
} from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loadStoragedData() {
      const user = localStorage.getItem("@RNAuth:user");
      const storeagedToken = localStorage.getItem("@RNAuth:token");

      if (user && storeagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storeagedToken}`;

        api.interceptors.response.use(
          (response) => {
            return response;
          },
          (error) => {
            if (error.response.status === 401) {
              const requestConfig = error.config;
              // O token JWT expirou
              if (error.response.body &&
                error.response.body.contains("Token")
              ) {
                if (signOut) {
                  signOut();
                }
              }

              return api;
            }

            return Promise.reject(error);
          }
        );

        setUser({
          usuario: JSON.parse(user),
          token: JSON.stringify(storeagedToken),
        });
        setLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  const Logar = (data) => {
    try {
      setLoading(true);
      console.log(data);
      // const response = await api.post("/Authenticate", {
      //   email: data.email,
      //   senha: data.password,
      // });

      if (response.data) {
        setUser(response.data);
      }

      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      // await localStorage.setItem(
      //   "@RNAuth:user",
      //   JSON.stringify(response.data.usuario)
      // );
      // await localStorage.setItem("@RNAuth:token", response.data.token);
      // await localStorage.setItem('@RNAuth:logo', JSON.stringify(response.data.logo));

      setLoading(false);
      window.location.reload();
      return true;
    } catch (err) {
      setLoading(false);
      const res = err.response
        ? err.response.data.erros[0]
        : "Falha ao gravar! Verifique as informações";
      toast.error(`${res}`, { autoClose: 3000 });
      return false;
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  }


  return (
    <StoreContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        Logar,
        signOut,
        setUser,
        setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;

