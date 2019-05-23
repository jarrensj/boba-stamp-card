import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i class="fas fa-coffee"></i> Boba Shop</a>
      </h1>
      <ul>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;