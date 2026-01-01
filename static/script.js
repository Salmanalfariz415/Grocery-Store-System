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
      // Reset the first row
      row.innerHTML = `
        <td class="border-2 p-2" contenteditable="true">New Product</td>
        <td class="border-2 p-2" contenteditable="true">0</td>
        <td class="border-2 p-2" contenteditable="true">0</td>
        <td class="border-2 flex justify-center items-center p-2">
          <button class="bg-red-500 text-white px-4 py-1 rounded delete-btn">
            Delete
          </button>
        </td>
      `;
    } else {
      // Delete other rows
      row.remove();
    }
  }
 });
// The key change is checking if (row === table.firstElementChild) to determine if it's the first row, then either resetting it or deleting it accordingly. This way:

// First row: Clicking Delete resets the content back to defaults
// Other rows: Clicking Delete removes them completely
// Claude is AI and can make mistakes. Please double-check responses.
