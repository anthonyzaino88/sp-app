// navbar.js

class BottomNavbar extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
  
      shadowRoot.innerHTML = `
        <style>
 
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #B1B0B0;
            color: #fff;
            padding: 10px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 999;
            opacity: .95;
            margin-left: 12px;
            margin-right: 12px;
            border-radius: 10px;
            margin-bottom: 10px;
            box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
           
           
          }
  
          .nav-link {
            text-decoration: none;
            color: #fff;
            text-align: center;
            font-size: 12px;
          }
  
        </style>
  
        <nav>
          <a class="nav-link" href="/">
          <img src="/assets/images/home.svg" alt="home" class="icon-color">
            <span class="nav-icon"></span><br>Home
          </a>
          <a class="nav-link" href="/products.html">
          <img src="/assets/images/fan-white.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Products
          </a>
          <a class="nav-link" href="/products.html">
          <img src="/assets/images/library.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Library
          </a>
          <a class="nav-link" href="/products.html">
          <img src="/assets/images/right-left-white.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Cross-Reference
          </a>
          <a class="nav-link" href="/products.html">
          <img src="/assets/images/solidplay-white.svg" alt="Products" class="icon-color">
            <span class="nav-icon"></span><br>Media
          </a>
        </nav>
      `;
    }
  }
  
  customElements.define('bottom-navbar', BottomNavbar);
  