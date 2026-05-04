function Header({ totalItems }) {
  return (
    <header className="header">
      <a href="#" className="logo" aria-label="PixelPlay Store">
        <span className="logo__icon">PP</span>
        <span>PixelPlay</span>
      </a>

      <a href="#cart" className="cart-link" aria-label={`Carrinho com ${totalItems} itens`}>
        <svg
          className="cart-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          <path d="M18 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          <path d="M2 3h3l2.5 11.5a2 2 0 0 0 2 1.5h8.8a2 2 0 0 0 1.9-1.4L22 7H6" />
        </svg>
        <span>{totalItems}</span>
      </a>
    </header>
  );
}

export default Header;
