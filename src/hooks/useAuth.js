import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseInit";
import { useEffect, useState } from "react";
import { userKeyLS } from "../utils/constants/user-key-ls";

export const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => auth.currentUser);
    const [initialing, setInitialing] = useState(true);
  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialing(false); 
      localStorage.removeItem(userKeyLS)
    });
  
    return () => unSubscribe(); // Limpieza del listener al desmontar el componente
  }, []);
  
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await signInWithPopup(auth, provider);
    //   alert(user)
    

      const userBasicInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      }

      console.table(userBasicInfo);
      
      localStorage.setItem(userKeyLS, JSON.stringify(userBasicInfo ?? {}));
      
      
      navigate("/chat");
      
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  };

  return {
    handleSignIn,
    initialing,
  }
}