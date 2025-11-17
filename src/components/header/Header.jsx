import HeaderUserBlock from "./HeaderUserBlock";
import LogoBlock from "./LogoBlock";
import "./header.css"


const Header = () => {
    return (
        <header className="header">
            <LogoBlock/>
            <nav aria-label="Основное меню">
            <HeaderUserBlock/>
            </nav>
        </header>
    );
}

export default Header;