const order = window.location;
const url = new URL(order);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;