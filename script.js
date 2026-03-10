const SUPABASE_URL = "https://beygdhiafnzyaryebces.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleWdkaGlhZm56eWFyeWViY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzEwOTIsImV4cCI6MjA48647092.bQhmoyB471Kg-kAGMo1nkY36rvQMfWKbB37ySuC26N0";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadProducts() {

  const { data, error } = await client
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("productsGrid");

  container.innerHTML = "";

  data.forEach(product => {

    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>⭐ ${product.rating || 4}</p>
        <a href="${product.affiliate}" target="_blank">View on Amazon</a>
      </div>
    `;

  });

}

document.addEventListener("DOMContentLoaded", loadProducts);