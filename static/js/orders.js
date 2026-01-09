const customer_name=document.getElementById('customer_name');
const add_more_btn=document.getElementById('add_more_btn');
const container=document.getElementById('container');
const category=document.getElementsByClassName('category');

//this is to cache products...so that we don't have to fetch from backend every time
let productsCache = [];


// Loads drop-down products on page load
document.addEventListener("DOMContentLoaded",()=>{
    fetchProducts();
});



add_more_btn.addEventListener("click",()=>{
    //insertAdjacentHTML is used to insert HTML code into a specified position in the DOM without overwriting existing content.(Better than innerHTML)
    container.insertAdjacentHTML("beforeend",`
        <div class="mb-4 grid grid-cols-4 grid-rows-1 w-[50rem] bg-white py-3 ">
        <select placeholder="Select Product" class="category h-8 col-span-1 px-3 mx-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled selected>Select Product</option>
        </select>
        <input type="text" class="h-8 col-span-1 mx-auto flex border border-black rounded-sm justify-center items-center text-sm font-medium text-gray-700 w-32 text-center" placeholder="₹ 0.00"></input>
        <input type="number" min="1" value="1" class="h-8 col-span-1 mx-auto flex border border-black rounded-sm justify-center items-center text-sm font-medium text-gray-700 w-32 text-center"></input>
        <div class="grid grid-rows-2 gap-4">
            <input type="text" readonly class="row-span-1 col-span-1 mx-auto flex border border-black rounded-sm justify-center items-center text-sm font-medium text-gray-700 w-32 text-center" placeholder="₹ 0.00"></input>
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
        //now from script it has to go to app.py which will take functions from orders_dao.py to fetch data from DB and return it here
        const data=await res.json();
        productsCache = data;
        //this is to populate existing dropdowns
        for (let category1 of category){
            category1.innerHTML = `<option value="" disabled selected>Select Product</option>`;
            data.forEach(order=>{
            addDropdown(order.name,order.id,category1);});
        }
        
        throw new Error("Not implemented yet");
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