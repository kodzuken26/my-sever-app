
"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './slider.css';

export default function ProductSlider() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products?limit=8');
                const data = await res.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setShowButtons(width <= 768 || width <= 360);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const getActiveIndicator = () => {
        const middleIndex = Math.floor(products.length / 2);
        return currentIndex < middleIndex ? 0 : 1;
    };

    const handleIndicatorClick = (indicatorIndex) => {
        const middleIndex = Math.floor(products.length / 2);
        const targetSlide = indicatorIndex === 0 ? 0 : middleIndex;
        setCurrentIndex(targetSlide);
    };

    if (loading) {
        return <div className="slider-loading">Загрузка товаров...</div>;
    }

    return (
        <div className="product-slider">

            <div className="slider-container">
                <div
                    className="slider-track"
                    ref={sliderRef}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="slider-slide">

                            <div className="slide-content">
                                <p className="like"><Image src="/icon-like.svg" width={24} height={24} alt="Like" /></p>
                                <div>
                                    <Image src={product.thumbnail} width={260} height={240} alt={product.title} className="img-product-slider"/>
                                </div>
                                
                                <div className="product-price">
                                    {product.price} ₽
                                </div>


                                <h3 className="product-title">{product.title}</h3>


                                <div className="product-rating">
                                    <div className="stars">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Image
                                                key={index}
                                                src={
                                                    index < Math.floor(product.rating)
                                                        ? '/yellow-star.svg'
                                                        : '/grey-star.svg'
                                                }
                                                alt={index < Math.floor(product.rating) ? 'filled star' : 'empty star'}
                                                width={16}
                                                height={16}
                                                className="star-image"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button className="cart-btn">
                                В корзину
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="slider-navigation">
                {showButtons && (
                    <button
                        className="nav-btn prev-btn"
                        onClick={prevSlide}
                        aria-label="Предыдущий слайд"
                    >
                        <Image src="/arrow-left.svg" width={24} height={24} alt='arrow' />
                    </button>
                )}

                <div className="slider-indicators">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === getActiveIndicator() ? 'active' : ''}`}
                            onClick={() => handleIndicatorClick(index)}
                            aria-label={`Перейти к группе слайдов ${index + 1}`}
                        />
                    ))}
                </div>

                {showButtons && (
                    <button
                        className="nav-btn next-btn"
                        onClick={nextSlide}
                        aria-label="Следующий слайд"
                    >
                        <Image src="/icon-arrow-right.svg" width={24} height={24} alt='arrow' />
                    </button>
                )}
            </div>
        </div>
    );
}