import { create } from "zustand";

export const useMessageStore = create((set) => ({
    isEditing: false,
    editingId: '',
    isConfirmOpen: false,
    deleteId: '',
    setEditingId: (value) =>  set({ editingId: value}),
    setEditing: (bool) =>  set({ isEditing: bool}),
    setIsConfirmOpen: (bool) =>  set({ isConfirmOpen: bool}),
    setdeleteId: (value) =>  set({ deleteId: value}),
}));
