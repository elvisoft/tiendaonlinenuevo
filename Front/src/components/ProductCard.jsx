import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="card" style={styles.card}>
            <div style={styles.imageContainer}>
                <img src={product.image} alt={product.title} style={styles.image} />
            </div>
            <div style={styles.content}>
                <div style={styles.price}>$ {product.price.toLocaleString()}</div>
                <div style={styles.title}>{product.title}</div>
                <div style={styles.category}>{product.category}</div>

                <button
                    className="btn btn-primary"
                    style={styles.button}
                    onClick={() => onAddToCart(product)}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    imageContainer: {
        width: '100%',
        paddingTop: '100%', // 1:1 Aspect Ratio
        position: 'relative',
        backgroundColor: '#F0F2F5',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    content: {
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    price: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'var(--text)',
    },
    title: {
        fontSize: '15px',
        color: 'var(--text)',
        lineHeight: '1.2',
        height: '36px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    category: {
        fontSize: '13px',
        color: 'var(--secondary-text)',
        marginBottom: '8px',
    },
    button: {
        width: '100%',
        marginTop: 'auto',
    }
};
