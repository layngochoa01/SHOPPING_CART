function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}

const PRODUCTS = [
  {
    id: 'hBuZdx1elR5a',
    name: 'Fushigidane',
    thumb: 'Fushigidane.png',
    shortDesc:
      'Người ta thường thấy Fushigidane nằm ngủ dưới ánh nắng. Càng đắm mình trong nắng, hạt giống trên lưng chúng càng phát triển.',
    price: 12,
  },
  {
    id: 'fDQWzrgq6gXX',
    name: 'Hitokage',
    thumb: 'Hitokage.png',
    shortDesc: 'Tính cách ưa thích đồ nóng. Nghe nói khi trời mưa khói sẽ phụt ra từ đuôi của nó.',
    price: 15,
  },
  {
    id: 'aLjNSdeJi9Q2',
    name: 'Zenigame',
    thumb: 'Zenigame.png',
    shortDesc:
      'Chiếc mai của Zenigame không chỉ để tự vệ, mà còn làm giảm tối đa lực cản nước nhờ hình dáng tròn trịa cùng bề mặt nhiều rãnh, giúp chúng bơi nhanh hơn.',
    price: 25,
  },
  {
    id: 'rOYIHlZQlwdV',
    name: 'Pikachu',
    thumb: 'Pikachu.png',
    shortDesc: 'Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.',
    price: 32,
  },
  {
    id: 'zzC3HkWp9g4s',
    name: 'Purin',
    thumb: 'Purin.png',
    shortDesc:
      'Những bản thu âm tuyển tập bài hát ru kì lạ của Purin được bán tại các cửa hàng tạp hóa. Rất nhiều người coi chúng là vật gối đầu giường.',
    price: 9,
  },
];

let carts = [
    {
      id: 'qhZ2wNwZZW63',
      productId: 'hBuZdx1elR5a',
      quantity: 2,
    },
    {
      id: 'gijYjCti3BvR',
      productId: 'fDQWzrgq6gXX',
      quantity: 1,
    },
    {
      id: 'RQpImf7zc8ao',
      productId: 'aLjNSdeJi9Q2',
      quantity: 3,
    },
    {
      id: 'LPobAEvux29H',
      productId: 'rOYIHlZQlwdV',
      quantity: 6,
    },
    // {
    //   id: 'PpLjmYoKdRG1',
    //   productId: 'zzC3HkWp9g4s',
    //   quantity: 1,
    // },
];
let rowcart;
let rowAmount;
let totalAmount;
const producttotalAmount=document.getElementById('toTal');
const productcount= document.getElementById('count');
const productcarts=document.getElementById('cardProducts');
let productcartshtmlarray=[];
let productcartshtml;
//< Ham Load san pham
async function LoadProduct()
{
  const productlist = document.getElementById('listProducts');
  let productlisthtml='';
  let imglink=''
  PRODUCTS.forEach((item)=>{
    imglink=`img/${item.thumb}`;
    productlisthtml+= /*html*/` 
    <div class="row align-items-center">
      <div class="col-6 col-md-4">
        <img src=${imglink} alt="" class="img-fluid">
      </div>
      <div class="col-6 col-md-8">
        <h6>${item.name}</h6>
        <div class="form-group">
          <div class="d-flex">
            <button id=${item.id}_sub class="btn btn-primary"> - </button>
            <input id=${item.id}_value type="text" class="form-control mx-1" value="1" min="1">
            <button id=${item.id}_add class="btn btn-primary"> + </button>
          </div>
          <button id=${item.id}_update class="btn btn-danger btn-block mt-1 btn-add-to-cart">$${item.price}</button>
        </div>
      </div>
    </div> `;
    
  });
  productlist.innerHTML= productlisthtml;
  AddEventButtonProduct();
}
//> Ham Load san pham

//< Ham tim Object Product bang productID
function findProduct(productId)
{
  const find = PRODUCTS.find((item)=>item.id===productId);
  return find;
}
//> Ham tim Object Product bang productID

//<Ham load gio hang
 function LoadCarts()
{
   productcartshtml='';
   productcartshtmlarray=[];
   rowcart=0;
   rowAmount=0;
   totalAmount=0;
   carts.forEach((item)=>{
     UpdateCartHtml(item.productId,item.quantity,'add');
  });
  productcarts.innerHTML=  productcartshtmlarray.join('');
  producttotalAmount.innerText=  `$${totalAmount}`;
  productcount.innerText=  `${rowcart}`;
  AddEventButtonCart();
}
//> Ham load gio hang
LoadProduct();
LoadCarts();

