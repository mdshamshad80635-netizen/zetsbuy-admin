/* ============================================
   ZetsyBuy — Main JavaScript
   ============================================ */

'use strict';

// ============================================
// DEMO PRODUCTS (initial seed data)
// ============================================
const DEMO_PRODUCTS = [
  {
    id: 'prod_001',
    name: 'Luxury Scented Candle Set – Vanilla & Amber Collection',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=luxury+scented+candle+set&tag=zetsybuy-20',
    rating: 5,
    category: 'Home Decor'
  },
  {
    id: 'prod_002',
    name: 'Premium Leather Wallet – Slim Minimalist Design',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=premium+leather+wallet+slim&tag=zetsybuy-20',
    rating: 4,
    category: 'Fashion'
  },
  {
    id: 'prod_003',
    name: 'Crystal Wine Glass Set – Hand-Blown Borosilicate',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=crystal+wine+glass+set&tag=zetsybuy-20',
    rating: 5,
    category: 'Kitchen'
  },
  {
    id: 'prod_004',
    name: 'Wireless Noise-Cancelling Headphones – Studio Quality',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=wireless+noise+cancelling+headphones&tag=zetsybuy-20',
    rating: 5,
    category: 'Electronics'
  },
  {
    id: 'prod_005',
    name: 'Artisan Coffee Gift Box – Single Origin Premium Blends',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=artisan+coffee+gift+set&tag=zetsybuy-20',
    rating: 4,
    category: 'Food & Drink'
  },
  {
    id: 'prod_006',
    name: 'Personalized Star Map Print – Custom Night Sky Poster',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=personalized+star+map+print&tag=zetsybuy-20',
    rating: 5,
    category: 'Art & Prints'
  },
  {
    id: 'prod_007',
    name: 'Smart Fitness Tracker Watch – Heart Rate & Sleep Monitor',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=smart+fitness+tracker+watch&tag=zetsybuy-20',
    rating: 4,
    category: 'Electronics'
  },
  {
    id: 'prod_008',
    name: 'Bamboo Spa Gift Basket – Luxury Self-Care Essentials',
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=spa+gift+basket+luxury&tag=zetsybuy-20',
    rating: 4,
    category: 'Beauty & Spa'
  },
  {
    id: 'prod_009',
    name: 'Gourmet Chocolate Truffle Box – Belgian Dark & Milk',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=gourmet+chocolate+truffle+box&tag=zetsybuy-20',
    rating: 5,
    category: 'Food & Drink'
  },
  {
    id: 'prod_010',
    name: 'Leather-Bound Journal – Handcrafted Vintage Diary',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=leather+bound+journal+handcrafted&tag=zetsybuy-20',
    rating: 4,
    category: 'Stationery'
  },
  {
    id: 'prod_011',
    name: 'Succulent & Cactus Plant Gift Set – Ceramic Pots',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=succulent+cactus+plant+gift+set&tag=zetsybuy-20',
    rating: 3,
    category: 'Plants'
  },
  {
    id: 'prod_012',
    name: 'Instant Polaroid Camera – Vintage Retro Photo Printer',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    affiliate: 'https://www.amazon.com/s?k=instant+polaroid+camera+retro&tag=zetsybuy-20',
    rating: 5,
    category: 'Photography'
  }
];

// ============================================
// STORAGE HELPERS
// ============================================
const STORAGE_KEY = 'zetsybuy_products';

function getProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { /* ignore */ }
  // Seed with demo products on first load
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_PRODUCTS));
  return DEMO_PRODUCTS;
}

