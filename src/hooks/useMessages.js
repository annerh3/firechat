import { useEffect, useRef } from "react";
import { useState } from "react";
import { fireBaseCollection } from "../utils/constants/firebase-collection";
import { db } from "../config/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthStore } from "../store/useAuthStore";

export const useMessages = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const { user } = useAuthStore();
    useEffect(() => {
        setIsMessagesLoading(true)
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
                    setIsMessagesLoading(false)
                    console.log("Mensajes obtenidos:", data);
                    setMessages(data);
                })

            return unsubscribe;
        }
    }, []);

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

    // Logica para enviar un nuevo mensaje
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        const newMessage = {
            sender: user.name || user.email,
            email: user.email,
            avatar: user.photoUrl,
            message: inputValue,
            isEdited: false,
            createdDate: firebase.firestore.FieldValue.serverTimestamp(),
        };

        addNewMessage(newMessage)
        setInputValue("");
    };


    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    // Logica para editar un Mensaje. Se usa en `EditMessageForm` => src/components/forms/EditMessageForm.jsx
    const handleEdit = async (messageId, editedMessage) => {
        try {
            const mensajeRef = doc(db, "fire-messages", messageId);
            await updateDoc(mensajeRef, { message: editedMessage, isEdited: true }); // Actualiza el campo "message" y "isEdited"
            console.log("Mensaje actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el mensaje:", error);
        }

    }
    // Logica para elimar un Mensaje. Se usa en `ThreeDotMenu` =>src\components\ui\ThreeDotMenu.jsx
    const handleDelete = async (messageId) => {
        console.log("Eliminando mensaje con ID: ", messageId);
        try {
            const mensajeRef = doc(db, "fire-messages", messageId);  // credenciales | nombre-coleccion | idDocumento
            await deleteDoc(mensajeRef); // Borra el documento
            console.log("Mensaje eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el mensaje:", error);
        }
    }

    // const eliminarMensaje = async (id) => {
    //     try {
    //       const mensajeRef = doc(db, "mensajes", id); // Referencia al documento
    //       await deleteDoc(mensajeRef); // Borra el documento
    //       console.log("Mensaje eliminado correctamente");
    //     } catch (error) {
    //       console.error("Error al eliminar el mensaje:", error);
    //     }
    //   };


    return {
        messages,
        messagesEndRef,
        isLoading,
        inputValue,
        isMessagesLoading,
        handleInputChange,
        handleSubmit,
        handleEdit,
        handleDelete,
    }
}