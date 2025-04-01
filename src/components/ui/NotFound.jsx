import { MessageSquareDashed } from "lucide-react";
import { LuSofa } from "react-icons/lu";
import { Link } from "react-router-dom";

export const NotFound = ({ message = "No hay datos" }) => {
  return (
    <section className="bg-transparent">
      <div className=" flex items-center px-6  mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-extrabold text-siidni-brown rounded-full bg-charcoal">

            <MessageSquareDashed  className="font-extrabold text-3xl"/>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl pointer-events-none">
            {message}
          </h1>
         
        </div>
      </div>
    </section>
  );
};
