import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition duration-300"
    >
      <div className=" mx-5 bg-charcoal w-full max-w-lg rounded-lg border-2 p-6 shadow-xl">
        <div className="flex items-center justify-center">
          <FiAlertTriangle className="mb-4 h-12 w-12 text-amber-600" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">
            ¿Eliminar mensaje para todos?
          </h2>

          <p className="mt-2 text-sm leading-snug text-white/70">
            Este mensaje ya no estará disponible para todos los participantes
            del chat.
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="cursor-pointer rounded-lg bg-amber-800 px-2 py-1 text-white hover:bg-amber-800/60"
            onClick={onConfirm}
          >
            Eliminar
          </button>

          <button
            className="bg-midnight hover:bg-midnight/60 cursor-pointer rounded-lg px-2 py-1 text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
