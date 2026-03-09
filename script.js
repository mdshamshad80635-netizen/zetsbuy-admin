const SUPABASE_URL = "https://beygdhiafnzyaryebces.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleWdkaGlhZm56eWFyeWViY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzEwOTIsImV4cCI6MjA4ODY0NzA5Mn0.bQhmoyB471Kg-kAGMo1nkY36rvQMfWKbB37ySuC26N0";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// products load from database
async function loadProducts() {

  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  displayProducts(data);
}


// show products on website
function displayProducts(products) {

  const container = document.querySelector("#products");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {

    const card = `
      <div class="product-card">

        <img src="${p.image}" alt="${p.name}" />

        <h3>${p.name}</h3>

        <div class="rating">
          ⭐ ${p.rating}/5
        </div>

        <a href="${p.affiliate}" target="_blank" class="btn">
          View on Amazon
        </a>

      </div>
    `;

    container.innerHTML += card;

  });

}


document.addEventListener("DOMContentLoaded", loadProducts);