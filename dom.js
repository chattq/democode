// lấy ra nút thêm
var addInfot = document.querySelectorAll(".add");
addInfot.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var btnAdd = e.target.parentElement.parentElement;
    var codeProduct = btnAdd.querySelector("#product-code").value;
    var nameProduct = btnAdd.querySelector("#product-name").value;
    var priceProduct = btnAdd.querySelector("#product-price").value;
    var dateProduct = btnAdd.querySelector("#product-date").value;
    var expiryProduct = btnAdd.querySelector("#product-expiry").value;
    var numberProduct = btnAdd.querySelector("#product-number").value;
    error(codeProduct,nameProduct,priceProduct,dateProduct,numberProduct,expiryProduct);
  });
});
// check form  form
function error(codeProduct,nameProduct,priceProduct,dateProduct,numberProduct,expiryProduct) {
  // check mã sản phẩm
  if (_.isEmpty(codeProduct)) {
    codeProduct = "";
    document.querySelector("#code-error").innerHTML =
      "Vui Lòng Nhập Tên Sản Phẩm";
  } else {
    document.querySelector("#code-error").innerHTML = "";
  }
  // check tên sản phẩm
  if (_.isEmpty(nameProduct)) {
    nameProduct = "";
    document.querySelector("#name-error").innerHTML =
      "Vui lòng nhập tên sản phẩm";
  } else if (nameProduct.trim().length < 6) {
    nameProduct = "";
    document.querySelector("#name-error").innerHTML =
      "tên sản phẩm không được nhỏ hơn 6 ký tự";
  } else {
    document.querySelector("#name-error").innerHTML = "";
  }
  // check giá sản phẩm
  if (_.isEmpty(priceProduct)) {
    priceProduct = "";
    document.querySelector("#price-error").innerHTML = "Vui lòng nhập dữ liệu";
  }else if(priceProduct < 0){
    priceProduct = ""
    document.querySelector("#price-error").innerHTML = "dữ liệu nhập vào không đúng";
  }else {
    document.querySelector("#price-error").innerHTML = "";
  }
  // check ngày nhập hàng
  if (_.isEmpty(dateProduct)) {
    dateProduct = "";
    document.querySelector("#date-error").innerHTML =
      "Vui lòng nhập thời gian của sản phẩm";
  } else {
    document.querySelector("#date-error").innerHTML = "";
  }
  // check hạn sử dụng
  if (_.isEmpty(expiryProduct)) {
    expiryProduct = "";
    document.querySelector("#expiry-error").innerHTML =
      "Vui lòng nhập thời gian của sản phẩm";
  } else {
    document.querySelector("#expiry-error").innerHTML = "";
  }
  // check số lượng trong kho
  if (_.isEmpty(numberProduct)) {
    numberProduct = "";
    document.querySelector("#number-error").innerHTML = "Hãy nhập số lượng ";
  }else if(numberProduct < 0){
    numberProduct = ""
    document.querySelector("#number-error").innerHTML = "dữ liệu nhập vào không đúng";
  } else {
    document.querySelector("#number-error").innerHTML = "";
  }
  // kiểm tra data nếu 1 trong các đầu vào lỗi, thì sẽ không được gửi đi
  if (codeProduct && nameProduct && priceProduct && dateProduct && numberProduct && expiryProduct) {
    var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
    itemList.push({
      codeProduct: codeProduct.toUpperCase(),
      nameProduct: nameProduct,
      priceProduct: priceProduct,
      numberProduct: numberProduct,
      expiryProduct: expiryProduct,
      dateProduct: dateProduct,
    });
    localStorage.setItem("itemList", JSON.stringify(itemList));
    document.querySelector("#product-code").value = '';
    document.querySelector("#product-name").value = '';
    document.querySelector("#product-price").value = '';
    document.querySelector("#product-date").value = '';
    document.querySelector("#product-expiry").value = '';
    document.querySelector("#product-number").value = '';
    render()
  };
}
// reload không mất giữ liệu
function render() {
  var localData = localStorage.getItem("itemList");
  var itemList = localData ? JSON.parse(localData) : [];
  const tableProduct = document.getElementById("table-product");
  tableProduct.innerHTML = `<thead>
    <tr>
    <th scope="col">STT</th>
    <th scope="col">Mã Sản Phẩm</th>
    <th scope="col">Tên Sản Phẩm</th>
    <th scope="col">Giá Sản Phẩm</th>
    <th scope="col">Số Lượng</th>
    <th scope="col">Ngày Nhập</th>
    <th scope="col">Hạn Sử Dụng</th>
    <th scope="col" style="align-items: center;">Action</th>
    </tr> 
    </thead>`;
    itemList.forEach((item, index) => {
    var itemSTT = index;
    tableProduct.innerHTML += `</tbody>
      <th class ="stt-product" scope="row">${itemSTT + 1}</th>
      <td class ="code-product">${item.codeProduct}</td>
      <td class ="name-product">${item.nameProduct}</td>
      <td class ="price-product">${item.priceProduct}</td>
      <td class ="number-product">${item.numberProduct}</td>
      <td class ="date-product">${item.dateProduct}</td>
      <td class ="expiry-product">${item.expiryProduct}</td>
      <td>
        <button class="up-shop">Tải lên cửa hàng</button>
        <button class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Chỉnh sửa thông tin</button>
        <button onclick="deleteStore(${itemSTT})" class="delete-product">Xóa Sản Phẩm</button>
      </td> 
    </tbody>`;
  });
  // lấy dữ liệu ở kho để mang đi lên shop
  var btnClass = document.querySelectorAll(".up-shop");
  btnClass.forEach(function(btn){
    btn.addEventListener("click", function(el){
      var btnUp = el.target.parentElement.parentElement;
      var codeShop = btnUp.querySelector('.code-product').innerText;
      var nameShop = btnUp.querySelector('.name-product').innerText;
      var priceShop = btnUp.querySelector('.price-product').innerText;
      var numberShop = btnUp.querySelector('.number-product').innerText;
      var dateShop = btnUp.querySelector('.date-product').innerText;
      var expiryShop = btnUp.querySelector('.expiry-product').innerText;
      saveDataShop(codeShop,nameShop,priceShop,numberShop,expiryShop,dateShop);
      add(codeShop,nameShop,priceShop,numberShop,expiryShop,dateShop)
    });
  });
  // lấy dữ liệu để chỉnh sửa lại thông tin
  var editInfor = document.querySelectorAll(".edit");
  editInfor.forEach(function(btn){
    btn.addEventListener("click", function(c){
      var btnEdit = c.target.parentElement.parentElement;
      var sttEdit = btnEdit.querySelector('.stt-product').innerText;
      var codeEdit = btnEdit.querySelector('.code-product').innerText;
      var nameEdit = btnEdit.querySelector('.name-product').innerText;
      var priceEdit = btnEdit.querySelector('.price-product').innerText;
      var numberEdit = btnEdit.querySelector('.number-product').innerText;
      var dateEdit = btnEdit.querySelector('.date-product').innerText;
      var expiryEdit = btnEdit.querySelector('.expiry-product').innerText;
      editDataShop(sttEdit,codeEdit,nameEdit,priceEdit,numberEdit,expiryEdit,dateEdit);
    });
  });
};
// lưu data lên trình duyệt
function saveDataShop(codeShop,nameShop,priceShop,numberShop,expiryShop,dateShop){
  var shopProduct = localStorage.getItem("shopProduct") ? JSON.parse(localStorage.getItem("shopProduct")) : [];
  shopProduct.push({
    codeShop: codeShop,
    nameShop: nameShop,
    priceShop: priceShop,
    numberShop: numberShop,
    dateShop: dateShop,
    expiryShop: expiryShop,
  });   
  localStorage.setItem("shopProduct", JSON.stringify(shopProduct));
};
// lấy và thêm dữ liệu về
function add(){
  var shopProduct = localStorage.getItem("shopProduct") ? JSON.parse(localStorage.getItem("shopProduct")): [];
  const productShop = document.getElementById("product_shop");
  productShop.innerHTML = `<thead>
    <tr>
    <th scope="col">STT</th>
    <th scope="col">Mã Sản Phẩm</th>
    <th scope="col">Tên Sản Phẩm</th>
    <th scope="col">Giá Sản Phẩm</th>
    <th scope="col">Số Lượng Mua</th>
    <th scope="col">Số Lượng Trong Kho</th>
    <th scope="col">Ngày Nhập Hàng</th>
    <th scope="col">Hạn Sử Dụng</th>
    <th scope="col" style="align-items: center;">Action</th>
    </tr> 
    </thead>`;
    shopProduct.forEach((itemShop, index) => {
    var itemShopSTT = index;
    productShop.innerHTML += `</tbody>
      <th scope="row">${itemShopSTT + 1}</th>
      <td>${itemShop.codeShop}</td>
      <td>${itemShop.nameShop}</td>
      <td>${itemShop.priceShop}</td>
      <td>
        <input type="number" min="1" max= "${itemShop.numberShop}" name="" id="slShop" placeholder="1"/>
      </td>
      <td>${itemShop.numberShop}</td>
      <td class ="date-product">${itemShop.dateShop}</td>
      <td class ="expiry-product">${itemShop.expiryShop}</td>
      <td>
        <button class="buy">Mua</button>
        <button class="add-cart">Thêm Vào Giỏ Hàng</button>
      </td> 
    </tbody>`;
  });
};
add()
// xóa sản phẩm
function deleteStore(stt) {
  var itemList = localStorage.getItem("itemList") ? JSON.parse(localStorage.getItem("itemList")) : [];
  itemList.splice(stt, 1);
  localStorage.setItem("itemList", JSON.stringify(itemList));
  render();
};
// đẩy dữ liệu lên modal
function editDataShop(sttEdit,codeEdit,nameEdit,priceEdit,numberEdit,expiryEdit,dateEdit){
  document.querySelector("#product-code-modal").value = codeEdit;
  document.querySelector("#product-name-modal").value = nameEdit;
  document.querySelector("#product-price-modal").value = priceEdit;
  document.querySelector("#product-date-modal").value = dateEdit;
  document.querySelector("#product-expiry-modal").value = expiryEdit;
  document.querySelector("#product-number-modal").value = numberEdit;
};
// lấy dữ liệu từ modal
var saveModal = document.querySelectorAll('.save-modal');
saveModal.forEach(function(btn){
  btn.addEventListener('click', function(a){
    var btnSave = a.target.parentElement.parentElement.parentElement;
    var codeModal = btnSave.querySelector('#product-code-modal').value;
    var nameModal = btnSave.querySelector("#product-name-modal").value;
    var priceModal = btnSave.querySelector("#product-price-modal").value;
    var dateModal = btnSave.querySelector("#product-date-modal").value;
    var expiryModal = btnSave.querySelector("#product-expiry-modal").value;
    var numberModal = btnSave.querySelector("#product-number-modal").value;
    console.log(codeModal);
  });
});