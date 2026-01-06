const add = document.getElementById('Add_Product');
const table = document.getElementById('tableBody');
const panel = document.getElementById("hidden_panel");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const submitBtn = document.getElementById("submitBtn");

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

add.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 IMPORTANT
  panel.style.display = "block";
  overlay.style.display = "block";
});


closeBtn.addEventListener("click", () => {
  panel.style.display = "none";
  overlay.style.display = "none";
});


submitBtn.addEventListener("click", async () => {
  const name = document.getElementById("product_name").value;
  const uom = document.getElementById("uom").value;
  const price = document.getElementById("product_price").value;

  try {
    // 1️⃣ call backend FIRST
    const product = await addProduct(name, uom, price);

    if (!product) return; // safety

    // 2️⃣ update UI with REAL data from DB...that includes the new product ID
    addRow(product.id, product.name, product.uom, product.price);

    // 3️⃣ close panel only on success
    panel.style.display = "none";
    overlay.style.display = "none";

  } catch (err) {
    console.error(err);
    alert("Failed to add product");
  }
});


// Event delegation for delete buttons
table.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    row.remove();
    deleteProduct(row.dataset.productId);
  }
  
 });


// Function to add a new row to the table
const addRow = (productId,name, uom, price) => {
  const row = document.createElement("tr");
  // Store product ID in a data attribute..DOM way
  row.dataset.productId = productId;
  row.innerHTML = `
    <td class="border p-2">${name}</td>
    <td class="border p-2">${uom}</td>
    <td class="border p-2">${price}</td>
    <td class="border p-2 flex justify-center items-center">
      <button class="bg-red-500 text-white px-4 py-1 rounded delete-btn">
        Delete
      </button>
    </td>
  `;

  table.appendChild(row);
};


// Function to send product data to the backend
async function addProduct(name, unit, price) { 
  try {
    console.log("Sending:", { name, unit, price });
    
    const response = await fetch("http://127.0.0.1:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name: name,
        unit: unit,  
        price: parseFloat(price)
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Server error:', data);
      throw new Error(data.error || 'Failed to add product');
    }

    console.log('Success:', data);
    alert('Product added successfully!');
    return data;
  }catch (error) {
    console.error('Error:', error);
    alert('Error adding product: ' + error.message);
  }
}

// Function to delete a product by ID
async function deleteProduct(productId){
  try{
    console.log("Deleting product with ID:", productId);
    //delete doesnt use body...it uses URL parameters
    const response=await fetch(`http://127.0.0.1:5000/api/products/${productId}`,{
      method:"DELETE",
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error("Failed to delete product");
    }
    console.log("Success:",data);
    alert("Product deleted successfully!");
    
  }
  catch(error){
    console.error('Error:', error);
    alert('Error deleting product: ' + error.message);

  }
}

async function loadProducts(){
  try{
    const res=await fetch("http://127.0.0.1:5000/api/products");
    const data=await res.json();
    if(!res.ok){
      throw new Error("Failed to load products");
    }
    data.forEach(product=>{
      addRow(product.id, product.name, product.unit, product.price);
    });
  }catch(error){
    console.error('Error:', error);
    alert('Error loading products: ' + error.message);
  }
}






