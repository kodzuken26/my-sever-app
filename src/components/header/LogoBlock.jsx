import Image from "next/image";
import "./header.css"

const LogoBlock = () => {
    return (
        <div className="menu-logo-part">
            <p className="logo-text">Магазин</p>
            <button className="green-btn"> <Image src="/menu.svg" width={24} height={24} alt="Меню каталога"/> <span>Каталог</span></button>
        </div>
    );
}

export default LogoBlock;