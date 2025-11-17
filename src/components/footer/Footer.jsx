import Image from "next/image";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="logo-text">Магазин</p>
           
                <div>
                    <nav>
                        <ul className="footer-list">
                            <li className="footer-list-li">О компании</li>
                            <li className="footer-list-li">Контакты</li>
                            <li className="footer-list-li">Вакансии</li>
                            <li className="footer-list-li">Статьи</li>
                            <li className="footer-list-li">Политика обработки персональных данных</li>
                        </ul>
                    </nav>
            </div>
            <div className="footer-info">
                <div className="app-social">
                        <Image src="/instagram.png" width={24} height={24}  className="social-app-img" alt="instagram"/>
                        <Image src="/vkontakte.png" width={24} height={24} className="social-app-img" alt="vkontakte"/>
                        <Image src="/facebook.png" width={24} height={24} className="social-app-img" alt="facebook"/>
                        <Image src="/ok.png" width={24} height={24} className="social-app-img" alt="ok"/>
                </div>
                <div className="footer-number">
                    <p> <Image src="/phone.png" width={24} height={24} alt="phone"/> <span>8 800 777 33 33</span></p>
                    
                </div> 
                
            </div>
        </footer>
    );
}

export default Footer;