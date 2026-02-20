import React, { useState } from 'react';
import { ShoppingCart, Search, Store, Bell, MessageCircle, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cartCount, onCartClick, onLoginClick }) {
    const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav style={styles.nav}>
            <div style={styles.left}>
                <div style={styles.logo}>
                    <Store size={28} color="white" />
                </div>
                <div style={styles.searchContainer}>
                    <Search size={20} color="#65676B" style={{ marginLeft: 10 }} />
                    <input
                        type="text"
                        placeholder="Buscar en Marketplace"
                        style={styles.searchInput}
                    />
                </div>
            </div>

            <div style={styles.center}>
                {/* Placeholder for center navigation if needed */}
            </div>

            <div style={styles.right}>
                <button className="icon-btn">
                    <MessageCircle size={20} />
                </button>
                <button className="icon-btn">
                    <Bell size={20} />
                </button>
                <button className="icon-btn" onClick={onCartClick}>
                    <ShoppingCart size={20} />
                    {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>

                <div style={{ position: 'relative' }}>
                    {user ? (
                        <div style={styles.userSection} onClick={() => setShowUserMenu(!showUserMenu)}>
                            <div style={styles.avatar}>
                                {user.name}
                            </div>
                            <span style={styles.userName}>{user.name}</span>

                            {showUserMenu && (
                                <div style={styles.userMenu}>
                                    <button style={styles.menuItem} onClick={logout}>
                                        <LogOut size={16} />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="icon-btn" onClick={onLoginClick}>
                            <User size={20} />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        height: 'var(--header-height)',
        backgroundColor: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: '50px',
        padding: '0 10px',
        height: '40px',
        width: '240px',
    },
    searchInput: {
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0 10px',
        outline: 'none',
        fontSize: '15px',
        color: 'var(--text)',
        width: '100%',
    },
    right: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
    },
    center: {
        flex: 1,
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 8px',
        borderRadius: '20px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F0F2F5',
        }
    },
    avatar: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--text)',
    },
    userMenu: {
        position: 'absolute',
        top: '120%',
        right: 0,
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '8px',
        minWidth: '150px',
        zIndex: 1000,
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '8px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: '#F0F2F5',
        }
    }
};
