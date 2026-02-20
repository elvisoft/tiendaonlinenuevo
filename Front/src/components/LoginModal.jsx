import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let res;
        if (isLogin) {
            res = await login(email, password);
        } else {
            res = await register(name, email, password);
        }

        if (res.success) {
            onClose();
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="card">
                <div style={styles.header}>
                    <h2 style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    <button onClick={onClose} className="icon-btn">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.body}>
                    {error && <div style={styles.error}>{error}</div>}

                    {!isLogin && (
                        <div style={styles.field}>
                            <label style={styles.label}>Nombre</label>
                            <input
                                type="text"
                                style={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                        {isLogin ? 'Entrar' : 'Continuar'}
                    </button>

                    <p style={styles.switch}>
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        <span
                            style={styles.switchLink}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? ' Regístrate' : ' Inicia sesión'}
                        </span>
                    </p>
                </form>
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
        width: '360px',
        maxWidth: '90%',
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
        gap: '12px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid var(--divider)',
        fontSize: '15px',
    },
    error: {
        backgroundColor: '#ffebe9',
        color: '#d73a49',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '14px',
    },
    switch: {
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '10px',
    },
    switchLink: {
        color: 'var(--primary)',
        fontWeight: '600',
        cursor: 'pointer',
    }
};
