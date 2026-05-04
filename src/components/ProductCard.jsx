import { formatCurrency } from '../utils/formatCurrency.js';

function ProductCard({ product, onAddToCart }) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />
        <span>-{discount}%</span>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.platform}</span>
          <span>{product.rating.toFixed(1)} estrelas</span>
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__footer">
          <div>
            <small>{formatCurrency(product.oldPrice)}</small>
            <strong>{formatCurrency(product.price)}</strong>
          </div>

          <button type="button" onClick={() => onAddToCart(product)}>
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