// ============================================
// STAR RATING RENDERER
// ============================================
function renderStars(rating) {
  const r = Math.max(1, Math.min(5, Math.round(rating)));
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="${i <= r ? 'star-filled' : 'star-empty'}">★</span>`;
  }
  return html;
}

// ============================================
// BADGE HELPER
// ============================================
const BADGES = { 5: 'Top Rated', 4: 'Best Seller', 3: 'Popular' };
function getBadge(rating) {
  return BADGES[Math.round(rating)] || null;
}

// ============================================
// PRODUCT CARD BUILDER
// ============================================
function buildProductCard(product, delay = 0) {
  const badge = getBadge(product.rating);
  const badgeHtml = badge
    ? `<div class="card-badge">${badge}</div>`
    : '';

  const card = document.createElement('article');
  card.className = 'product-card';
  card.style.transitionDelay = `${delay}ms`;
  card.dataset.id = product.id;
  card.dataset.name = (product.name || '').toLowerCase();

  card.innerHTML = `
    ${badgeHtml}
    <div class="card-image-wrap">
      <img src="${escapeAttr(product.image)}"
           alt="${escapeAttr(product.name)}"
           loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80'">
      <div class="card-overlay">
        <span class="overlay-text">View Details →</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-category">${escapeHtml(product.category || 'Gift')}</div>
      <h3 class="card-name">${escapeHtml(product.name)}</h3>
      <div class="card-stars">
        <div class="stars-display">${renderStars(product.rating)}</div>
        <span class="rating-text">${product.rating.toFixed(1)} / 5</span>
      </div>
      <a class="btn-amazon"
         href="${escapeAttr(product.affiliate)}"
         target="_blank"
         rel="noopener noreferrer sponsored"
         onclick="trackClick('${escapeAttr(product.id)}')">
        <span class="amazon-logo">🛒</span>
        View on Amazon
      </a>
    </div>
  `;

  return card;
}

// ============================================
// RENDER PRODUCTS
// ============================================
let currentQuery = '';

function renderProducts(query = '') {
  currentQuery = query.toLowerCase().trim();
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  if (!grid) return;

  const products = getProducts();
  const filtered = currentQuery
    ? products.filter(p => p.name.toLowerCase().includes(currentQuery))
    : products;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No gifts found</h3>
        <p>Try a different search term or browse all products</p>
      </div>`;
    if (countEl) countEl.innerHTML = 'Showing <span>0</span> gifts';
    return;
  }

  if (countEl) {
    countEl.innerHTML = `Showing <span>${filtered.length}</span> gift${filtered.length !== 1 ? 's' : ''}`;
  }

  filtered.forEach((product, i) => {
    const card = buildProductCard(product, 0);
    grid.appendChild(card);
    // Trigger reveal after a staggered delay
    setTimeout(() => {
      card.classList.add('revealed');
    }, 80 + i * 55);
  });

  // Scroll reveal observer for cards
  observeCards();
}

// ============================================
// CLICK TRACKING (analytics-lite)
// ============================================
function trackClick(id) {
  try {
    const key = 'zb_clicks';
    const clicks = JSON.parse(localStorage.getItem(key) || '{}');
    clicks[id] = (clicks[id] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(clicks));
  } catch (e) { /* silent */ }
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderProducts(input.value);
      // Scroll to products section smoothly
      if (input.value.trim()) {
        const sec = document.getElementById('productsSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 280);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { input.value = ''; renderProducts(''); }
  });
}

