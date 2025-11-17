"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import "./product-info.css"

export default function ProductInfo({ product }) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const shareRef = useRef(null);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareRef.current && !shareRef.current.contains(event.target)) {
                setIsShareOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            
            try {
                await navigator.share({
                    title: product.title,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Ошибка分享:', error);
            }
        } else {
            
            setIsShareOpen(!isShareOpen);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setIsCopied(true);
                setIsShareOpen(false);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => {
                console.error('Ошибка копирования:', err);
            });
    };

    if (!product) {
        return <div>Информация о товаре не доступна</div>;
    }

    return (
        <div>
            <h2 className="title-h2">{product.title}</h2>
            <div className="product-info-line">
                <p>Арт. {product.sku}</p>
                <p className="rate-top" >
                    {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                        <span key={index} style={{ color: '#ffd700', fontSize: '18px' }}><Image src="/yellow-star.svg" width={20} height={20} alt='yellow-star' /></span>
                    ))}
                    {Array.from({ length: 5 - Math.floor(product.rating) }).map((_, index) => (
                        <span key={index} style={{ color: '#ccc', fontSize: '18px' }}><Image src="/grey-star.svg" width={20} height={20} alt='grey-star' /></span>
                    ))}
                    <span>({product.reviews.length}) отзыва</span>
                </p>
                
                
                <div className="share-container" ref={shareRef}>
                    <p className="img-p-top"> 
                        <button 
                            className="share-btn" 
                            onClick={handleShare}
                            aria-label="Поделиться товаром"
                        >
                            <Image src="/share.svg" width={24} height={24} alt='share' />
                        </button> 
                        <span>Поделиться</span>
                    </p>

                    
                    {isShareOpen && (
                        <div className="share-tooltip">
                            <button 
                                className="share-option"
                                onClick={copyToClipboard}
                            >
                                <Image src="/copy-icon.svg" width={20} height={20} alt="Копировать" />
                                Скопировать ссылку
                            </button>
                        </div>
                    )}
                </div>

                
                {isCopied && (
                    <div className="copy-notification">
                        Ссылка скопирована!
                    </div>
                )}

                <p className="img-p-top">
                    <Image src="/heart.png" width={24} height={24} alt='like' />
                    <span>В избранное</span>
                </p>
            </div>
            <div className="product-full">
                <div className="product-img">
                    <div className="product-img-column">
                        <Image src={product.thumbnail} alt={product.title} width={64} height={50} className="img-column" />
                        <Image src={product.thumbnail} alt={product.title} width={64} height={50} className="img-column" />
                        <Image src={product.thumbnail} alt={product.title} width={64} height={50} className="img-column" />
                        <Image src={product.thumbnail} alt={product.title} width={64} height={50} className="img-column" />
                    </div>
                    <p className="catalog-percent2">-50%</p>
                    <Image src={product.thumbnail} alt={product.title} width={608} height={496} className="main-img"/>
                </div>
                <div className="information-text">
                    <div className="price">
                        <div className="price-block">
                            <p className="price-number">{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)} ₽</p>
                            <p className="price-text">Обычная цена</p>
                        </div>
                        <div className="price-block">
                            <p className="price-number-percent">{product.price} ₽</p>
                            <p className="price-text">С картой северяночки<Image src="/info.png" width={24} height={24} alt='info' className="info-icon"/></p>
                        </div>
                    </div>
                    <button className="btn-card"><Image src="/shopping-cart.png" width={32} height={32} alt='cart' className="img-card" /> В корзину</button>
                    <p className="product-p"><Image src="/smile.png" width={24} height={10} alt='smile' style={{marginRight: '10px'}} />Вы получаете 10 бонусов</p>
                    <p className="product-p"><Image src="/bell-off.png" width={23} height={23} alt='bell' style={{marginRight: '10px'}}/> Уведомить о снижении цены</p>
                    <div className="info-bottom">
                        <div className="info-bottom-block2">
                            <p className="info-bottom-grey">Бренд</p>
                            <span>{product.brand}</span>
                        </div>
                        <div className="info-bottom-block">
                            <p>Страна производства</p>
                            <span>Россия</span>
                        </div>
                        <div className="info-bottom-block2">
                            <p className="info-bottom-grey">Упаковка</p>
                            <span>{product.weight} г</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}