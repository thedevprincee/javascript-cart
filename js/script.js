
let cartItem = []
let quantity= 1
let html = "";
const shoppingCart = document.querySelector("tbody")
const checkoutButton = document.querySelector("#checkout_button")

const getStoreData = async ()=>{
  try{
    let data = await fetch('https://fakestoreapi.com/products')
    cartItem = await data.json()
    
    cartItem.map((product)=>{
      html +=
      `<tr class="cart_item">
      <td><input type="checkbox" class="cart_item_check" checked /></td>
      <td width="100px">
        <div>
          <div class="flex">
            <div class="cart-img">
                <img src="${product.image}" />
                <br />
                <i class='bx bxs-heart bx-sm'></i>
            </div>
            <div class="cart-title"><p>${product.title}</p></div>
        </div>
      </td>
      <td>$ ${product.price}</td>
      <td><input class="input is-primary cart_item_qty" style="width:100px" type="number" min="1" value="${quantity}" data-price="${product.price}"></td>
      <td class="cart-item-total">$ ${product.price}</td> 
      <td><a class="btn_remove">Remove</a></td>
      </tr>`
      
    })
    shoppingCart.innerHTML = html;
    recalculateCart();

    const cartItemCheck = document.querySelectorAll(".cart_item_check")
        for(let l=0; l<cartItemCheck.length; l++){
            cartItemCheck[l].addEventListener('change', ()=>{
            recalculateCart();
        }) 
    }
  

    const cartItemQty = document.querySelectorAll(".cart_item_qty")
    
        for(let i=0; i<cartItemQty.length; i++){
            cartItemQty[i].addEventListener("change", ()=>{
                const currentItem = cartItemQty[i]
                const parent = currentItem.parentElement
                const totalCostContainer = parent.nextElementSibling
                const currentItemQty = cartItemQty[i].value
                const currentItemPrice = cartItemQty[i].getAttribute('data-price')
                const currentItemTotal = currentItemPrice * currentItemQty
                totalCostContainer.innerText = `$ ${currentItemTotal.toFixed(2)}`
                recalculateCart();
            })
        }
        
    const removeBtns = document.querySelectorAll('.btn_remove')
        for(let j=0; j<removeBtns.length; j++){
            removeBtns[j].addEventListener('click', ()=>{
            const currentClick = removeBtns[j] 
            const itemRow = currentClick.parentElement.parentElement
            itemRow.remove()
            recalculateCart();
      }) 
      }
    
      const bxHeart = document.querySelectorAll('.bxs-heart')
        for(let j=0; j<bxHeart.length; j++){
            bxHeart[j].addEventListener('click', ()=>{
            bxHeart[j].classList.toggle("red_heart")
            const itemRow = currentClick.parentElement.parentElement
            itemRow.remove()
            recalculateCart();
      }) 
      }

      
    }catch(err) {
      console.log(err);
  }
}


getStoreData()  




const recalculateCart = ()=> {
  let subTotal = 0;
  let grandTotal = 0;
  let tax = 0;
  const taxRate = 0.05;
  const shipping = 15.0;
  
  const checkout = document.querySelector('.checkout')
  const totals = document.querySelector('.totals')
  const eachCartItem = document.querySelectorAll('.cart_item')

  for(let item=0; item<eachCartItem.length; item++){
    const currentItem = eachCartItem[item]
    const itemCheck = currentItem.firstElementChild.firstElementChild
    
    const itemQuantity = currentItem.children[3].childNodes[0]
    if (itemCheck.checked) {
      let itemTotal = itemQuantity.value * itemQuantity.getAttribute("data-price");
      subTotal += itemTotal;
    }
  }

  if (subTotal > 0) {
    tax = subTotal * taxRate;
    grandTotal = subTotal + tax + shipping;
    totals.style.display = "show";
    checkoutButton.style.display = "show";
  }else{
    tax = 0.00;
    grandTotal = 0.00;
    totals.style.display = "none";
    checkoutButton.style.display = "none";
  }

  const cartSubtotal = document.querySelector('#cart_subtotal')
  const cartTotal = document.querySelector('#cart_total')
  const cartTax = document.querySelector('#cart_tax')
  const cartShipping = document.querySelector('#cart_shipping')

  cartSubtotal.innerText = subTotal.toFixed(2)
  cartTotal.innerText = grandTotal.toFixed(2)
  cartTax.innerText = tax.toFixed(2)
  cartShipping.innerText = shipping.toFixed(2)

}

