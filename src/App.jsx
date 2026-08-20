import { useEffect, useRef, useState } from 'react'
import './App.css'
import fishesImage from './assets/Fishes.jpg'

const categories = [
  { name: 'Fresh fish', icon: '🐟', color: 'sea' },
  { name: 'Vegetables', icon: '🥬', color: 'leaf' },
  { name: 'Tubers & staples', icon: '🥔', color: 'gold' },
  { name: 'Fruits', icon: '🍌', color: 'coral' },
  { name: 'Palm produce', icon: '🌴', color: 'mint' },
  { name: 'Poultry & eggs', icon: '🥚', color: 'cream' },
]

const defaultProducts = [
  { name: 'Fresh catfish', detail: 'Whole, cleaned & ready', price: '₦6,500', old: '₦7,500', farmer: 'Ebiwari Farms', location: 'Ogbia LGA', image: fishesImage, badge: 'Catch of the day' },
  { name: 'Swamp rice', detail: 'Locally grown · 5kg bag', price: '₦8,800', old: '₦10,000', farmer: 'Timi’s Rice Co-op', location: 'Sagbama LGA', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85', badge: 'Save 12%' },
  { name: 'Ugu leaves', detail: 'Freshly harvested · basket', price: '₦3,200', old: '', farmer: 'Mama Pere’s Garden', location: 'Yenagoa LGA', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=85', badge: 'Farm fresh' },
  { name: 'Red palm oil', detail: 'Pure & unadulterated · 2L', price: '₦7,500', old: '₦8,200', farmer: 'Izon Gold Produce', location: 'Nembe LGA', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85', badge: 'Best seller' },
]

const plans = [
  { name: 'Starter', price: '₦3,500', note: '10 listings · Basic visibility' },
  { name: 'Growth', price: '₦7,500', note: '30 listings · Featured placement' },
  { name: 'Premium', price: '₦15,000', note: 'Unlimited · Priority support' },
]

function DashboardModal({ type, onClose, onProductAdded }) {
  const [submitted, setSubmitted] = useState(false)
  const [productImage, setProductImage] = useState(null)
  const productAdded = useRef(false)
  const isProduct = type === 'product'

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file || file.size > 5 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => setProductImage({ file, preview: reader.result })
    reader.readAsDataURL(file)
  }
  useEffect(() => {
    if (!submitted || !isProduct || !productImage || productAdded.current) return
    productAdded.current = true
    const form = document.querySelector('.dashboard-modal form')
    const fields = form?.querySelectorAll('input, textarea')
    if (!fields || fields.length < 3) return
    onProductAdded({ name: fields[0].value, detail: fields[2].value, price: `₦${Number(fields[1].value).toLocaleString()}`, old: '', farmer: 'Ebiwari Farms', location: 'Yenagoa LGA', image: productImage.preview, badge: 'New today' })
  }, [submitted, isProduct, productImage, onProductAdded])
  /*
  {submitted ? <div className="modal-success">{isProduct && productImage && <img className="submitted-product-image" src={productImage.preview} alt="Uploaded product" />}<span>✓</span><p className="eyebrow">Request received</p><h2>{isProduct ? 'Your product is now on the market.' : 'Withdrawal request submitted.'}</h2><p>{isProduct ? 'Buyers can now discover your new listing in the marketplace.' : 'Your payout will be sent to your verified bank account after review.'}</p><button className="primary-button" onClick={onClose}>Done <span>→</span></button></div> : <><p className="eyebrow">{isProduct ? 'Your storefront' : 'Your money'}</p><h2>{isProduct ? 'Add a new product.' : 'Withdraw funds.'}</h2><p className="modal-copy">{isProduct ? 'Tell buyers what you’re bringing to the market.' : 'Choose an amount to transfer from your available earnings.'}</p><form className="dashboard-form" onSubmit={(event) => { event.preventDefault(); if (isProduct) { const form = new FormData(event.currentTarget); onProductAdded({ name: form.get('name'), detail: form.get('description'), price: `₦${Number(form.get('price')).toLocaleString()}`, old: '', farmer: 'Ebiwari Farms', location: 'Yenagoa LGA', image: productImage.preview, badge: 'New today' }) } setSubmitted(true) }}>

  */
  return (
    <div className="overlay dashboard-overlay" onClick={onClose}>
      <section className="dashboard-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        {submitted ? <div className="modal-success">{isProduct && productImage && <img className="submitted-product-image" src={productImage.preview} alt="Uploaded product" />}<span>✓</span><p className="eyebrow">Request received</p><h2>{isProduct ? 'Your product is under review.' : 'Withdrawal request submitted.'}</h2><p>{isProduct ? 'We’ll review your listing and notify you when it goes live.' : 'Your payout will be sent to your verified bank account after review.'}</p><button className="primary-button" onClick={onClose}>Done <span>→</span></button></div> : <><p className="eyebrow">{isProduct ? 'Your storefront' : 'Your money'}</p><h2>{isProduct ? 'Add a new product.' : 'Withdraw funds.'}</h2><p className="modal-copy">{isProduct ? 'Tell buyers what you’re bringing to the market.' : 'Choose an amount to transfer from your available earnings.'}</p><form className="dashboard-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>{isProduct ? <><label>Product name<input required placeholder="e.g. Fresh plantain" /></label><div className="form-grid"><label>Price<input required type="number" min="1" placeholder="6500" /></label><label>Unit<select defaultValue="kg"><option value="kg">Per kg</option><option value="basket">Per basket</option><option value="bag">Per bag</option><option value="bottle">Per bottle</option></select></label></div><label>Product description<textarea required placeholder="Describe how it is grown, prepared, or packaged." /></label><label>Available quantity<input required type="number" min="1" placeholder="10" /></label><label className="image-upload">Product image<input required type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} /><small>PNG, JPG, or WEBP · Maximum 5 MB</small>{productImage && <img src={productImage.preview} alt="Selected product preview" />}</label></> : <><label>Amount to withdraw<input required type="number" min="1000" max="186400" placeholder="50000" /></label><label>Bank account<select defaultValue="access"><option value="access">Access Bank ···· 4821</option><option value="gt">GTBank ···· 1098</option></select></label><div className="payout-note"><strong>Available balance</strong><span>₦186,400</span></div></>}<button className="primary-button modal-submit" type="submit">{isProduct ? 'Submit product for review' : 'Request withdrawal'} <span>→</span></button></form></>}
      </section>
    </div>
  )
}

