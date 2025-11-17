import Image from "next/image";
import "./header.css"

const HeaderUserBlock = () => {
    return (
        <div className="head-user-block">
            <div>
                <ul className="menu-top-ul">
                    <li className="menu-list"><Image src="/menu.svg" width={24} height={24} className="menu-li-img menu-img" alt="каталог"/><span>Каталог</span></li>
                    <li className="menu-list"><Image src="/icon-heart.svg" width={24} height={24} className="menu-li-img" alt="избранное"/><span>Избранное</span></li>
                    <li className="menu-list"><Image src="/icon-box.svg" width={24} height={24} className="menu-li-img" alt="заказы"/><span>Заказы</span></li>
                    <li className="menu-list"><Image src="/icon-card.svg" width={24} height={24} className="menu-li-img" alt="корзина"/><span>Корзина</span></li>
                </ul>
            </div>

            <div className="user-block ">
                <Image src="/avatar.png" width={40} height={40} className="user-avatar" alt="avatar"/>
                <p className="user-name">Алексей</p>
                <button className="btn-top-menu"><Image src="/icon-arrow-down.svg" width={24} height={24} alt="arrow-down"/></button>
            </div>
        </div>
    );
}

export default HeaderUserBlock;