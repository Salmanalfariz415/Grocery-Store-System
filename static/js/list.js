const tableBody = document.querySelector("#tableBody");
document.addEventListener("DOMContentLoaded",async()=>{
    await fetchOrders();
    fetchTotal();
});
const grandTotal=document.querySelector("#grandTotal");

async function fetchOrders() {
    try{const res=await fetch("http://127.0.0.1:5000/api/list_orders",{
        method:"GET"
    });
    if(!res.ok){
        throw new Error("Fetch orders not implemented yet");}
    
    const data=await res.json();
    tableBody.innerHTML="";
    data.forEach(order=>{
        const row=document.createElement("tr");
        row.innerHTML=`
        <td class="border px-4 py-2 text-center">${order.date}</td>
        <td class="border px-4 py-2 text-center">${order.order_id}</td>
        <td class="border px-4 py-2 text-center">${order.customer_name}</td>
        <td class="total border px-4 py-2 text-center">₹ ${order.total}</td>
        `;
        tableBody.appendChild(row);
    });}
    catch(err){
        console.log(err);
    }
}    

async function fetchTotal(){
    try{
        let total=0;
        const totals =document.querySelectorAll(".total");
        for(tot of totals){
            total=total+parseFloat(tot.textContent.replace("₹ ",""));
        }
        grandTotal.value="₹ "+total.toFixed(2);

    }
    catch(err){
        console.error(err);
    }
}