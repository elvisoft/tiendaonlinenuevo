import React, { useState } from 'react';
import { X, CreditCard, Banknote } from 'lucide-react';
import axios from 'axios';

export default function CheckoutModal({ isOpen, onClose, cart, onOrderPlaced }) {
    if (!isOpen) return null;

    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            const orderData = {
                items: cart.map(item => ({
                    id: item.id,
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price
                })),
                total,
                paymentMethod
            };

            const response = await axios.post('http://localhost:3006/orders', orderData);

            if (paymentMethod === 'mercadopago' && response.data.paymentUrl) {
                // Redirigir a Mercado Pago
                window.location.href = response.data.paymentUrl;
            } else {
                alert('Pedido realizado con éxito. Puedes pagar en efectivo al recibir. Orden #' + response.data.orderId);
                onOrderPlaced();
                onClose();
            }
        } catch (err) {
            console.error(err);
            setError('Error al procesar el pedido. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="card">
                <div style={styles.header}>
                    <h2 style={styles.title}>Finalizar Compra</h2>
                    <button onClick={onClose} className="icon-btn">
                        <X size={20} />
                    </button>
                </div>

                <div style={styles.body}>
                    <div style={styles.summary}>
                        <h3>Resumen del pedido</h3>
                        <p>{cart.length} productos - Total: <strong>$ {total.toLocaleString()}</strong></p>
                    </div>

                    <div style={styles.paymentSection}>
                        <h3>Método de pago</h3>

                        <div
                            style={{ ...styles.paymentOption, borderColor: paymentMethod === 'cash' ? 'var(--primary)' : 'var(--divider)' }}
                            onClick={() => setPaymentMethod('cash')}
                        >
                            <Banknote size={24} color={paymentMethod === 'cash' ? 'var(--primary)' : '#65676b'} />
                            <div>
                                <div style={styles.optionTitle}>Efectivo / Al recibir</div>
                                <div style={styles.optionDesc}>Paga en mano cuando llegue tu pedido</div>
                            </div>
                        </div>

                        <div
                            style={{ ...styles.paymentOption, borderColor: paymentMethod === 'mercadopago' ? 'var(--primary)' : 'var(--divider)' }}
                            onClick={() => setPaymentMethod('mercadopago')}
                        >
                            <CreditCard size={24} color={paymentMethod === 'mercadopago' ? 'var(--primary)' : '#65676b'} />
                            <div>
                                <div style={styles.optionTitle}>Mercado Pago</div>
                                <div style={styles.optionDesc}>Tarjetas, Débito o Dinero en cuenta</div>
                            </div>
                        </div>
                    </div>

                    {error && <div style={styles.error}>{error}</div>}
                </div>

                <div style={styles.footer}>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Confirmar Pedido'}
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
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '450px',
        maxWidth: '95%',
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
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    summary: {
        padding: '16px',
        backgroundColor: '#F0F2F5',
        borderRadius: '8px',
    },
    paymentSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    paymentOption: {
        display: 'flex',
        gap: '16px',
        padding: '16px',
        borderRadius: '12px',
        border: '2px solid',
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'all 0.2s ease',
    },
    optionTitle: {
        fontWeight: '600',
        fontSize: '16px',
    },
    optionDesc: {
        fontSize: '13px',
        color: 'var(--secondary-text)',
    },
    footer: {
        padding: '16px',
        borderTop: '1px solid var(--divider)',
    },
    error: {
        color: '#d73a49',
        fontSize: '14px',
        textAlign: 'center',
    }
};
