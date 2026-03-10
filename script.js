// Supabase connection
const SUPABASE_URL = "https://beygdhiafnzyaryebces.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleWdkaGlhZm56eWFyeWViY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzEwOTIsImV4cCI6MjA4ODY0NzA5Mn0.bQhmoyB471Kg-kAGMo1nkY36rvQMfWKbB37ySuC26N0";

// create client safely
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// load products from database
async function loadProducts() {

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error);
    return;
  }

  displayProducts(data);
}


// show products on website
function displayProducts(products) {

  const container = document.querySelector("#productsGrid");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    const card = `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}" />

        <div class="product-info">

          <span class="product-category">${product.category || ""}</span>

          <h3 class="product-title">${product.name}</h3>

          <div class="product-rating">
            ⭐ ${product.rating || 4}/5
          </div>

          <a href="${product.affiliate}" target="_blank" class="btn-amazon">
            🛒 View on Amazon
          </a>

        </div>

      </div>
    `;

    container.innerHTML += card;

  });

}


// start loading
document.addEventListener("DOMContentLoaded", loadProducts);