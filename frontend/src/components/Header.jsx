import { NavLink } from "react-router-dom";

export default function Header() {
    const getLinkClasses = ({ isActive }) => {
        const baseClasses = "flex-1 cursor-pointer text-center rounded-full py-2 transition-colors duration-300";

        return isActive 
        ? `${baseClasses} bg-blue-400 bg-opacity-25`
        : `${baseClasses} hover:bg-blue-300`;
    }

    return (
        <header className="fixed flex gap-5 top-5 left-1/2 -translate-x-1/2 z-50 w-[90%]">

            <div className="top-5 left-5 bg-fundo shadow-md border border-primaria rounded-full flex items-center gap-1 pl-1 pr-6">
                <img className="ml-1 h-12 w-12" src="/favpsy.svg" alt="Psyduck"></img>
                <h1 className="text-3xl font-extrabold mb-2">EmpregoAÍ</h1>
            </div>

            <div className="bg-fundo border border-primaria rounded-full shadow-md w-[80%]">
                <ul className="flex items-center h-12 gap-36 my-1 px-5 font-semibold">
                    <NavLink to="/" className={getLinkClasses}>Buscar Vagas</NavLink>
                    <NavLink to="/filtros" className={getLinkClasses}>Filtros</NavLink>
                    <NavLink to="/monitoramento" className={getLinkClasses}>Monitoramento</NavLink>
                </ul>
            </div>

        </header>
    );
}