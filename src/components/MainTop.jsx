import Image from "next/image";
import "./something.css"

const MainTop = () => {
    return (
        <>
            <p className="main-top-string"><span className="main-top-span"> <b>Главная</b></span><Image src="/icon-arrow-right.svg" width={24} height={24} className="main-top-img" alt="arrow"/><span>Поиск</span></p>
        </>
    );
}

export default MainTop;