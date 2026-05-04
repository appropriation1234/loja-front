import { formatCurrency } from '../utils/formatCurrency.js';

function Cart({ items, subtotal, orderMessage, onRemove, onChangeQuantity, onCheckout }) {
  const shipping = subtotal >= 250 || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  return (
    <aside className="cart" id="cart">
      <div className="cart__header">
        <div>
          <span className="eyebrow">Pedido</span>
          <h2>Carrinho</h2>
        </div>
        <span>{items.length} item(s)</span>
      </div>

      {items.length === 0 ? (
        <p className="cart__empty">Seu carrinho ainda esta vazio.</p>
      ) : (
        <div className="cart__items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt="" />

              <div className="cart-item__content">
                <strong>{item.name}</strong>
                <span>{formatCurrency(item.price)}</span>

                <div className="quantity">
                  <button
                    type="button"
                    onClick={() => onChangeQuantity(item.id, 'decrease')}
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onChangeQuantity(item.id, 'increase')}
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="remove-button"
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remover ${item.name}`}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart__summary">
        <div>
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <div>
          <span>Frete</span>
          <strong>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong>
        </div>
        <div className="cart__total">
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </div>

      <button
        className="checkout-button"
        type="button"
        disabled={items.length === 0}
        onClick={onCheckout}
      >
        Finalizar compra
      </button>

      {orderMessage && <p className="order-message">{orderMessage}</p>}
    </aside>
  );
}

export default Cart;
