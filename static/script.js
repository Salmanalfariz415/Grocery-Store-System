const add = document.getElementById('Add_Product');
const save = document.getElementById('Save_Products');
const table = document.getElementById('tableBody');
const panel = document.getElementById("hidden_panel");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const submitBtn = document.getElementById("submitBtn");

// add.addEventListener('click', function () {
//   addRow();  
// });
add.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 IMPORTANT
  panel.style.display = "block";
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  panel.style.display = "none";
  overlay.style.display = "none";
});

submitBtn.addEventListener("click", () => {
  panel.style.display = "none";
  overlay.style.display = "none";
  addRow( 
    document.getElementById("product_name").value,
    document.getElementById("uom").value,
    document.getElementById("product_price").value
  );  
});


// Function to add a new row to the table
const addRow = (name, uom, price) => {
  const row = document.createElement("tr");

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
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding product: ' + error.message);
  }
}

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    
    // Check if it's the first row
    if (row === table.firstElementChild) {
      row.innerHTML = `
        <td class="border-2 p-2" contenteditable="true">New Product</td>
        <td class="border-2 p-2" contenteditable="true">0</td>
        <td class="border-2 p-2" contenteditable="true">0</td>
        <td class="border-2 p-2 flex justify-center items-center">
          <button class="bg-red-500 text-white px-4 py-1 rounded delete-btn">
            Delete
          </button>
        </td>
      `;
    } else {
      row.remove();
    }
  }
 });

save.addEventListener('click', function () { 
  const rows = table.querySelectorAll('tr'); 
  rows.forEach(row => { 
  const cells = row.querySelectorAll('td');
  if (cells.length === 0) return; 
  const name = cells[0].innerText; 
  const unit = cells[1].innerText; 
  const price = cells[2].innerText; 
  addProduct(name, unit, price); }); 
});