function FarmerDashboard({ onBack, onProductAdded }) {
  const [activeModal, setActiveModal] = useState('')

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <a className="brand" href="#dashboard"><span className="brand-mark">✳</span><span>AgriMarket <i>Bayelsa</i></span></a>
        <div className="dashboard-profile"><span className="profile-avatar">EG</span><div><strong>Ebiwari George</strong><small>Farmer · Yenagoa LGA</small></div></div>
        <nav className="dashboard-nav"><a className="active" href="#dashboard">▦ <span>Overview</span></a><a href="#listings">□ <span>My products</span><b>4</b></a><a href="#orders">⌁ <span>Orders</span><b>3</b></a><a href="#earnings">₦ <span>Earnings & payouts</span></a><a href="#profile">♧ <span>Farm profile</span></a><a href="#settings">⚙ <span>Settings</span></a></nav>
        <div className="sidebar-help"><span>?</span><strong>Need a hand?</strong><small>Our team is here for you.</small><a href="mailto:support@agrimarket.test">Contact support →</a></div>
        <button className="dashboard-signout" onClick={onBack}>↩ Back to marketplace</button>
      </aside>
      <section className="dashboard-content" id="dashboard">
        <header className="dashboard-header"><div><p className="eyebrow">Thursday, 20 June 2024</p><h1>Good morning, <em>Ebiwari.</em></h1><p>Here’s how your farm is doing this week.</p></div><div className="dashboard-actions"><button className="dashboard-bell" aria-label="Notifications">♢<sup>2</sup></button><button className="dashboard-add" onClick={() => setActiveModal('product')}>+ <span>Add new product</span></button></div></header>
        <div className="review-alert"><span>✦</span><div><strong>Your verification is being reviewed</strong><p>We’ll notify you as soon as your farmer profile is approved. You can still prepare your listings.</p></div><button aria-label="Dismiss">×</button></div>
        <div className="metric-grid"><article><span className="metric-icon green">₦</span><div><small>Total earnings</small><strong>₦186,400</strong><b className="up">↑ 18.4%</b></div><small className="metric-note">vs. last month</small></article><article><span className="metric-icon orange">□</span><div><small>Active listings</small><strong>4</strong><b className="neutral">of 30</b></div><small className="metric-note">Growth plan</small></article><article><span className="metric-icon blue">⌁</span><div><small>Pending orders</small><strong>12</strong><b className="up">↑ 4 today</b></div><small className="metric-note">Needs attention</small></article><article><span className="metric-icon pink">♡</span><div><small>Product views</small><strong>2,840</strong><b className="up">↑ 12.8%</b></div><small className="metric-note">this month</small></article></div>
        <div className="dashboard-columns"><section className="dashboard-panel" id="listings"><div className="panel-heading"><div><p className="eyebrow">Your storefront</p><h2>My products</h2></div><a href="#listings">Manage all →</a></div><div className="listing-row"><div className="listing-image fish-image"></div><div><strong>Fresh catfish</strong><small>Whole, cleaned · 12kg in stock</small><b>₦6,500 <i>/ kg</i></b></div><span className="listing-status live">Live</span><button>⋮</button></div><div className="listing-row"><div className="listing-image rice-image"></div><div><strong>Swamp rice</strong><small>5kg bag · 24 bags in stock</small><b>₦8,800 <i>/ bag</i></b></div><span className="listing-status live">Live</span><button>⋮</button></div><div className="listing-row"><div className="listing-image ugu-image"></div><div><strong>Fresh ugu leaves</strong><small>Basket · 8 baskets in stock</small><b>₦3,200 <i>/ basket</i></b></div><span className="listing-status review">Review</span><button>⋮</button></div><button className="add-product-empty">+ List another product</button></section><section className="dashboard-panel" id="orders"><div className="panel-heading"><div><p className="eyebrow">Action required</p><h2>Recent orders</h2></div><a href="#orders">See all →</a></div><div className="order-row"><span className="order-icon">🧺</span><div><strong>#AM-2048 · 3 items</strong><small>Chinonso E. · Yenagoa</small></div><b>₦18,500</b><span className="order-status ready">To fulfil</span></div><div className="order-row"><span className="order-icon">🛍</span><div><strong>#AM-2045 · 1 item</strong><small>Faith A. · Ogbia</small></div><b>₦8,800</b><span className="order-status ready">To fulfil</span></div><div className="order-row"><span className="order-icon">✓</span><div><strong>#AM-2041 · 2 items</strong><small>Daniel K. · Yenagoa</small></div><b>₦13,200</b><span className="order-status delivered">Delivered</span></div><button className="orders-button">View order management →</button></section></div>
        <section className="earnings-panel" id="earnings"><div><p className="eyebrow">Your money</p><h2>Earnings overview</h2><p>Revenue from your sales over the last 30 days.</p></div><div className="earnings-total"><strong>₦186,400</strong><small>Available to withdraw</small><button onClick={() => setActiveModal('withdrawal')}>Withdraw funds →</button></div><div className="chart"><span style={{ height: '35%' }}></span><span style={{ height: '48%' }}></span><span style={{ height: '40%' }}></span><span style={{ height: '65%' }}></span><span style={{ height: '55%' }}></span><span style={{ height: '78%' }}></span><span style={{ height: '93%' }}></span><div className="chart-line"></div><small>May 25</small><small>Jun 20</small></div></section>
      </section>
      {activeModal && <DashboardModal type={activeModal === 'product' ? 'product' : 'withdrawal'} onClose={() => setActiveModal('')} onProductAdded={onProductAdded} />}
    </main>
  )
}

