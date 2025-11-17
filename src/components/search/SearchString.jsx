
"use client";
import { useState } from "react";
import Image from "next/image";
import "./search.css";

const SearchString = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        try {
            console.log('🔍 Searching for:', searchQuery);
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            
            console.log('📡 Response status:', response.status);
            const data = await response.json();
            console.log('📦 Response data:', data);
            
            if (!response.ok) {
                throw new Error(data.error || 'Search failed');
            }
            
            setSearchResults(data.products || []);
        } catch (error) {
            console.error("❌ Search error:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div>
            <h2>Поиск</h2>
            <div className="block-search">
                <input
                    type="text"
                    placeholder="Найти товар"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="btn-search"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    <Image src="/search.svg" width={24} height={24} alt="Search" />
                </button>
            </div>

            {loading && <p>Поиск...</p>}
            
            {searchResults.length > 0 && (
                <div className="search-results">
                    <h3>Результаты поиска ({searchResults.length})</h3>
                    <div className="results-grid">
                        {searchResults.map(product => (
                            <div key={product.id} className="product-card">
                                {product.thumbnail && (
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                    />
                                )}
                                <h4>{product.title}</h4>
                                <p>${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {searchQuery && !loading && searchResults.length === 0 && (
                <p>Товары не найдены</p>
            )}
        </div>
    );
};

export default SearchString;