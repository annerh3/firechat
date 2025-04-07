import React from "react";

export const MessageSkeleton = () => {
  return (
    <div className="group flex animate-pulse cursor-default items-start gap-3 rounded-lg p-2">
      <div className="flex-1 justify-end">
        {/* Fecha y Hora (arriba)*/}
        <div className="flex items-baseline justify-end gap-2">
          <span className="bg-charcoal h-3 w-36 rounded-lg text-xs"></span>
          <span className="bg-charcoal h-3 w-28 rounded-lg text-sm font-medium"></span>
        </div>
        {/* Mensaje (abajo)*/}
        <div className="flex items-center justify-end">
          <div className="bg-charcoal mt-2 h-4 w-3/4 rounded-lg text-sm"></div>
        </div>
      </div>

      {/* Foto de Perfil (circulo)*/}
      <div className="bg-charcoal mt-1 h-8 w-8 overflow-hidden rounded-full">
        <div className="h-full w-full object-cover" />
      </div>
    </div>
  );
};
