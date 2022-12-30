const taxRate = 0.05;
const shipping = 15.0;
let cartItem = [
  {
    title: "Item 1",
    price: 38,
    quantity: 1,
    total: 38
  },
  {
    title: "Item 2",
    price: 23.5,
    quantity: 1,
    total: 23.5
  },
  {
    title: "Item 3",
    price: 100,
    quantity: 1,
    total: 100
  },
  {
    title: "Item 4",
    price: 45,
    quantity: 1,
    total: 45
  },
  {
    title: "Item 5",
    price: 66,
    quantity: 1,
    total: 66
  },
  {
    title: "Item 6",
    price: 199,
    quantity: 1,
    total: 199
  }
];


  let html;
  cartItem.map((product)=>{
    html +=
      `<tr class="cart-item">
          <td>
            <input type="checkbox" class="cart-item-check" checked />
          </td>
          <td>${product.title}</td>
          <td>$ ${product.price}</td>
          <td>
            <input class="input is-primary cart-item-qty" style="width:100px" type="number" min="1" value="${product.quantity}" data-price="${product.price}"></td>
            <td class="cart-item-total">$ ${product.total}</td> 
            <td><a class="button is-small">Remove</a></td>
      </tr>`
  
  })

  
  const shoppingCart = document.querySelector("tbody")
  shoppingCart.innerHTML = html;
  
  recalculateCart();
  
  const cartItemCheck = document.querySelector(".cart-item-check")
  cartItemCheck.addEventListener("change", ()=>{
    recalculateCart();
  })
  
  const cartItemQty = document.querySelectorAll(".cart-item-qty")
  cartItemQty.forEach((cartItemQ)=>{
    cartItemQ.addEventListener("change", ()=>{
      let $this = cartItemQ;
      // let parent = $thi`s.parentElement.parentElement
      
      // parent.cartItemCheck.setAttribute("checked", "checked");
      let price = $this.getAttribute("data-price")
      let quantity = $this.value;
      let total = price * quantity;
      const cartItemTotal = document.querySelector(".cart-item-total")
      cartItemTotal.innerHTML = `$ ${total.toFixed(2)}`
      recalculateCart();
    })
  })
  


  $(".button").click(function() {
    let parent = $(this)
      .parent()
      .parent();
    parent.remove();
    recalculateCart();
  });

function recalculateCart() {
  let subTotal = 0;
  let grandTotal = 0;
  let tax = 0;
  let items = $(".cart-item");
  $.each(items, function() {
    let itemCheck = $(this).find(".cart-item-check");
    let itemQuantity = $(this).find(".cart-item-qty");
    if (itemCheck.prop("checked")) {
      let itemTotal = itemQuantity.val() * itemQuantity.attr("data-price");
      subTotal += itemTotal;
    }
  });
  if (subTotal > 0) {
    tax = subTotal * taxRate;
    grandTotal = subTotal + tax + shipping;
    $(".totals,.checkout").show();
  } else {
    $(".totals,.checkout").hide();
  }
  $("#cart-subtotal").html(subTotal.toFixed(2));
  $("#cart-total").html(grandTotal.toFixed(2));
  $("#cart-tax").html(tax.toFixed(2));
  $("#cart-shipping").html(shipping.toFixed(2));
}