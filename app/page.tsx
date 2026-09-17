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
  { id: 1, name: "Orbit 头戴式耳机", category: "数码影音", price: 899, badge: "NEW", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85" },
  { id: 2, name: "Cloud 陶瓷花器", category: "生活家居", price: 269, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=85" },
  { id: 3, name: "Lumen 桌面氛围灯", category: "生活家居", price: 459, badge: "HOT", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85" },
  { id: 4, name: "Studio 皮革托特包", category: "服装鞋履", price: 729, original: 899, badge: "SALE", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85" },
  { id: 5, name: "Sunday 手冲咖啡壶", category: "生活家居", price: 329, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85" },
  { id: 6, name: "Tempo 极简腕表", category: "服装鞋履", price: 1199, badge: "NEW", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85" },
  { id: 7, name: "Form 轻量运动鞋", category: "户外出行", price: 639, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85" },
  { id: 8, name: "Still 香氛蜡烛", category: "美妆个护", price: 189, image: "https://images.unsplash.com/photo-1602874801006-e26b3748a09f?auto=format&fit=crop&w=1000&q=85" },
];

const categories = [
  ["01", "服装鞋履"], ["02", "生活家居"], ["03", "数码影音"], ["04", "美妆个护"], ["05", "户外出行"],
];

const formatPrice = (price: number) => `¥${price.toLocaleString("zh-CN")}`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");

  const visibleProducts = useMemo(() => activeCategory === "全部" ? products : products.filter((item) => item.category === activeCategory), [activeCategory]);
  const searchResults = useMemo(() => products.filter((item) => `${item.name}${item.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const cartItems = products.filter((item) => cart.includes(item.id));
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const addToCart = (product: Product) => {
    if (!cart.includes(product.id)) setCart((items) => [...items, product.id]);
    notify(cart.includes(product.id) ? "这件好物已经在购物袋里" : `已将「${product.name}」加入购物袋`);
  };

  const filterBy = (category: string) => {
    setActiveCategory(category);
    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitNewsletter = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return notify("请填写有效的邮箱地址");
    setEmail("");
    notify("订阅成功，欢迎加入 NOVA");
  };

  return (
    <main id="top">
      <div className="notice"><span>新客首单立减 ¥50</span><i />满 ¥299 免费配送</div>
      <header className="site-header">
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="打开菜单">☰</button>
        <a className="brand" href="#top" aria-label="NOVA 商城首页"><span className="brand-mark">N</span><span>NOVA</span></a>
        <nav aria-label="主导航">
          <a className="active" href="#new">新品</a><a href="#shop">精选好物</a><a href="#story">灵感指南</a><a href="#about">关于我们</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setSearchOpen(true)} aria-label="搜索"><span className="search-icon" /></button>
          <button className="user-icon" onClick={() => notify("会员中心即将开放")} aria-label="个人中心">○</button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`购物袋，${cart.length} 件商品`}><span className="bag-icon">▱</span><b>{cart.length}</b></button>
        </div>
      </header>

      <section className="hero" id="new">
        <div className="hero-copy">
          <p className="eyebrow">NEW SEASON · 2026</p>
          <h1>把日常，<br /><em>过成喜欢的样子。</em></h1>
          <p className="hero-description">从轻盈穿搭到温柔家居，发现让生活焕然一新的设计好物。</p>
          <a className="primary-button" href="#shop">探索本季新品 <span>→</span></a>
          <div className="hero-stats">
            <div><strong>200+</strong><span>独立设计品牌</span></div><div><strong>48h</strong><span>闪电发货</span></div><div><strong>30天</strong><span>无忧退换</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="本季新品穿搭">
          <img src="https://cdn.aboutstatic.com/file/images/2ae6d68e3c6cc2168253f1cb230efe0a.jpeg?quality=85" alt="模特身穿红色夹克的本季造型" />
          <div className="hero-badge"><span>本周甄选</span><strong>20% OFF</strong></div>
          <div className="floating-note"><span>EDITOR&apos;S PICK</span><strong>都市漫游系列</strong><small>轻装，自在出发</small></div>
          <span className="vertical-copy">SPRING / SUMMER COLLECTION</span>
        </div>
      </section>

      <section className="category-strip" aria-label="商品分类">
        {categories.map(([no, label]) => <button onClick={() => filterBy(label)} key={no}><span>{no}</span>{label}<b>↗</b></button>)}
      </section>

      <section className="featured" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">CURATED FOR YOU</p><h2>本周灵感精选</h2></div>
          <p>每一件都经过编辑团队真实体验，<br />只留下兼具设计与实用的好物。</p>
        </div>
        <div className="filter-row" role="group" aria-label="商品分类筛选">
          {["全部", ...categories.map((item) => item[1])].map((category) => <button className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}
          <span>{visibleProducts.length} 件商品</span>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.badge && <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
                <button className={`favorite ${favorites.includes(product.id) ? "selected" : ""}`} onClick={() => setFavorites((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id])} aria-label={`收藏${product.name}`}>{favorites.includes(product.id) ? "♥" : "♡"}</button>
                <button className="quick-add" onClick={() => addToCart(product)}>{cart.includes(product.id) ? "✓ 已加入购物袋" : "＋ 加入购物袋"}</button>
              </div>
              <div className="product-meta"><div><span>{product.category}</span><h3>{product.name}</h3></div><div className="price"><strong>{formatPrice(product.price)}</strong>{product.original && <del>{formatPrice(product.original)}</del>}</div></div>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 && <div className="empty-state">该分类的新品正在路上，先看看其他好物吧。</div>}
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1500&q=85" alt="布置温暖的现代客厅" /><span>VOL. 04</span></div>
        <div className="story-copy"><p className="eyebrow">NOVA JOURNAL</p><h2>空间不必很大，<br />生活要有余地。</h2><p>我们拜访了三位创意工作者，看看他们如何用一盏灯、一把椅子和一点留白，搭出真正属于自己的家。</p><a href="#shop">阅读本期灵感 <span>→</span></a></div>
      </section>

      <section className="values" id="about">
        <p className="eyebrow">WHY NOVA</p>
        <div className="value-grid">
          <div><b>01</b><h3>设计有来处</h3><p>认识每一件产品背后的品牌与创作者。</p></div>
          <div><b>02</b><h3>品质经得住日常</h3><p>从材质、工艺到体验，我们替你认真筛选。</p></div>
          <div><b>03</b><h3>包装少一点</h3><p>减少不必要的包装，让好设计更轻盈地抵达。</p></div>
        </div>
      </section>

      <section className="newsletter">
        <div><p className="eyebrow">STAY INSPIRED</p><h2>把灵感，送进收件箱。</h2></div>
        <form onSubmit={submitNewsletter}><label htmlFor="email">订阅 NOVA 周刊，获取新品与会员专属礼遇</label><div><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="你的邮箱地址" /><button type="submit">订阅 <span>→</span></button></div></form>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">N</span><span>NOVA</span></a><p>好设计，让日常自然发光。</p></div>
        <div className="footer-links"><div><strong>选购</strong><a href="#new">本季新品</a><a href="#shop">全站商品</a><a href="#story">编辑精选</a></div><div><strong>服务</strong><a href="#about">配送说明</a><a href="#about">退换政策</a><a href="#about">帮助中心</a></div><div><strong>关注</strong><a href="#about">小红书</a><a href="#about">微信公众号</a><a href="#about">微博</a></div></div>
        <div className="footer-bottom"><span>© 2026 NOVA SELECT SHOP</span><a href="#top">回到顶部 ↑</a></div>
      </footer>

      {searchOpen && <div className="overlay" onMouseDown={() => setSearchOpen(false)}><section className="search-panel" onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={() => setSearchOpen(false)} aria-label="关闭搜索">×</button><p className="eyebrow">SEARCH NOVA</p><h2>今天想找什么？</h2><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="试试搜索：耳机、花器、灯..." /><div className="search-results">{query ? searchResults.map((item) => <button key={item.id} onClick={() => { addToCart(item); setSearchOpen(false); }}><img src={item.image} alt="" /><span><small>{item.category}</small>{item.name}</span><strong>{formatPrice(item.price)}</strong></button>) : <p>热门搜索：桌面好物 · 春日穿搭 · 通勤包袋</p>}{query && !searchResults.length && <p>没有找到相关商品，换个关键词试试。</p>}</div></section></div>}

      <div className={`drawer-backdrop ${cartOpen ? "visible" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}><div className="drawer-head"><div><p className="eyebrow">YOUR BAG</p><h2>购物袋 <sup>{cart.length}</sup></h2></div><button onClick={() => setCartOpen(false)} aria-label="关闭购物袋">×</button></div><div className="cart-list">{cartItems.length ? cartItems.map((item) => <article key={item.id}><img src={item.image} alt={item.name} /><div><small>{item.category}</small><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><button onClick={() => setCart((items) => items.filter((id) => id !== item.id))}>移除</button></div></article>) : <div className="cart-empty"><span>▱</span><h3>购物袋还是空的</h3><p>去发现一件让日常发光的好物吧。</p><button onClick={() => setCartOpen(false)}>继续逛逛</button></div>}</div>{cartItems.length > 0 && <div className="cart-summary"><p><span>商品小计</span><strong>{formatPrice(subtotal)}</strong></p><small>满 ¥299 免费配送，税费将在结算时计算</small><button onClick={() => notify("结算功能即将开放")}>去结算 <span>→</span></button></div>}</aside>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}><button onClick={() => setMenuOpen(false)} aria-label="关闭菜单">×</button><a onClick={() => setMenuOpen(false)} href="#new"><span>01</span>本季新品</a><a onClick={() => setMenuOpen(false)} href="#shop"><span>02</span>精选好物</a><a onClick={() => setMenuOpen(false)} href="#story"><span>03</span>灵感指南</a><a onClick={() => setMenuOpen(false)} href="#about"><span>04</span>关于我们</a></div>
      <div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div>
    </main>
  );
}
