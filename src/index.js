let shop = document.getElementById("shop");
console.log(shop);

// let shopItemsData = [{
//     id:"yyyyyh",
//     name: "First frame",
//     price: 80,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "image/pic 1.webp"
// },
// {
//     id:"yyjjjh",
//     name: "Second frame",
//     price: 300,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "image/pic 2.webp" 
// },
// {
//     id:"jjjjjjjh",
//     name: "Third frame",
//     price: 150,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "image/pic 3.webp"
// },
// {
//     id:"ynnnnnnnnnnh",
//     name: "Fourth frame",
//     price: 100,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "image/pic 4.webp"
// },
// ];



let basket = JSON.parse(localStorage.getItem("data")) || [];









let generateShop =()=>{
    return (shop.innerHTML= shopItemsData.map((x)=>{
        let {id,name,price,desc,img} =x;
        let search = basket.find((x) =>x.id === id) || [];
        
        return `
        <div id=product-id${id} class="items">
        <img width="220" height="200" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${price}</h2>
          
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>

                <div id=${id} class="quantity">
                    
                ${search.item === undefined? 0: search.item}
                
                    </div>

            
               
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
    </div>
   
   
   
        
        `;


    }).join("")); 
    



    
  
};

generateShop();

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
    



    // console.log(basket);
   
    localStorage.setItem("data", JSON.stringify(basket));
    

};


let update = (id)=>{
    let search = basket.find((x)=> x.id === id);
    // console.log(search.items);
    document.getElementById(id).innerHTML =search.item;
    calculation();
};

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x . item).reduce((x,y) => x + y, 0);
}

    //    cartIcon.innerHTML = 100;

// console.log(basket.map((x)=> x . items).reduce((x,y) => x + y, 0));

calculation();