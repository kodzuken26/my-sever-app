"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./page-product.css"
import ProductInfo from "@/components/product/ProductInfo";
import Slider from "@/components/product/Slider"
import RateProduct from "@/components/product/RateProduct";
import Sale from "@/components/product/Sale";

export default function ProductPage() {
    const params = useParams();
    const id = params.id;
    const [product, setProduct] = useState(null);
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const productRes = await fetch(`https://dummyjson.com/products/${id}`);
                const productData = await productRes.json();
                setProduct(productData);

                
                const saleRes = await fetch('https://dummyjson.com/products?limit=6');
                const saleData = await saleRes.json();
                setSaleProducts(saleData.products || []);

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!product) return <div>Товар не найдена</div>;

    return (
        <div className="product-container" >
            <div>
                <p className="product-line">
                    <span>Главная</span>
                    <Image src="/icon-arrow-right.svg" width={24} height={24} alt="arrow" />
                    <span>Каталог</span>
                    <Image src="/icon-arrow-right.svg" width={24} height={24} alt="arrow" />
                    <span>{product.category}</span>
                    <Image src="/icon-arrow-right.svg" width={24} height={24} alt="arrow" />
                    <span>{product.title}</span>
                </p>
            </div>
            <ProductInfo product={product} />
            
            <h2 className="h2-product-page">С этим товаром покупают</h2>
            <Slider />
            <h2 className="h2-product-page">Отзывы</h2>
            <RateProduct product={product} />
            <div className="sale-string">
                <h2>Акции</h2>
                <p>Все акции <Image src="/icon-arrow-right.svg" width={24} height={24} alt="arrow"/></p>
            </div>
            <Sale products={saleProducts}/>
            
        </div>
    );
}