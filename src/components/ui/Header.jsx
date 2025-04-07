import { Flame } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Header = ({ messages }) => {
  const navigate = useNavigate();
  const { logout, validateAuthentication,  isAuthenticated} = useAuthStore();
  const handleLogout = async () => {
    await logout();
    validateAuthentication();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  return (
    <header className="flex items-center justify-between border-b border-gray-800 py-4">
      <div className="flex items-center gap-3">
        <Flame className="text-amber-800" />
        <h1 className="text-xl font-semibold">Fire Chat</h1>
        <button
          onClick={handleLogout}
          className="bg-charcoal hover:bg-charcoal/90 cursor-pointer rounded-lg p-1.5 text-sm transition-transform hover:scale-105 active:bg-gray-900"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="cursor-default text-xs text-gray-400">{messages.length} mensajes</div>
    </header>
  );
};
