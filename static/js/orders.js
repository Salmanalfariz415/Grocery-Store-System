const customer_name=document.getElementById('customer_name');
const add_more_btn=document.getElementById('add_more_btn');
const container=document.getElementById('container');

add_more_btn.addEventListener("click",()=>{
    container.insertAdjacentHTML("beforeend",`
        <div class="mb-4 grid grid-cols-4 grid-rows-1 w-[50rem] bg-white py-3 ">
        <select class="h-8 col-span-1 px-3 mx-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select category</option>
            <option value="milk">Milk</option>
            <option value="rice">Rice</option>
            <option value="oil">Oil</option>
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
})

