
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");



 let basket = JSON.parse(localStorage.getItem("data")) || [];


localStorage.setItem("data", JSON.stringify(basket));

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x . item).reduce((x,y) => x + y, 0);
}

    //    cartIcon.innerHTML = 100;

// console.log(basket.map((x)=> x . items).reduce((x,y) => x + y, 0));

calculation();


let generateCartItems = () =>  {
    if (basket.length !==0) {
         return shoppingCart.innerHTML = basket.map((x) =>{
            console.log(x);
            let{id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img,name,price} = search;
            return `
            <div style="gap:20px" class="cart-item">
            <img width=100 height=120 src="${search.img}" alt="">
            
           
            <div class="details">
           
            
            <div class="tittle-price-x">
            <h4 class="tittle-price">
            <p>${name}</p>
            <p class="cart-item-price">${price}</p>
            

            </h4>
            <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            

            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>

            <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div> 
            
            
        
           <h3>$ ${item * search.price}</h3>
           
           </div>
            
           </div>
            `
        })
        .join((""));
    } else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to home</button>
        </a> 
        
        
        `;

    }

};
 generateCartItems();


let increment = (id) => {
    let selectedItems = id;
    let search = basket.find((x)=> x.id === selectedItems.id );

    if(search === undefined){
        basket.push({
            id:selectedItems.id,
            item: 1,
        });
    
    }else{
        search.item += 1;
        // var localStorage: Storage;
        // localStorage.setItem("data", JSON.stringify(basket));
    };
    



    // console.log(basket);
    generateCartItems();
    update(selectedItems.id);

    localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id)=>{
   
    
    
    let selectedItems = id;
    let search = basket.find((x)=> x.id === selectedItems.id );

    if (search === undefined) return;

    else if(search.item === 0) return;
    else{
        search.item -= 1;
    };
    
    update(selectedItems.id);

    
    basket = basket.filter((x) => x.item !== 0 );
    
    generateCartItems();


    // console.log(basket);
   
    localStorage.setItem("data", JSON.stringify(basket));
    

};


let update = (id)=>{
    let search = basket.find((x)=> x.id === id);
    // console.log(search.items);
    document.getElementById(id).innerHTML =search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id)=>{
let selectedItems = id;
// console.log(selectedItems.id);
basket = basket.filter((x)=>x.id !==selectedItems.id);

generateCartItems();
TotalAmount();
calculation();
localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let { item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price ;
           
            
        })
        .reduce((x, y) => x + y, 0);
        // console.log(amount);

        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear cart</button>
            `;
        
    }
    else return;
}
TotalAmount();