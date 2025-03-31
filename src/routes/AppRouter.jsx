import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import { SignInPage } from "../pages/SignInPage";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loading } from "../components/ui/Loading";

export const AppRouter = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const { validateAuthentication, isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (isLoading) {
      validateAuthentication();
      setLoading(false);
    }
  }, [validateAuthentication]);

  // Mientras se valida la autenticación
  if (isLoading) {
    return <Loading />;
  }

//   useEffect(() => {
//     const handleBackButton = () => {
//       navigate(1); // Evita volver atrás
//     };

//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handleBackButton);

//     return () => {
//       window.removeEventListener("popstate", handleBackButton);
//     };
//   }, [navigate]);\



  return (
    <Routes>
   
        {/* Si está autenticado, muestra el chat; si no, redirige al inicio */}
        <Route path="/chat/*" element={isAuthenticated ? <ChatPage /> : <Navigate to="/" replace />} />

        {/* Si está autenticado, redirige al chat; si no, muestra la página de inicio de sesión */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/chat" replace /> : <SignInPage />} />

        {/* Cualquier otra ruta redirige a su respectiva pagina*/}
        <Route path="/*" element={isAuthenticated ? <Navigate to="/chat" replace /> : <Navigate to="/" replace /> } />
 
    </Routes>
  );
};
