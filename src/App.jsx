import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ProductCard from './components/ProductCard.jsx';
import Cart from './components/Cart.jsx';
import EmptyState from './components/EmptyState.jsx';
import { formatCurrency } from './utils/formatCurrency.js';

const categories = ['Todos', 'RPG', 'Corrida', 'Aventura', "Shoot 'em up", 'Esporte', 'Plataforma'];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products.json');

        if (!response.ok) {
          throw new Error('Nao foi possivel carregar os produtos.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;

      const searchText = `${product.name} ${product.platform} ${product.category}`.toLowerCase();
      const matchesSearch = searchText.includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleAddToCart(product) {
    setOrderMessage('');

    setCart((currentCart) => {
      const productInCart = currentCart.find((item) => item.id === product.id);

      if (productInCart) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function handleRemoveFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  function handleChangeQuantity(productId, operation) {
    setOrderMessage('');

    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          const nextQuantity =
            operation === 'increase' ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: Math.min(Math.max(nextQuantity, 1), item.stock)
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function handleCheckout() {
    setCart([]);
    setOrderMessage('Pedido criado com sucesso!');
  }

  return (
    <div className="app">
      <Header totalItems={totalItems} />

      <main>
        <section className="hero">
          <div className="hero__content">
            <span className="hero__tag">Games classicos e colecionaveis</span>
            <h1>PixelPlay Store</h1>
            <p>
              Uma loja virtual de jogos retro feita em React, com catalogo vindo de uma
              API simulada, filtros, busca e carrinho.
            </p>
            <a href="#catalog" className="hero__button">
              Ver catalogo
            </a>
          </div>
          <div className="hero__panel" aria-label="Resumo da loja">
            <strong>{products.length || 6}</strong>
            <span>titulos retro no catalogo</span>
            <small>Frete gratis acima de {formatCurrency(250)}</small>
          </div>
        </section>

        <section className="store-layout" id="catalog">
          <div className="catalog">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Catalogo</span>
                <h2>Jogos em destaque</h2>
              </div>
              <p>{filteredProducts.length} produto(s) encontrado(s)</p>
            </div>

            <div className="filters" aria-label="Filtros de produtos">
              <label className="search-field">
                <span>Buscar</span>
                <input
                  type="search"
                  placeholder="Nome, plataforma ou genero"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={selectedCategory === category ? 'active' : ''}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {isLoading && <EmptyState title="Carregando produtos..." />}
            {error && <EmptyState title="Ops, algo deu errado" description={error} />}
            {!isLoading && !error && filteredProducts.length === 0 && (
              <EmptyState
                title="Nenhum jogo encontrado"
                description="Tente outro termo de busca ou limpe os filtros."
              />
            )}

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          <Cart
            items={cart}
            subtotal={subtotal}
            orderMessage={orderMessage}
            onRemove={handleRemoveFromCart}
            onChangeQuantity={handleChangeQuantity}
            onCheckout={handleCheckout}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
