import { NavLink } from "react-router-dom";

export default function Header() {
    const getLinkClasses = ({ isActive }) => {
        const baseClasses = "flex-1 cursor-pointer text-center rounded-full py-2 transition-colors duration-300";

        return isActive 
        ? `${baseClasses} bg-blue-400 bg-opacity-25`
        : `${baseClasses} hover:bg-blue-300`;
    }

    return (
        <header className="fixed flex flex-col lg:flex-row items-center gap-3 lg:gap-5 top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">

            <div className="bg-fundo shadow-md border border-primaria rounded-full flex items-center gap-2 pl-2 pr-6 py-1">
                <img className="h-10 w-10 lg:h-12 lg:w-12" src="/favpsy.svg" alt="Psyduck" />
                <h1 className="text-2xl lg:text-3xl font-extrabold">EmpregoAÍ</h1>
            </div>

            <div className="bg-fundo border border-primaria rounded-full shadow-md w-full lg:flex-1">
                <ul className="flex items-center justify-between lg:justify-center h-12 gap-1 md:gap-10 px-2 lg:px-5 font-semibold text-xs md:text-base">
                    <NavLink to="/" className={getLinkClasses}>Buscar Vagas</NavLink>
                    <NavLink to="/filtros" className={getLinkClasses}>Filtros</NavLink>
                    <NavLink to="/monitoramento" className={getLinkClasses}>Monitoramento</NavLink>
                </ul>
            </div>

        </header>
    );
}