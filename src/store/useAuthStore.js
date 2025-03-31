import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { userKeyLS } from "../utils/constants/user-key-ls";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    user: null,
    initializing: true,
    isAuthenticated: false,
    error: false,

    login: async () => {
        const provider = new GoogleAuthProvider();
        auth.useDeviceLanguage();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            
            //  info necesaria
            const filteredUser = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
            };

            set({
                error: false,
                user: filteredUser,
                isAuthenticated: true,
            });

            localStorage.setItem(userKeyLS, JSON.stringify(get().user ?? {}));
        } catch (error) {
            console.error("Error en la autenticación:", error);
            set({ error: true });
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            set({
                user: null,
                isAuthenticated: false,
                error: false,
            });
            localStorage.removeItem(userKeyLS);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            set({ error: true });
        }
    },

    setSession: (user) => {
        set({
            user,
            isAuthenticated: true,
        });
        localStorage.setItem(userKeyLS, JSON.stringify(user));
    },

    validateAuthentication: () => {
        const user = localStorage.getItem(userKeyLS);
        console.log("Usuario obtenido del localStorage",user);
        
        if(!user) return;
        try {
            set({
                isAuthenticated: true,
                user: typeof(user) === "string" ? JSON.parse(user) : user,
            });
        } catch (error) {
            console.error("Error validando autenticación:", error);
            set({ isAuthenticated: false, user: null });
        }
    },

    initAuthListener: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                    },
                    isAuthenticated: true,
                    initializing: false,
                });
                localStorage.setItem(userKeyLS, JSON.stringify(get().user ?? {}));
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                    initializing: false,
                });
                localStorage.removeItem(userKeyLS);
            }
        });
    },
}));
