import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { products } from './data';

function AppContent() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { user } = useAuth();

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCheckoutClick = () => {
    if (user) {
      setIsCheckoutOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleOrderPlaced = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <div className="container" style={styles.mainContainer}>
        <div className="sidebar">
          <h3 style={styles.sidebarTitle}>Categorías</h3>
          <ul style={styles.categoryList}>
            {['Electrónica', 'Accesorios', 'Moda', 'Hogar'].map(cat => (
              <li key={cat} className="category-item">
                <div style={styles.categoryIcon} />
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.feed}>
          <div style={styles.header}>
            <h1>Destacados de hoy</h1>
            <span style={styles.location}>Buenos Aires · 65 km</span>
          </div>

          <div style={styles.grid}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckoutClick}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = {
  mainContainer: {
    display: 'flex',
    gap: '20px',
    paddingTop: '20px',
  },
  sidebarTitle: {
    fontSize: '17px',
    fontWeight: '600',
    marginBottom: '10px',
    paddingLeft: '8px',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
  },
  categoryIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#d8dadf',
  },
  feed: {
    flex: 1,
  },
  header: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  location: {
    color: 'var(--primary)',
    fontWeight: '500',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
  },
};

export default App;
