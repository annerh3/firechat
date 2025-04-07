import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useFloating, shift, flip, autoUpdate } from "@floating-ui/react";
import { Fragment } from "react";
import { MoreVertical } from "lucide-react"; // Icono de tres puntos
import { MdOutlineEditNote, MdOutlineDelete } from "react-icons/md";
import { useMessageStore } from "../../store/useMessageStore";

export const ThreeDotMenu = ({className, messageId}) => {
  // Configurar Floating UI para evitar que el menú se corte
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end", // Intenta abrir abajo a la derecha
    middleware: [flip(), shift()], // Permite cambiar dirección si no hay espacio
    whileElementsMounted: autoUpdate, // Auto-ajusta el menú si cambia el tamaño de la ventana
  });
  const { setEditing, setEditingId, setIsConfirmOpen, setdeleteId } = useMessageStore();
  const handleSubmit = async () => {
    setIsConfirmOpen(true);
    setdeleteId(messageId)
  }

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <MenuButton
        ref={refs.setReference} // Vincular el botón con Floating UI
        className="hover:bg-charcoal cursor-pointer rounded-full p-2"
      >
        <MoreVertical size={20} />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          ref={refs.setFloating} // Vincular el menú con Floating UI
          style={floatingStyles} // Aplicar estilos dinámicos
          className="bg-charcoal border-charcoal absolute z-10 mt-2 w-fit rounded-lg shadow-lg focus:outline-none"
        >
          <MenuItem>
            <button onClick={()=>{setEditing(true); setEditingId(messageId)}} className="flex w-32 cursor-pointer items-center gap-2 rounded-t-lg px-2 py-2 text-left data-[focus]:bg-[#1a1818]">
              <MdOutlineEditNote size={20} />
              Editar
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={handleSubmit} className="flex w-32 cursor-pointer items-center gap-2 rounded-b-lg px-2 py-2 text-left data-[focus]:bg-[#1a1818] hover:text-red-600">
              <MdOutlineDelete size={20} />
              Eliminar
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
