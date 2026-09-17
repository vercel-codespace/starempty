"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  original?: number;
  badge?: string;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Orbit Headphones", category: "Tech & Audio", price: 89, badge: "NEW", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85" },
  { id: 2, name: "Cloud Ceramic Vase", category: "Home & Living", price: 39, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=85" },
  { id: 3, name: "Lumen Table Lamp", category: "Home & Living", price: 69, badge: "HOT", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85" },
  { id: 4, name: "Studio Leather Tote", category: "Style", price: 119, original: 149, badge: "SALE", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85" },
  { id: 5, name: "Sunday Pour-Over Set", category: "Home & Living", price: 49, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85" },
  { id: 6, name: "Tempo Minimal Watch", category: "Style", price: 149, badge: "NEW", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30e?auto=format&fit=crop&w=1000&q=85" },
  { id: 7, name: "Form Lightweight Sneakers", category: "Outdoor", price: 79, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85" },
  { id: 8, name: "Still Scented Candle", category: "Beauty & Care", price: 32, image: "https://images.unsplash.com/photo-1602874801006-e26b3748a09f?auto=format&fit=crop&w=1000&q=85" },
];

const categories = [
  ["01", "Style"], ["02", "Home & Living"], ["03", "Tech & Audio"], ["04", "Beauty & Care"], ["05", "Outdoor"],
];

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");

  const visibleProducts = useMemo(() => activeCategory === "All" ? products : products.filter((item) => item.category === activeCategory), [activeCategory]);
  const searchResults = useMemo(() => products.filter((item) => `${item.name}${item.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const cartItems = products.filter((item) => cart.includes(item.id));
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const addToCart = (product: Product) => {
    if (!cart.includes(product.id)) setCart((items) => [...items, product.id]);
    notify(cart.includes(product.id) ? "This item is already in your bag" : `${product.name} added to your bag`);
  };

  const filterBy = (category: string) => {
    setActiveCategory(category);
    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitNewsletter = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return notify("Please enter a valid email address");
    setEmail("");
    notify("You’re in — welcome to NOVA");
  };

  return (
    <main id="top">
      <div className="notice"><span>$10 OFF YOUR FIRST ORDER</span><i />FREE SHIPPING OVER $75</div>
      <header className="site-header">
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>
        <a className="brand" href="#top" aria-label="NOVA home"><span className="brand-mark">N</span><span>NOVA</span></a>
        <nav aria-label="Main navigation">
          <a className="active" href="#new">New In</a><a href="#shop">Shop</a><a href="#story">Journal</a><a href="#about">Our Story</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setSearchOpen(true)} aria-label="Search"><span className="search-icon" /></button>
          <button className="user-icon" onClick={() => notify("Member accounts are coming soon")} aria-label="Account">○</button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${cart.length} items`}><span className="bag-icon">▱</span><b>{cart.length}</b></button>
        </div>
      </header>

      <section className="hero" id="new">
        <div className="hero-copy">
          <p className="eyebrow">NEW SEASON · 2026</p>
          <h1>Make every day<br /><em>feel like your own.</em></h1>
          <p className="hero-description">From effortless style to thoughtful interiors, discover design-led pieces that bring fresh energy to everyday life.</p>
          <a className="primary-button" href="#shop">Explore the new season <span>→</span></a>
          <div className="hero-stats">
            <div><strong>200+</strong><span>Independent brands</span></div><div><strong>48h</strong><span>Fast dispatch</span></div><div><strong>30 days</strong><span>Easy returns</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="New-season styling">
          <img src="https://cdn.aboutstatic.com/file/images/2ae6d68e3c6cc2168253f1cb230efe0a.jpeg?quality=85" alt="Model wearing a red jacket from the new-season collection" />
          <div className="hero-badge"><span>WEEKLY EDIT</span><strong>20% OFF</strong></div>
          <div className="floating-note"><span>EDITOR&apos;S PICK</span><strong>City Roam</strong><small>Travel light. Move freely.</small></div>
          <span className="vertical-copy">SPRING / SUMMER COLLECTION</span>
        </div>
      </section>

      <section className="category-strip" aria-label="Product categories">
        {categories.map(([no, label]) => <button onClick={() => filterBy(label)} key={no}><span>{no}</span>{label}<b>↗</b></button>)}
      </section>

      <section className="featured" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">CURATED FOR YOU</p><h2>This Week’s Edit</h2></div>
          <p>Every piece is tried and tested by our editors,<br />selected for both form and function.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter products by category">
          {["All", ...categories.map((item) => item[1])].map((category) => <button className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}
          <span>{visibleProducts.length} products</span>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.badge && <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
                <button className={`favorite ${favorites.includes(product.id) ? "selected" : ""}`} onClick={() => setFavorites((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id])} aria-label={`Save ${product.name}`}>{favorites.includes(product.id) ? "♥" : "♡"}</button>
                <button className="quick-add" onClick={() => addToCart(product)}>{cart.includes(product.id) ? "✓ Added to bag" : "+ Add to bag"}</button>
              </div>
              <div className="product-meta"><div><span>{product.category}</span><h3>{product.name}</h3></div><div className="price"><strong>{formatPrice(product.price)}</strong>{product.original && <del>{formatPrice(product.original)}</del>}</div></div>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 && <div className="empty-state">New pieces are on the way. Explore another collection for now.</div>}
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1500&q=85" alt="Warmly styled modern living room" /><span>VOL. 04</span></div>
        <div className="story-copy"><p className="eyebrow">NOVA JOURNAL</p><h2>You don’t need more space.<br />You need room to live.</h2><p>We visited three creative homes to see how one light, one chair and a little breathing room can make a space feel truly personal.</p><a href="#shop">Read the story <span>→</span></a></div>
      </section>

      <section className="values" id="about">
        <p className="eyebrow">WHY NOVA</p>
        <div className="value-grid">
          <div><b>01</b><h3>Design with a story</h3><p>Meet the independent brands and makers behind every piece.</p></div>
          <div><b>02</b><h3>Made for real life</h3><p>Materials, craft and feel — we test every detail before it reaches you.</p></div>
          <div><b>03</b><h3>Less packaging</h3><p>We keep the extras to a minimum so good design travels lighter.</p></div>
        </div>
      </section>

      <section className="newsletter">
        <div><p className="eyebrow">STAY INSPIRED</p><h2>A little inspiration,<br />straight to your inbox.</h2></div>
        <form onSubmit={submitNewsletter}><label htmlFor="email">Join the NOVA journal for new arrivals and member-only edits.</label><div><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" /><button type="submit">Subscribe <span>→</span></button></div></form>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">N</span><span>NOVA</span></a><p>Good design makes the everyday shine.</p></div>
        <div className="footer-links"><div><strong>SHOP</strong><a href="#new">New Arrivals</a><a href="#shop">All Products</a><a href="#story">Editor’s Picks</a></div><div><strong>HELP</strong><a href="#about">Shipping</a><a href="#about">Returns</a><a href="#about">Help Center</a></div><div><strong>FOLLOW</strong><a href="#about">Instagram</a><a href="#about">Pinterest</a><a href="#about">TikTok</a></div></div>
        <div className="footer-bottom"><span>© 2026 NOVA SELECT SHOP</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      {searchOpen && <div className="overlay" onMouseDown={() => setSearchOpen(false)}><section className="search-panel" onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button><p className="eyebrow">SEARCH NOVA</p><h2>What are you looking for?</h2><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try headphones, vase, lamp..." /><div className="search-results">{query ? searchResults.map((item) => <button key={item.id} onClick={() => { addToCart(item); setSearchOpen(false); }}><img src={item.image} alt="" /><span><small>{item.category}</small>{item.name}</span><strong>{formatPrice(item.price)}</strong></button>) : <p>Trending: Desk refresh · Spring layers · Everyday totes</p>}{query && !searchResults.length && <p>No matches yet. Try another search term.</p>}</div></section></div>}

      <div className={`drawer-backdrop ${cartOpen ? "visible" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}><div className="drawer-head"><div><p className="eyebrow">YOUR BAG</p><h2>Shopping Bag <sup>{cart.length}</sup></h2></div><button onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button></div><div className="cart-list">{cartItems.length ? cartItems.map((item) => <article key={item.id}><img src={item.image} alt={item.name} /><div><small>{item.category}</small><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><button onClick={() => setCart((items) => items.filter((id) => id !== item.id))}>Remove</button></div></article>) : <div className="cart-empty"><span>▱</span><h3>Your bag is empty</h3><p>Discover something made to brighten the everyday.</p><button onClick={() => setCartOpen(false)}>Keep browsing</button></div>}</div>{cartItems.length > 0 && <div className="cart-summary"><p><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></p><small>Free shipping over $75. Taxes calculated at checkout.</small><button onClick={() => notify("Checkout is coming soon")}>Checkout <span>→</span></button></div>}</aside>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}><button onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button><a onClick={() => setMenuOpen(false)} href="#new"><span>01</span>New In</a><a onClick={() => setMenuOpen(false)} href="#shop"><span>02</span>Shop</a><a onClick={() => setMenuOpen(false)} href="#story"><span>03</span>Journal</a><a onClick={() => setMenuOpen(false)} href="#about"><span>04</span>Our Story</a></div>
      <div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div>
    </main>
  );
}
