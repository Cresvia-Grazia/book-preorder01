const API="https://script.google.com/macros/s/AKfycbzfTn9Mf-oz0y-Z_17XjY5A1ZlRCTiMp9TNm6gsYRzAIRl6GFgQT_a9KcK02zTaisGg/exec"

let books=[]
let cart=[]


async function loadBooks(){

const res=await fetch(API)
books=await res.json()

renderBooks(books)

}

loadBooks()


function renderBooks(data){

let html=""

data.forEach(b=>{

let price=b["Discounted Price"]||b.Price

html+=`

<div class="book">

<img src="${b.Image_Front}">

<h4>${b.Title}</h4>

<p>${b.Author}</p>

<p>₱${price}</p>

<button onclick='addCart(${JSON.stringify(b)})'>Add</button>

</div>

`

})

document.getElementById("books").innerHTML=html

}


function addCart(book){

let price=book["Discounted Price"]||book.Price

cart.push({

title:book.Title,
author:book.Author,
book_code:book.Book_Code,
original_price:book.Price,
discount_price:book["Discounted Price"],
qty:1,
subtotal:price

})

renderCart()

}


function renderCart(){

let html=""
let total=0
let qty=0

cart.forEach(i=>{

html+=`
<tr>
<td>${i.title}</td>
<td>${i.qty}</td>
<td>₱${i.subtotal}</td>
</tr>
`

total+=Number(i.subtotal)
qty+=Number(i.qty)

})

document.getElementById("cartTable").innerHTML=html
document.getElementById("total").innerText=total
document.getElementById("qty").innerText=qty

}


async function confirmReservation(){

let total=cart.reduce((a,b)=>a+Number(b.subtotal),0)

let data={
items:cart,
total:total,
total_items:cart.length
}

const res=await fetch(API,{
method:"POST",
body:JSON.stringify(data)
})

const result=await res.json()

document.getElementById("orderid").innerText=result.orderID

document.getElementById("popup").classList.remove("hidden")

}


function copyOrder(){

navigator.clipboard.writeText(
document.getElementById("orderid").innerText
)

alert("Order ID copied")

}


function goForm(){

window.location.href="YOUR_GOOGLE_FORM_LINK"

}