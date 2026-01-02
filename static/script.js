const add = document.getElementById('Add_Product');
const save = document.getElementById('Save_Products');
const table = document.getElementById('tableBody');

add.addEventListener('click', function () {
  addRow();
});

function addRow() {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="border p-2" contenteditable="true">New Product</td>
    <td class="border p-2" contenteditable="true">0</td>
    <td class="border p-2" contenteditable="true">0</td>
    <td class="border p-2 flex justify-center items-center">
      <button class="bg-red-500 text-white px-4 py-1 rounded delete-btn">
        Delete
      </button>
    </td>
  `;

  table.appendChild(row);
}

async function addProduct(name, uom_id, price) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name: name,
        uom_id: uom_id, 
        price: price 
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
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
    const name = cells[0].innerText;
    const unit = cells[1].innerText;
    const price = cells[2].innerText;
    addProduct(name, unit, price);
  });
});



