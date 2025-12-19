document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 42.85 },
        { id: 2, name: "Product 2", price: 22.75 },
        { id: 3, name: "Product 3", price: 23.99 },
    ];

    const cart = [];
    const cartItems = document.getElementById("cart-items");
    const productList = document.getElementById("product-list");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");
    const deleteBtn = document.getElementById("delete-btn");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add To Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);

        }
    });

    function addToCart(product) {
        cart.push(product);//this will push the products into the cart.
        renderCart();
    }

    function removefromCart(itemId) {
        const removeitem = cart.findIndex(i => i.id === itemId);
        if (removeitem !== -1) {
            cart.splice(removeitem, 1);
            renderCart();
        }
    }

    function renderCart() {
        cartItems.innerText = "";
        let totalPrice = 0;
        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add("item");
                cartItem.innerHTML = `<span>${item.name}-$${item.price.toFixed(2)}</span>
                <button data-id="${item.id}">Delete</button>`;
                // console.log(cartItem)

                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;



            })
        }
        else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `0.00`
        }
    }

    cartItems.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const itemId = parseInt(e.target.getAttribute("data-id"));
            removefromCart(itemId);
        }
    })

    checkOutBtn.addEventListener("click", () => {
        cart.length = 0
        alert("Checkout Successfully");
        renderCart();
        //checkout button will clear the cart after checking succesfully.
    })
})