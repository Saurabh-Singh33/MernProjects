import { useContext } from "react";
import { Link } from "react-router-dom";
 import { CartContext } from "../Context/CartContext";
const Navbar = () => {

  // access cart from context
  const { cart } = useContext(CartContext);

  return (
    <nav style={styles.navbar}>

      {/* Logo */}
      <h2 style={styles.logo}>MyStore</h2>

      {/* Navigation Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>
          Cart ({cart.length})
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;


// simple styling
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#333",
    color: "white"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};