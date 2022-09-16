let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: "ajay kumar",
        tag: "shirt",
        price: 15,
        incart: 0
    },
    {
        name: "vijay kumar",
        tag: "white-shirt",
        price: 10,
        incart: 0
    },
    {
        name: "sagar kumar",
        tag: "black-shirt",
        price: 12,
        incart: 0
    },
    {
        name: "raja kumar",
        tag: "red-shirt",
        price: 5,
        incart: 0
    }
];
for (let i = 0; i < carts.length; i++) {
    // console.log("loop");
    carts[i].addEventListener('click', () => {
        // console.log("add to cart")
        cartNumber(products[i]);
        totalCost(products[i]);
    })

}

function onLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
cartNumber = (products) => {
    // console.log('the product cliscked is',product);
    let productNumbers = localStorage.getItem('cartNumber');
    // console.log(productNumbers);
    // console.log(typeof productNumbers);
    productNumbers = parseInt(productNumbers);
    // console.log(typeof productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);

}
function setItems(products) {
    //    console.log("Inside of SetItems function");
    //    console.log("my product is", product); 
    let cartItems = localStorage.getItem('productIncart');
    cartItems = JSON.parse(cartItems);

    //    console.log("my cartItems are" , cartItems)
    if (cartItems != null) {
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].incart += 1;
    }
    else {
        products.incart = 1
        cartItems = {
            [products.tag]: products
        }
    }

    // product.incart = 1;

    // cartItems = {
    //     [product.tag]: product
    // }

    localStorage.setItem("productIncart", JSON.stringify(cartItems));
}
function totalCost(products) {
    // console.log("the product price is",product.price);
    let cartCost = localStorage.getItem("totalCost");

    console.log("my cartCost is ".cartCost);
    console.log(typeof cartCost)
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productIncart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    if (cartItems && productContainer) 
    {
        // console.log("running");
        productContainer.innerHTML = " ";
        Object.values(cartItems).map(item => {
            productContainer
            .innerHTML += `
            <div class="product">
                    <i class="bi bi-x-circle-fill"></i>
        //         <icon-icon name= "close -circle"><icon-icon>
                     <img src= "image/${item.tag}.jpg">
                    <span>${item.name}</span>
            </div>
        <div class="price">
           ${item.price}
        </div>
        <div class="quantity">
         <i class="bi bi-plus-circle-fill"></i>
          <span> ${item.incart}</span>
          <i class="bi bi-dash-circle-fill"></i>
        </div>
        <div class="total">
           $${item.incart * item.price},00
        </div>
        `;
        });

        productContainer.innerHTML +=`
        <div class="baskettotalContainer">
        <h4 class="basketTotaltitle">
          Basket total
        </h4>
        <h4 class ="basketTotal">
           $ ${cartCost},00
        </h4>
        `}
}


onLoadCartNumber();
displayCart();