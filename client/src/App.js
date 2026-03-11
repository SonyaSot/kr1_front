import React, { useEffect, useState } from 'react';
import './App.scss';
import { api } from './api';

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await api.getProducts();
            setProducts(data);
        } catch (err) {
            console.error("Ошибка загрузки", err);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Удалить товар?")) {
            await api.deleteProduct(id);
            loadProducts();
        }
    };

    // Функция для определения цвета категории
    const getCategoryColor = (category) => {
        const colors = {
            'Электроника': '#b8d4e3',
            'Аксессуары': '#d4b8d4',
        };
        return colors[category] || '#ffb6c1';
    };

    return (
        <div className="App">
            <header>
                <h1> Интернет-магазин Сотниковой Софии</h1>
                <p>Лучшие товары только у нас</p>
            </header>
            <main className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img 
                            src={product.image || 'https://via.placeholder.com/400x300/16213e/b8d4e3?text=No+Image'} 
                            alt={product.name}
                            className="product-image"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300/16213e/b8d4e3?text=No+Image';
                            }}
                        />
                        <span 
                            className="category-badge"
                            style={{ 
                                background: `rgba(${getCategoryColor(product.category)}, 0.2)`,
                                color: getCategoryColor(product.category),
                                border: `1px solid ${getCategoryColor(product.category)}`
                            }}
                        >
                            {product.category}
                        </span>
                        <h3>{product.name}</h3>
                        <p className="description">{product.description}</p>
                        <p className="price">{product.price.toLocaleString()} ₽</p>
                        <div className={`stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                             На складе: <span className="stock-value">{product.stock} шт.</span>
                        </div>
                        <button 
                            className="delete-btn"
                            onClick={() => handleDelete(product.id)}
                        >
                             Удалить товар
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;