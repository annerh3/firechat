import { useEffect, useRef } from "react";
import { useState } from "react";
import { fireBaseCollection } from "../utils/constants/firebase-collection";
import { db } from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthStore } from "../store/useAuthStore";

export const useMessages = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const { user } = useAuthStore();
    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection(fireBaseCollection.collectionName)
                .orderBy(fireBaseCollection.collectionData.createdDate)
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    console.log("Mensajes obtenidos:", data);
                    setMessages(data);
                })

            return unsubscribe;
        }
    }, []);


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        const newMessage = {
            sender: user.name || user.email,
            avatar: user.photoUrl,
            message: inputValue,
            createdDate: firebase.firestore.FieldValue.serverTimestamp(),
        };

        addNewMessage(newMessage)
        setInputValue("");
    };

    const addNewMessage = (new_message) => {
        setIsLoading(true)
        if (!db) {
            console.error("Firestore DB no está inicializado");
            setIsLoading(false)
            return;
        }
        db.collection(fireBaseCollection.collectionName).add(new_message).then(() => {
            setIsLoading(false)
            console.log("Mensaje agregado correctamente");
        }).catch((error) => {
            console.error("Error al agregar mensaje:", error);
            setIsLoading(false)
        });
    };

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    return {
        messages,
        messagesEndRef,
        isLoading,
        inputValue,
        handleInputChange,
        handleSubmit,
    }
}