function BuyerDashboard({ onBack }) {
  return (
    <main className="dashboard-page buyer-dashboard">
      <aside className="dashboard-sidebar">
        <a className="brand" href="#dashboard"><span className="brand-mark">✳</span><span>AgriMarket <i>Bayelsa</i></span></a>
        <div className="dashboard-profile"><span className="profile-avatar buyer-avatar">AP</span><div><strong>Amarachi Peter</strong><small>Buyer · Yenagoa LGA</small></div></div>
        <nav className="dashboard-nav"><a className="active" href="#dashboard">▦ <span>Overview</span></a><a href="#orders">⌁ <span>My orders</span><b>2</b></a><a href="#saved">♡ <span>Saved products</span></a><a href="#profile">♧ <span>My profile</span></a><a href="#settings">⚙ <span>Settings</span></a></nav>
        <div className="sidebar-help"><span>?</span><strong>Need a hand?</strong><small>Our team is here for you.</small><a href="mailto:support@agrimarket.test">Contact support →</a></div>
        <button className="dashboard-signout" onClick={onBack}>↩ Back to marketplace</button>
      </aside>
      <section className="dashboard-content" id="dashboard">
        <header className="dashboard-header"><div><p className="eyebrow">Thursday, 20 June 2024</p><h1>Welcome back, <em>Amarachi.</em></h1><p>Here’s what’s happening with your market orders.</p></div><div className="dashboard-actions"><button className="dashboard-bell" aria-label="Notifications">♢<sup>2</sup></button><button className="dashboard-add" onClick={onBack}>Shop fresh produce <span>↗</span></button></div></header>
        <div className="metric-grid"><article><span className="metric-icon green">⌁</span><div><small>Orders this month</small><strong>6</strong><b className="up">↑ 2 this week</b></div><small className="metric-note">from local farmers</small></article><article><span className="metric-icon orange">₦</span><div><small>Total spent</small><strong>₦84,600</strong><b className="neutral">6 orders</b></div><small className="metric-note">this year</small></article><article><span className="metric-icon blue">◷</span><div><small>On the way</small><strong>2</strong><b className="up">Arriving soon</b></div><small className="metric-note">track your delivery</small></article><article><span className="metric-icon pink">♡</span><div><small>Saved products</small><strong>8</strong><b className="neutral">View list</b></div><small className="metric-note">ready for your basket</small></article></div>
        <div className="dashboard-columns"><section className="dashboard-panel" id="orders"><div className="panel-heading"><div><p className="eyebrow">Your purchases</p><h2>Recent orders</h2></div><a href="#orders">See all →</a></div><div className="order-row"><span className="order-icon">🧺</span><div><strong>#AM-2048 · 3 items</strong><small>Placed today · Yenagoa</small></div><b>₦18,500</b><span className="order-status ready">On the way</span></div><div className="order-row"><span className="order-icon">🛍</span><div><strong>#AM-2041 · 2 items</strong><small>Placed 12 Jun · Delivered</small></div><b>₦13,200</b><span className="order-status delivered">Delivered</span></div><button className="orders-button" onClick={onBack}>Shop more from local farmers →</button></section><section className="dashboard-panel" id="saved"><div className="panel-heading"><div><p className="eyebrow">For your next basket</p><h2>Saved products</h2></div><a href="#saved">View all →</a></div><div className="listing-row"><div className="listing-image ugu-image"></div><div><strong>Fresh ugu leaves</strong><small>Mama Pere’s Garden · Yenagoa</small><b>₦3,200 <i>/ basket</i></b></div><span className="listing-status live">In stock</span><button>+</button></div><div className="listing-row"><div className="listing-image rice-image"></div><div><strong>Swamp rice</strong><small>Timi’s Rice Co-op · Sagbama</small><b>₦8,800 <i>/ bag</i></b></div><span className="listing-status live">In stock</span><button>+</button></div></section></div>
        <section className="earnings-panel buyer-tip"><div><p className="eyebrow">Your local market</p><h2>Fresh food is closer than you think.</h2><p>Discover produce, fish and pantry staples from verified farmers across Bayelsa.</p></div><button className="earnings-total dashboard-add" onClick={onBack}>Explore the marketplace →</button></section>
      </section>
    </main>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showOnboarding, setShowOnboardingState] = useState(false)
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('')
  const [intent, setIntent] = useState('')
  const [plan, setPlan] = useState('Growth')
  const [showDashboard, setShowDashboard] = useState(false)
  const [dashboardRole, setDashboardRole] = useState('')
  const [products, setProducts] = useState(() => { try { return JSON.parse(localStorage.getItem('agri-market-products')) || defaultProducts } catch { return defaultProducts } })
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All categories')

  const addToCart = (product) => setCart([...cart, product])
  const total = cart.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9]/g, '')), 0)
  const addProduct = (product) => setProducts((current) => { const next = [product, ...current]; localStorage.setItem('agri-market-products', JSON.stringify(next)); return next })
  const visibleProducts = products.filter((product) => { const query = searchQuery.toLowerCase(); const matchesSearch = !query || `${product.name} ${product.detail} ${product.farmer}`.toLowerCase().includes(query); const matchesCategory = activeCategory === 'All categories' || (activeCategory === 'Fresh fish' && product.name.toLowerCase().includes('fish')) || (activeCategory === 'Vegetables' && /ugu|vegetable|leaf/i.test(product.name)) || (activeCategory === 'Fruits' && /fruit|banana|plantain/i.test(product.name)); return matchesSearch && matchesCategory })
  const [registeredFarmer, setRegisteredFarmer] = useState(false)
  const beginOnboarding = () => { setShowOnboarding(true); setStep(1); setRole(''); setIntent('') }

  if (showDashboard) return dashboardRole === 'buyer' ? <BuyerDashboard onBack={() => setShowDashboard(false)} /> : <FarmerDashboard onBack={() => setShowDashboard(false)} onProductAdded={addProduct} />

  const openDashboard = () => { if (dashboardRole) setShowDashboard(true); else beginOnboarding() }
  const setShowOnboarding = (value) => { if (!value && step === 4 && role) { setDashboardRole(role); setRegisteredFarmer(role === 'farmer'); setShowDashboard(true) } setShowOnboardingState(value) }
  return (
    <main>
      <div className="topline"><span>📍 Yenagoa, Bayelsa</span><span>Free delivery on orders over ₦20,000 · Mon - Sun: 8:00 AM - 10:00 PM</span><span>☎ (123) 456-7890</span></div>
      <nav className="nav"><a className="brand" href="#top"><span className="brand-mark">✳</span><span>AgriMarket <i>Bayelsa</i></span></a><div className="market-search"><span>⌕</span><input aria-label="Search products" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search for products, categories..." /><select aria-label="Search category" value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)}><option>All categories</option><option>Fresh fish</option><option>Vegetables</option><option>Fruits</option></select><button aria-label="Submit search" onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}>⌕</button></div><div className="nav-actions"><button className="dashboard-link" onClick={openDashboard}>My dashboard</button><button className="icon-button" onClick={() => setShowCart(true)} aria-label="Open cart">♧<sup>{cart.length}</sup></button><button className="join-button" onClick={beginOnboarding}>Join AgriMarket <span>↗</span></button></div></nav>
      <div className="category-nav"><button>☰ <span>Shop by categories</span></button><a href="#top">Home</a><a href="#shop">Categories⌄</a><a href="#products">Deals</a><a href="#products">New arrivals</a><a href="#farmers">Meet our farmers</a><a href="#how">How it works</a><a href="#farmers">Sell with us</a><strong>✦ Flash deals</strong></div>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="dot"></span> Freshness you can trust</p><h1>Fresh groceries,<br /><em>better living.</em></h1><p className="hero-text">Get the freshest produce, fish, and daily essentials delivered to your doorstep from Bayelsa’s trusted farmers.</p><div className="hero-actions"><a className="primary-button" href="#shop">Shop now <span>↗</span></a><a className="outline-button" href="#products">Explore deals</a></div><div className="hero-meta"><span>✧ Farm fresh</span><span>⌁ Fast delivery</span><span>◉ Secure payment</span><span>↺ Easy returns</span></div></div><div className="hero-art"><div className="hero-photo"></div><div className="hero-offer">UP TO<strong>30%</strong>OFF</div><div className="hero-caption"><span>Harvested fresh.<br /><b>Delivered with care.</b></span></div></div></section>
      <section className="trust-row"><div><span>✧</span><p><strong>Farm fresh</strong><small>Harvested with care</small></p></div><div><span>⌁</span><p><strong>Bayelsa delivery</strong><small>Yenagoa & riverine areas</small></p></div><div><span>◉</span><p><strong>Pay securely</strong><small>Safe payments, always</small></p></div><div><span>♡</span><p><strong>Easy returns</strong><small>We’ll make it right</small></p></div></section>
      <section className="section" id="shop"><div className="section-heading"><div><p className="eyebrow">Browse by what you need</p><h2>Something fresh for <em>every table.</em></h2></div><button className="arrow-link" onClick={() => setActiveCategory('All categories')}>See all categories <span>↗</span></button></div><div className="category-grid">{categories.map((category) => <a className={`category ${category.color}`} href="#products" onClick={() => setActiveCategory(category.name)} key={category.name}><span>{category.icon}</span><strong>{category.name}</strong><small>Explore →</small></a>)}</div></section>
      <section className="section deals" id="products"><div className="section-heading"><div><p className="eyebrow">{activeCategory === 'All categories' ? 'Picked for you' : activeCategory}</p><h2>{searchQuery ? `Results for “${searchQuery}”` : 'Market favourites.'}</h2></div><button className="arrow-link" onClick={() => { setSearchQuery(''); setActiveCategory('All categories') }}>View all produce <span>↗</span></button></div><div className="product-grid">{visibleProducts.length ? visibleProducts.map((product) => <article className="product-card" key={product.name}><div className="product-image" style={{ backgroundImage: `url(${product.image})` }}><span className="badge">{product.badge}</span><button className="heart" aria-label={`Favourite ${product.name}`}>♡</button></div><div className="product-info"><div className="product-title"><h3>{product.name}</h3><span>⋮</span></div><p>{product.detail}</p><div className="farmer"><span className="farmer-avatar">{product.farmer.charAt(0)}</span><span><strong>{product.farmer} <b>✓</b></strong><small>⌖ {product.location}</small></span></div><div className="price-row"><strong>{product.price}</strong>{product.old && <del>{product.old}</del>}<button onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>+</button></div></div></article>) : <p className="empty-results">No products match this search yet.</p>}</div></section>
      <section className="how-section" id="how"><div className="section-heading"><div><p className="eyebrow">Simple from farm to table</p><h2>How it <em>works.</em></h2></div></div><div className="how-grid"><article><span>01</span><strong>Choose your fresh picks</strong><p>Browse verified local produce, fish, pantry staples, and new farmer listings.</p></article><article><span>02</span><strong>Build your basket</strong><p>Add what you need to your basket and review your order before checkout.</p></article><article><span>03</span><strong>Get it delivered</strong><p>Farmers prepare your order and our delivery team brings it to your doorstep.</p></article></div></section>
      <section className="farmer-banner" id="farmers"><div><p className="eyebrow">For the people behind your food</p><h2>Your farm has a story.<br /><em>Let’s share it.</em></h2><p>Join a growing community of farmers and fishermen selling directly to homes, restaurants and businesses across Bayelsa.</p><button className="light-button" onClick={beginOnboarding}>Start selling <span>↗</span></button></div><div className="farmer-stats"><span><strong>₦48m+</strong><small>paid to farmers</small></span><span><strong>840</strong><small>verified farmers</small></span></div></section>
      <footer><a className="brand" href="#top"><span className="brand-mark">✳</span><span>AgriMarket <i>Bayelsa</i></span></a><p>Better food. Stronger communities.</p><span>© 2024 AgriMarket Bayelsa</span></footer>
      {showCart && <div className="overlay" onClick={() => setShowCart(false)}><aside className="drawer" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setShowCart(false)}>×</button><p className="eyebrow">Your basket</p><h2>Fresh picks.</h2>{cart.length === 0 ? <div className="empty"><span>🧺</span><p>Your basket is waiting for something good.</p><a href="#shop" onClick={() => setShowCart(false)}>Browse the market →</a></div> : <>{cart.map((item, index) => <div className="cart-item" key={`${item.name}-${index}`}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.price}</small></div></div>)}<div className="cart-total"><span>Total</span><strong>₦{total.toLocaleString()}</strong></div><button className="primary-button full">Continue to checkout →</button></>}</aside></div>}
      {showOnboarding && <div className="overlay"><section className="onboarding"><button className="close" onClick={() => setShowOnboarding(false)}>×</button><div className="onboard-progress"><span className="brand-mark">✳</span><span>Step {step} of 4</span><div><b style={{ width: `${step * 25}%` }}></b></div></div>{step === 1 && <><p className="eyebrow">Welcome to AgriMarket</p><h2>Which best describes <em>you?</em></h2><div className="role-options"><button className={role === 'farmer' ? 'selected' : ''} onClick={() => setRole('farmer')}><span>🌾</span><strong>I’m a farmer</strong><small>I want to sell my produce</small><b>→</b></button><button className={role === 'buyer' ? 'selected' : ''} onClick={() => setRole('buyer')}><span>🛒</span><strong>I’m a buyer</strong><small>I want to shop fresh</small><b>→</b></button></div></>}{step === 2 && <><p className="eyebrow">A little about your goals</p><h2>What brings you <em>here?</em></h2><div className="intent-options">{(role === 'farmer' ? ['Sell fresh crops & vegetables', 'Sell fish / seafood', 'Sell processed goods', 'Supply in bulk / wholesale'] : ['Everyday household shopping', 'Buy directly from farmers', 'Bulk purchase for my business', 'Just browsing']).map((item) => <button className={intent === item ? 'selected' : ''} onClick={() => setIntent(item)} key={item}>{item}<span>→</span></button>)}</div></>}{step === 3 && <><p className="eyebrow">Let’s get to know you</p><h2>Set up your <em>profile.</em></h2><div className="form-grid"><label>Full name<input placeholder="e.g. Ebiwari George" /></label><label>Phone number<input placeholder="+234 800 000 0000" /></label><label>Email address<input placeholder="you@example.com" /></label><label>Local Government Area<select><option>Yenagoa</option><option>Ogbia</option><option>Sagbama</option><option>Southern Ijaw</option><option>Brass</option><option>Nembe</option></select></label></div></>}{step === 4 && role === 'farmer' && <><p className="eyebrow">Activate your farmer account</p><h2>Choose your <em>listing plan.</em></h2><div className="plan-options">{plans.map((item) => <button className={plan === item.name ? 'selected' : ''} onClick={() => setPlan(item.name)} key={item.name}><strong>{item.name}</strong><b>{item.price}<small>/ month</small></b><span>{item.note}</span></button>)}</div><div className="payment-note">🔒 Secure mock payment powered by Paystack</div></>}{step === 4 && role === 'buyer' && <div className="success"><span>✳</span><h2>You’re ready to <em>shop local.</em></h2><p>We’ll show you the freshest picks around Yenagoa and beyond.</p></div>}<div className="onboard-footer">{step > 1 && <button className="back-button" onClick={() => setStep(step - 1)}>← Back</button>}<button className="primary-button" disabled={step === 1 ? !role : step === 2 ? !intent : false} onClick={() => step < 4 ? setStep(step + 1) : setShowOnboarding(false)}>{step === 4 ? 'Finish setup' : 'Continue'} <span>→</span></button></div></section></div>}
    </main>
  )
}

export default App
