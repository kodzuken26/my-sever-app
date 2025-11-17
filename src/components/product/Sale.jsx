import Image from 'next/image';
import "./sale.css"

export default function Sale({ products }) {
    if (!products || !Array.isArray(products)) {
        return <div>Информация о товарах не доступна</div>;
    }

    // Берем первые 6 товаров для акции
    const saleProducts = products.slice(0, 6);

    return (
        <div className="sale-container">
            <div className="products-grid">
                {saleProducts.map(product => (
                    <div key={product.id} className="product-card">
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
                        <button className="btn-catalog">В корзину</button>
                    </div>
                ))}
            </div>
        </div>
    )
}