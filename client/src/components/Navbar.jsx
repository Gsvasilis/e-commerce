import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  AlignJustify,
} from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <span>e-commerce</span>
      </Link>
      <nav>
        <Link className="home" to="/">
          home
        </Link>
        <Link className="nav-cart" to="/cart">
          <ShoppingCart />
          {cart.length > 0 && <div className="cart-counter">{cart.length}</div>}
        </Link>
        {isAdmin && <Link to="/dashboard">Dashboard</Link>}
        <div className="nav-btns">
          {user ? (
            <button onClick={logout}>
              <LogOut />
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button>
                  {" "}
                  <UserPlus />
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button>
                  {" "}
                  <LogIn />
                  Log In
                </button>
              </Link>{" "}
            </>
          )}
        </div>
      </nav>

      {/* sidebar */}
      <div className="menu">
        <AlignJustify onClick={() => setOpenMenu((prev) => !prev)} />
      </div>
      <div className={openMenu ? "sidebar active" : "sidebar"}>
        <div className="sidebar-details">
          <Link className="home" to="/"  onClick={() => setOpenMenu((prev) => !prev)}>
            home
          </Link>
          <Link className="nav-cart" to="/cart">
            <ShoppingCart  onClick={() => setOpenMenu((prev) => !prev)} />
            {cart.length > 0 && (
              <div className="cart-counter">{cart.length}</div>
            )}
          </Link>
        </div>
        {isAdmin && <Link  to="/dashboard"  onClick={() => setOpenMenu((prev) => !prev)}>Dashboard</Link>}
        <div className="nav-btns">
          {user ? (
            <button onClick={logout} >
              <LogOut />
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup"  onClick={() => setOpenMenu((prev) => !prev)}>
                <button>
                  {" "}
                  <UserPlus />
                  Sign Up
                </button>
              </Link>
              <Link to="/login"  onClick={() => setOpenMenu((prev) => !prev)}>
                <button>
                  {" "}
                  <LogIn />
                  Log In
                </button>
              </Link>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