// ============================================
// SCROLL REVEAL OBSERVER
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function observeCards() {
  // cards use their own reveal class; just observe new ones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.product-card:not(.revealed)').forEach(el => observer.observe(el));
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.6 + 0.3;
    this.speed = Math.random() * 0.35 + 0.08;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.alpha = Math.random() * 0.55 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
    // Gold or teal-blue tones
    const colors = ['245,200,66', '100,160,255', '180,220,255', '255,220,100'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += 0.02;
    this.currentAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
    if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
      this.reset();
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.currentAlpha})`;
    ctx.fill();
  };

  function init() {
    resize();
    const count = Math.min(Math.floor((W * H) / 9000), 130);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245,200,66,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  init();
  animate();
}

// ============================================
// MODALS (Privacy / Terms / Disclosure)
// ============================================
const MODAL_CONTENT = {
  privacy: {
    icon: '🔒',
    title: 'Privacy Policy',
    body: `
      <p>Last updated: January 2025</p>
      <h3>Information We Collect</h3>
      <p>ZetsyBuy does not collect personal information directly. When you click on product links and visit Amazon, Amazon's privacy policy applies to any information collected during your purchase.</p>
      <h3>Cookies & Local Storage</h3>
      <p>We use browser localStorage to remember your preferences and product searches. No data is transmitted to external servers from our site.</p>
      <h3>Affiliate Links</h3>
      <p>This site contains affiliate links to Amazon. When you click these links and make a purchase, we may earn a small commission at no extra cost to you.</p>
      <h3>Analytics</h3>
      <p>We may use anonymized click data to improve our product recommendations. No personally identifiable information is collected.</p>
      <h3>Third-Party Services</h3>
      <p>Product images may be served from third-party image hosting services (Unsplash, Amazon). These services have their own privacy policies.</p>
      <h3>Contact</h3>
      <p>For privacy concerns, contact us via WhatsApp or our social channels listed on the site.</p>
    `
  },
  terms: {
    icon: '📋',
    title: 'Terms & Conditions',
    body: `
      <p>Last updated: January 2025</p>
      <h3>Acceptance of Terms</h3>
      <p>By using ZetsyBuy, you agree to these terms and conditions. If you disagree with any part, please do not use our website.</p>
      <h3>Product Information</h3>
      <p>We strive to ensure product information is accurate but cannot guarantee it. Prices, availability, and descriptions are subject to change on Amazon. Always verify information on Amazon before purchasing.</p>
      <h3>Affiliate Relationship</h3>
      <p>ZetsyBuy participates in the Amazon Associates Program. We earn commissions from qualifying purchases at no additional cost to buyers.</p>
      <h3>Limitation of Liability</h3>
      <p>ZetsyBuy is not liable for any purchase made through Amazon or any third-party site. All transactions are governed by Amazon's Terms of Service.</p>
      <h3>Intellectual Property</h3>
      <p>All content on ZetsyBuy, including text, images, and design, is protected by copyright. Product images belong to their respective owners.</p>
      <h3>Changes to Terms</h3>
      <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.</p>
    `
  },
  disclosure: {
    icon: '💰',
    title: 'Affiliate Disclosure',
    body: `
      <p>Last updated: January 2025</p>
      <h3>Amazon Associates Program</h3>
      <p>ZetsyBuy is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
      <h3>How It Works</h3>
      <p>When you click a "View on Amazon" button on our site and make a purchase, we earn a small commission. This does not increase the price you pay — it's Amazon's way of compensating us for referring customers.</p>
      <h3>Our Promise</h3>
      <p>We only recommend products we believe offer genuine value. Our reviews and ratings are honest and not influenced by commission rates. We select products based on quality, popularity, and customer satisfaction.</p>
      <h3>FTC Compliance</h3>
      <p>In accordance with FTC guidelines, we clearly disclose our affiliate relationships. This disclosure appears on every page of our website.</p>
      <h3>Questions?</h3>
      <p>If you have questions about our affiliate relationships, feel free to contact us. We believe in full transparency with our community.</p>
    `
  }
};

function openModal(type) {
  const overlay = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');
  const content = MODAL_CONTENT[type];
  if (!overlay || !content) return;

  title.innerHTML = `<span>${content.icon}</span> ${content.title}`;
  body.innerHTML = content.body;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initModals() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  // Close on overlay backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ============================================
// TOAST
// ============================================
function showToast(message, icon = '✨') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ============================================
// FILTER PILLS
// ============================================
function initFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      const input = document.getElementById('searchInput');
      if (input) input.value = '';
      if (filter === 'all') {
        renderProducts('');
      } else {
        filterByCategory(filter);
      }
    });
  });
}

function filterByCategory(category) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  if (!grid) return;

  const products = getProducts();
  const filtered = category === 'all'
    ? products
    : products.filter(p => (p.category || '').toLowerCase().includes(category.toLowerCase()));

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results"><div class="no-results-icon">🎁</div><h3>No products in this category</h3><p>More coming soon!</p></div>`;
    if (countEl) countEl.innerHTML = 'Showing <span>0</span> gifts';
    return;
  }

  if (countEl) countEl.innerHTML = `Showing <span>${filtered.length}</span> gift${filtered.length !== 1 ? 's' : ''}`;

  filtered.forEach((product, i) => {
    const card = buildProductCard(product);
    grid.appendChild(card);
    setTimeout(() => card.classList.add('revealed'), 80 + i * 55);
  });
}

// ============================================
// ESCAPE HELPERS
// ============================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ============================================
// STORAGE CHANGE LISTENER
// ============================================
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    renderProducts(currentQuery);
    showToast('Product list updated!', '🔄');
  }
});

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderProducts();
  initSearch();
  initScrollReveal();
  initModals();
  initFilterPills();

  // Animate hero text words
  animateHeroWords();
});

function animateHeroWords() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  title.style.opacity = '0';
  title.style.transform = 'translateY(30px)';
  setTimeout(() => {
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
  }, 200);
}
