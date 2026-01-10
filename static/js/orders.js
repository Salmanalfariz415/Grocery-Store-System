const customer_name=document.getElementById('customer_name');
const add_more_btn=document.getElementById('add_more_btn');
const container=document.getElementById('container');
const category=document.getElementsByClassName('category');
const price=document.getElementById('price');
const total_price=document.getElementsByClassName('total_price');
const quantity=document.getElementsByClassName('quantity');
const total_order=document.getElementById('total_order');
const submit=document.getElementById('submit');
//this is to cache products...so that we don't have to fetch from backend every time
let productsCache = [];

// Loads drop-down products on page load
document.addEventListener("DOMContentLoaded",()=>{
    fetchProducts();
    updateTotalOrderPrice();
});



add_more_btn.addEventListener("click",()=>{
    //insertAdjacentHTML is used to insert HTML code into a specified position in the DOM without overwriting existing content.(Better than innerHTML)
    container.insertAdjacentHTML("beforeend",`
        <div class="product-row mb-4 grid grid-cols-4 grid-rows-1 w-[50rem] bg-white py-3 h-24">
        <select class="category h-8 col-span-1 px-3 mx-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled selected>Select Product</option>
        </select>
        <input type="text" readonly class="price h-8 col-span-1 mx-auto flex border border-black rounded-sm justify-center items-center text-sm font-medium text-gray-700 w-32 text-center" placeholder="₹ 0.00"></input>
        <input type="number" min="1" value="1" class="quantity h-8 col-span-1 mx-auto flex border border-black rounded-sm justify-center items-center text-sm font-medium text-gray-700 w-32 text-center"></input>
        <div class="grid grid-rows-2 gap-4">
            <input type="text" readonly class="total_price row-span-1 col-span-1 mx-auto flex border border-black rounded-sm justify-center items-center text-sm font-medium text-gray-700 w-32 text-center" placeholder="₹ 0.00"></input>
            <div class="row-span-1 flex justify-end items-center">
                <button class="w-20 h-7 flex justify-center items-center text-sm border border-gray-400 bg-red-500 text-white mt-1 mx-4">Remove</button>
            </div>
        </div>
    </div>`);

    //this is to populate the newly added dropdown
    const newSelect = category[category.length - 1];
    //productCche is used here to avoid fetching from backend again...as it takes the data once while running fetchProducts
    productsCache.forEach(order => {
        const option = document.createElement("option");
        option.value = order.id;
        option.textContent = order.name;
        newSelect.appendChild(option);});
})


async function fetchProducts(){
    try{
        const res=await fetch("http://127.0.0.1:5000/api/orders",{
            method:"GET",
        })
        
        if(!res.ok){
            throw new Error("Not implemented yet");
        }
        //now from script it has to go to app.py which will take functions from orders_dao.py to fetch data from DB and return it here
        const data=await res.json();
        productsCache = data;
        //this is to populate existing dropdowns
        for (let category1 of category){
            category1.innerHTML = `<option value="" disabled selected>Select Product</option>`;
            data.forEach(order=>{
            addDropdown(order.name,order.id,category1);});
        }
        
    }
    catch(err){
        console.error(err);

    }
}

const addDropdown=(orderName,orderId,category1)=>{
        const option=document.createElement("option");
        option.value=orderId;
        option.textContent=orderName;
        category1.appendChild(option);
}

//now moving onto calculating total price and other prices based on quantity

async function calculatePrices(productId){
    try{
        const res=await fetch(`http://127.0.0.1:5000/api/orders/${productId}`,{
        method:"GET"});
        const data=await res.json();
        return data;
    }catch(err) {
        console.error("Error fetching price:", err);
        return { price: 0 };
    }   
    
}

container.addEventListener("change",async(event)=>{
     if (event.target.classList.contains("category")) {
        const productId = event.target.value;
        
        const data = await calculatePrices(productId);
                
        // The next sibling IS the price input
        const priceInput = event.target.nextElementSibling;
        priceInput.value = `₹ ${data.price}`;//Setting price value

        const quantityInput = priceInput.nextElementSibling; // This is the quantity input
        const totalDiv = quantityInput.nextElementSibling;
        const totalPriceInput = totalDiv.querySelector('input'); //This is the total price input inside the div
        const quantityInt=parseInt(quantityInput.value);//This is for converting quantity to integer

        let total = data.price * quantityInt;
        totalPriceInput.value = `₹ ${total.toFixed(2)}`;
        updateTotalOrderPrice();
    }
    if(event.target.classList.contains("quantity")){
        const quantityInput = event.target;
        const totalDiv = quantityInput.nextElementSibling; 
        const totalPriceInput = totalDiv.querySelector('input'); 
        const priceInput = quantityInput.previousElementSibling.value.replace('₹', '').trim(); 

        const quantityInt=parseInt(quantityInput.value);//This is for converting quantity to integer
        let total = priceInput.replace('₹ ', '') * quantityInt;
        totalPriceInput.value = `₹ ${total.toFixed(2)}`;
        updateTotalOrderPrice();
    }
});

const updateTotalOrderPrice = () => {
    let totalOrderPrice = 0;
    const totalPriceInputs = container.querySelectorAll('.total_price');
    totalPriceInputs.forEach(input => {
        const priceText = input.value.replace('₹', '').trim();
        const price = parseFloat(priceText);
        if (!isNaN(price)) {
            totalOrderPrice += price;
        }
    });
    total_order.value = `₹ ${totalOrderPrice.toFixed(2)}`;
}

async function addOrder(name,total){
    try{
        const res = await fetch(`http://127.0.0.1:5000/api/orders`,{
            method:"POST",
            body:JSON.stringify({
                name:name,
                total:total,
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }
        );
        if(!res.ok){
            throw new Error ("Error in ordering");
        }
        const data=await res.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}



async function addOrderDetails(orderId, productId, quantity, totalPrice) {
    try {
        const res = await fetch(`http://127.0.0.1:5000/api/order_details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_id: orderId,
                product_id: productId,
                quantity: quantity,
                total_price: totalPrice
            })
        });
        if (!res.ok) {
            throw new Error("Error adding order details");
        }       
        const data = await res.json();
        return data;      
    } catch(err) {
        console.error(err);
    }
}

submit.addEventListener("click", async() => {
    const name = customer_name.value;
    const total = total_order.value.replace('₹', '').trim();
    
    // Validate inputs
    if (!name || !total || total === '0.00') {
        alert("Please enter customer name and add products");
        return;
    }
    
    // Create the main order first
    const orderData = await addOrder(name, total);
    
    if (!orderData || !orderData.order_id) {
        alert("Failed to create order");
        return;
    }
    
    // Get all product rows inside container
    const productRows = container.querySelectorAll('.product-row');
    console.log("Total rows found:", productRows.length); // Debug
    
    // Loop through each row and add order details
    for (let row of productRows) {
        const categorySelect = row.querySelector('.category');
        const quantityInput = row.querySelector('.quantity');
        const totalPriceInput = row.querySelector('.total_price');
        
        const productID = categorySelect.value;
        const quantity = quantityInput.value;
        const totalPrice = totalPriceInput.value.replace('₹', '').trim();

        console.log("Row data:", {productID, quantity, totalPrice});
        
        // Only add if a product is selected
        if (productID) {
            const result =await addOrderDetails(orderData.order_id, productID, quantity, totalPrice);
            console.log("Insert result:", result);
        }
    }
    
    alert("Order placed successfully!");
    window.location.reload();
});