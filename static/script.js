const add = document.getElementById('Add_Product');
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

async function addProduct(name, unit, price) {
  const response = await fetch("http://127.0.0.1:5500/templates/products.html", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, unit, price })
  });

  const data = await response.json();
  console.log(data);
}