//< Ham Update html Cart
function UpdateCartHtml(productId,quantity,type)
{
    
    const product= findProduct(productId);
    if(type==='add')
    {
      rowcart++;
      rowAmount= quantity * product.price;
      
      const htmladdcart= /*html*/`
      <tr>
          <td>${rowcart}</td>
          <td>${product.name}</td>
          <td>$${product.price}</td>
          <td>
            <input id=${productId}_QuantityCart type="number" min="1" class="form-control" value=${quantity}>
          </td>
          <td><span id=${productId}_AmountCart class="fw-bold">${rowAmount}</span></td>
          <td>
            <button id=${productId}_UpdateCart  type="button" class="btn btn-link btn-sm btn-rounded">Update</button>
            <button id=${productId}_DeleteCart type="button" class="btn btn-link btn-sm btn-rounded">Delete</button>
          </td>
        </tr>
      `;
      //productcartshtml+=htmladdcart;
      productcartshtmlarray.push(htmladdcart);
      totalAmount+=rowAmount;
    }
    if(type=='update_product')
    {
      const productcartquantity = document.getElementById(`${productId}_QuantityCart`);
      const productcartamount =document.getElementById(`${productId}_AmountCart`);
      const rowAmountDif = product.price *quantity;
      rowAmount=product.price*(quantity+parseInt(productcartquantity.value)) ;
      productcartquantity.value=quantity;
      productcartamount.innerText=rowAmount;
      totalAmount+=rowAmountDif;
    }
    if(type==='update')
    {
      const productcartquantity = document.getElementById(`${productId}_QuantityCart`);
      const productcartamount =document.getElementById(`${productId}_AmountCart`);
      const rowAmountDif= product.price*quantity;
      rowAmount=product.price *parseInt(productcartquantity.value);
      productcartamount.innerText=`$${rowAmount}`;
      totalAmount+=rowAmountDif;
    }
    producttotalAmount.innerText= `$${totalAmount}`;
    productcount.innerText= `${rowcart}`;
}
//> Ham Update html Cart

//< Ham tim data vs index cua 1 phan tu trong mang
function findArray(dataarray,value)
{
  let datafind;
  dataarray.find((item,index)=>{
      if (item.productId===value)
      {
        datafind= {data: dataarray[index],index:index}
      }
    });
    return datafind;
}
//> Ham tim data vs index cua 1 phan tu trong mang

//<Ham Update Cart
 function UpdateCart(productId,quantity)
{
    const find = findArray(carts,productId);
      if (find !== undefined)
      {     
        const quantity_final = quantity+ parseInt(find.data.quantity);
        carts[find.index]={id:`${find.data.id}`,productId:`${productId}`,quantity:quantity_final};
        UpdateCartHtml(productId,quantity,'update_product');
      }
      else
      {
          carts.push({id:createId(),productId:productId,quantity:quantity});     
          UpdateCartHtml(productId,quantity,'add');
          productcarts.innerHTML=productcartshtmlarray.join('');
          AddEventButtonCart();
      }
}
//> Ham Update Cart


//< Them Event nut + - cho danh muc san pham
function AddEventButtonProduct()
{
  PRODUCTS.forEach((item)=>{
    
    const btnAddProduct= document.getElementById(`${item.id}_add`);
    const btnSubProduct = document.getElementById(`${item.id}_sub`);
    const txtQuantityProduct= document.getElementById(`${item.id}_value`);
    const btnUpdateQuantity= document.getElementById(`${item.id}_update`);
    let quantity= parseInt(txtQuantityProduct.value);
    btnAddProduct.onclick=()=>{
      quantity++; 
      txtQuantityProduct.value=quantity;
    }
    btnSubProduct.onclick=()=>{
      if(quantity>1)
      {
        quantity--; 
        txtQuantityProduct.value=quantity;
      }   
    }
    btnUpdateQuantity.onclick=()=>{
      UpdateCart(item.id,parseInt(txtQuantityProduct.value));
    }
  })
}
//> Them Event nut + - cho danh muc san pham
function AddEventButtonCart()
{
  carts.forEach((item,index)=>{
      const btnUpdateCart = document.getElementById(`${item.productId}_UpdateCart`);
      const btnDeleteCart= document.getElementById (`${item.productId}_DeleteCart`);
      btnUpdateCart.onclick=()=>{  
        const txtQuantityCart = document.getElementById(`${item.productId}_QuantityCart`);    
        const quantitydif= parseInt(txtQuantityCart.value)-item.quantity; 
        carts[index].quantity=parseInt(txtQuantityCart.value);      
        UpdateCartHtml(item.productId,quantitydif,'update');
      }
      btnDeleteCart.onclick=()=>{
         carts.splice(index,1);
         LoadCarts();
      }
  })
}