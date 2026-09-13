import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h2>Kopi kenangan senja</h2>
      </div>
      <div className="navbar-menu">
        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/about">Tentang kami</a>
        <a href="/contact">Kontak Kami</a>
      </div>
      <div>
        <button className="cart-button">Keranjang</button>
      </div>
    </nav>
  );
}

export default Navbar;
