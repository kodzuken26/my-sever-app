
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./catalog.css";

async function getProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products', {
            next: { revalidate: 60 }
        })

        if (!res.ok) {
            throw new Error('Failed to fetch products')
        }

        const data = await res.json()
        return data.products
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(10); 
    const [loading, setLoading] = useState(true);
    const router = useRouter(); 

    
    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
            setLoading(false);
        };

        loadProducts();
    }, []);

    
    const loadMore = () => {
        setVisibleProducts(prev => prev + 10); 
    };

    const handleProductClick = (productId) => {
        router.push(`/product/${productId}`);
    };
    
    const productsToShow = products.slice(0, visibleProducts);

    if (loading) {
        return <div className="loading">Загрузка товаров...</div>;
    }

    return (
        <div>
            <div className="catalog">
            <div className="products-grid">
                {productsToShow.map(product => (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
                        <p className="like"><Image src="/icon-like.svg" width={24} height={24} alt="Like" /></p>
                        {(product.thumbnail || (product.images && product.images[0])) && (
                            <Image
                                src={product.thumbnail || product.images[0]}
                                alt={product.title}
                                className="catalog-img"
                                width={200}
                                height={200}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }} />
                        )}
                        
                        <p className="catalog-percent">-50%</p>
                        <div className="price">
                            <p><b>{product.discountPercentage} ₽</b> <br /><span>С картой</span></p>
                            <p> {product.price} ₽<br /><span>Обычная</span></p>
                        </div>

                        <h3 className="catalog-title">{product.title}</h3>
                        <p style={{ display: 'flex', gap: '2px' }}>
                            {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                                <Image
                                    key={`yellow-${index}`}
                                    src="/yellow-star.svg"
                                    alt="★"
                                    width={16}
                                    height={16}
                                />
                            ))}
                            {Array.from({ length: 5 - Math.floor(product.rating) }).map((_, index) => (
                                <Image
                                    key={`grey-${index}`}
                                    src="/grey-star.svg"
                                    alt="☆"
                                    width={16}
                                    height={16}
                                />
                            ))}
                        </p>
                        <button className="btn-catalog" onClick={(e) => {
                                e.stopPropagation(); 
                            }}>В корзину</button>
                    </div>
                ))}
            </div>

            
            
            </div>
            {visibleProducts < products.length && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={loadMore}
                        className="btn-load-more"
                    >
                        Подгрузить еще
                    </button>
                </div>
            )}
            {visibleProducts >= products.length && products.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>
                    Все товары загружены ({products.length} товаров)
                </div>
                )}
        </div>
        
    );
}