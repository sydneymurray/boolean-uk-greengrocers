//////////////////////////////////////////////////////////////////////////////
// VARIABLES ARE DECLARED IN THE data.js FILE


//////////////////////////////////////////////////////////////////////////////
// FUNCTIONS ARE DECLARED HERE

function displayPage() {

    displayProducts()

    displayCart()

}

function displayProducts() {
    for (const storeItem of products) {
        displayStock(storeItem)
    }
}
function displayCart() {
    let cartItemList = document.querySelector(".cart--item-list")
    cartItemList.innerHTML = ""
    for (const cartItem of cart) {
        displayItems(cartItem)
    }
    displayTotal()

    // IF THE CART IS NOT EMPTY THEN SAVE THE CART IN JSON
  //  if (cart != null)
  //      saveCartToJson()
}

function saveCartToJson(){
    return fetch(`http://localhost:3000/cart`,{
            method:'POST',
            headers:{'Content-Type': 'Application/json'},
            body: JSON.stringify([])})
            .then(function () {
                fetch("http://localhost:3000/cart",{
                    method:'POST',
                    headers:{'Content-Type': 'Application/json'},
                    body: JSON.stringify(cart)
                })
            })    
}

function displayTotal() {
    let totalPrice = document.querySelector(".total-number")
    let cartValue = 0
    for (const item of cart) {
        cartValue += item.price * item.quantity
    }
    totalPrice.innerText = `£${cartValue.toFixed(2)}`
}

function displayStock(stockItem) {
    let storeItemList = document.querySelector(".store--item-list")

    let storeItemLi = document.createElement("li")
    storeItemList.append(storeItemLi)

    let storeItemDiv = document.createElement("div")
    storeItemDiv.setAttribute("class", "store--item-icon")
    storeItemLi.append(storeItemDiv)

    storeItemImage = document.createElement("img")
    storeItemImage.setAttribute("src", `assets/icons/${stockItem.id}.svg`)
    storeItemImage.setAttribute("alt", stockItem.name)
    storeItemDiv.append(storeItemImage)

    let storeAddItemButton = document.createElement("button")
    storeAddItemButton.innerText = "Add to cart"
    storeItemLi.append(storeAddItemButton)

    storeAddItemButton.addEventListener("click", function () {
        let index = cart.findIndex(function (presentCartItem) {
            return presentCartItem.name === stockItem.name
        })
        if (index !== -1)
            cart[index].quantity++
        else {
            stockItem.quantity = 1
            cart.push(stockItem)
        }
        displayCart()
    })
}

function displayItems(cartItem) {
    let cartItemList = document.querySelector(".cart--item-list")

    let cartItemLi = document.createElement("li")
    cartItemList.append(cartItemLi)

    let cartItemImage = document.createElement("img")
    cartItemImage.setAttribute("src", `assets/icons/${cartItem.id}.svg`)
    cartItemImage.setAttribute("alt", cartItem.name)
    cartItemImage.setAttribute("class", "cart--item-icon")
    cartItemLi.append(cartItemImage)

    let cartItemText = document.createElement("p")
    cartItemText.innerText = cartItem.name
    cartItemLi.append(cartItemText)

    let cartItemRemoveButton = document.createElement("button")
    cartItemRemoveButton.setAttribute("class", "quantity-btn remove-btn center")
    cartItemRemoveButton.innerText = "-"
    cartItemLi.append(cartItemRemoveButton)

    cartItemRemoveButton.addEventListener("click", function () {
        if (cartItem.quantity > 1)
            cartItem.quantity--
        else {
            let index = cart.findIndex(function (presentCartItem) {
                return presentCartItem.name === cartItem.name
            })
            cart.splice(index, 1)
        }
        displayCart()
    })

    let cartItemQuantity = document.createElement("span")
    cartItemQuantity.setAttribute("class", "quantity-text center")
    cartItemQuantity.innerText = `${cartItem.quantity}`
    cartItemLi.append(cartItemQuantity)

    let cartItemAddButton = document.createElement("button")
    cartItemAddButton.setAttribute("class", "quantity-btn Add-btn center")
    cartItemAddButton.innerText = "+"
    cartItemLi.append(cartItemAddButton)

    cartItemAddButton.addEventListener("click", function () {
        cartItem.quantity++
        displayCart()
    })
}

function retrieveJsonDataArrays() {
    return fetch("http://localhost:3000/products")
        .then(function (promise) {
            return promise.json()
        })
        .then(function (productArray) {
            products = productArray
        })
        .then(function () {
            return fetch("http://localhost:3000/cart")
                .then(function (promise) {
                    return promise.json()
                })
                .then(function (cartArray) {
                    cart = cartArray
                })
        })
}

//////////////////////////////////////////////////////////////////////////////
// MAIN PROGRAM STARTS HERE

retrieveJsonDataArrays().then(function () {
    displayPage()
})



//////////////////////////////////////////////////////////////////////////////
// SCRATCHPAD
/*

// THIS WORKS
function retrieveJsonDataArrays(){
    return fetch("http://localhost:3000/products")
        .then(function (promise){
            return promise.json()})
        .then(function (productArray){
            products = productArray})
}






This is how an item object should look like
{
    id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
    name: "beetroot",
    price: 0.35 <- You can come up with your own prices
    }
*/
