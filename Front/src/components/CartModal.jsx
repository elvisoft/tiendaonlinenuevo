import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout }) {
    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="card">
                <div style={styles.header}>
                    <h2 style={styles.title}>Tu Carrito</h2>
                    <button onClick={onClose} className="icon-btn">
                        <X size={20} />
                    </button>
                </div>

                <div style={styles.body}>
                    {cart.length === 0 ? (
                        <div style={styles.empty}>
                            <p>El carrito está vacío</p>
                        </div>
                    ) : (
                        <ul style={styles.list}>
                            {cart.map(item => (
                                <li key={item.id} style={styles.item}>
                                    <img src={item.image} alt={item.title} style={styles.itemImage} />
                                    <div style={styles.itemInfo}>
                                        <div style={styles.itemTitle}>{item.title}</div>
                                        <div style={styles.itemPrice}>$ {item.price.toLocaleString()}</div>

                                        <div style={styles.controls}>
                                            <button
                                                style={styles.controlBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                style={styles.controlBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        style={styles.removeBtn}
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={18} color="#e41e3f" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={styles.footer}>
                    <div style={styles.totalRow}>
                        <span>Total:</span>
                        <span style={styles.totalPrice}>$ {total.toLocaleString()}</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={cart.length === 0}
                        onClick={() => {
                            onClose();
                            onCheckout();
                        }}
                    >
                        Finalizar Compra
                    </button>
                </div>

            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(240, 242, 245, 0.8)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '400px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: '16px',
        borderBottom: '1px solid var(--divider)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
    },
    empty: {
        textAlign: 'center',
        padding: '40px 0',
        color: 'var(--secondary-text)',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    item: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    itemImage: {
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        objectFit: 'cover',
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '4px',
    },
    itemPrice: {
        fontSize: '14px',
        color: 'var(--secondary-text)',
        marginBottom: '8px',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#F0F2F5',
        padding: '2px',
        borderRadius: '4px',
        width: 'fit-content',
    },
    controlBtn: {
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
    },
    removeBtn: {
        padding: '8px',
        opacity: 0.7,
    },
    footer: {
        padding: '16px',
        borderTop: '1px solid var(--divider)',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px',
    },
    totalPrice: {
        color: 'var(--primary)',
    }
};
