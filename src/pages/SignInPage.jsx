
import { ArrowRight, Flame } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Loading } from "../components/ui/Loading";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SignInPage = () => {
  const { login, isAuthenticated, validateAuthentication, initialing } = useAuthStore();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    await login(); // Inicia sesión
    validateAuthentication();
  };

  // Efecto que redirige cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Redirigiendo al chat...');
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  if (initialing) return <Loading />; 


  return (
    <div className="bg-obsidian flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-coal rounded-lg px-6 py-8 shadow sm:px-10">
          {/* Logo / Welcome Text */}
          <div className="mb-8 text-center">
            <div className="size-12rounded-full mx-auto flex items-center justify-center">
              <Flame className="text-amber-800" size={50} />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Bienvenido
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Inicia sesión con tu cuenta de Google para continuar
            </p>
          </div>
          {/* Google button */}
          <div className="mb-6 text-center">
            <button
              onClick={handleSignIn}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-black/40 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <FcGoogle className="min-h-5 min-w-5" />
              <span className="truncate text-xl">Continuar con Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
