window.addEventListener('beforeunload', save);


function save() {
    localStorage.db = JSON.stringify(wishes);

    
}
//helpers
let index = null;



//views
let allWishView = document.querySelector('#all-wish-view');
let allWishTbody = allWishView.querySelector('tbody');
let addWishView = document.querySelector('#add-wish-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let editDeleteTbody = editDeleteView.querySelector('tbody');
let editWishView = document.querySelector('#edit-wish-view');





//buttons
let allWishBtn = document.querySelector('#all-wish-btn');
let addWishBtn = document.querySelector('#add-wish-btn');
let saveBtn = document.querySelector('#save-btn');
let editDeleteBtn = document.querySelector('#edit-delete-btn');
let allNavLinks = document.querySelectorAll('.nav-item a');
let updateBtn = document.querySelector('#update-btn');

//coockie

let acceptBtn = document.querySelector('#accept');
let refuseBtn = document.querySelector('#refuse');
let cookieView = document.querySelector('#cookie');
acceptBtn.addEventListener('click',acceptCookie);
refuseBtn.addEventListener('click',refuseCookie);

if(localStorage.cookie){
    cookieView.style.display = 'none';
}else{
    cookieView.style.display = 'block';

}

function acceptCookie(e) {
    if(e){              //postavili smo ovaj uslov kako bi mogli ovu fju da pozivamo i mi a ne samo browser
        e.preventDefault();
    }
    localStorage.setItem("cookie","accepted");
    cookieView.style.display = 'none';

}
function refuseCookie(e) {
    if(e){              //postavili smo ovaj uslov kako bi mogli ovu fju da pozivamo i mi a ne samo browser
        e.preventDefault();
    }
localStorage.removeItem("cookie");
}






//inputs
let idInput = document.querySelector('input[name="id"]');
let itemInput = document.querySelector('input[name="item"]');
let priceInput = document.querySelector('input[name="price"]');
let linkInput = document.querySelector('input[name="link"]');
let sourceInput = document.querySelector('input[name="source"]');
let importantInput = document.querySelector('input[name="important"]');
//edit inputs
let eidInput = document.querySelector('input[name="eid"]');
let eitemInput = document.querySelector('input[name="eitem"]');
let epriceInput = document.querySelector('input[name="eprice"]');
let elinkInput = document.querySelector('input[name="elink"]');
let esourceInput = document.querySelector('input[name="esource"]');
let eimportantInput = document.querySelector('input[name="eimportant"]');

let searchInput = document.querySelector('#search-input');


//listeners 
allWishBtn.addEventListener('click',showAllWishView);
addWishBtn.addEventListener('click',showAddWishView);
saveBtn.addEventListener('click',saveNewWish);
editDeleteBtn.addEventListener('click', showEditDeleteView);
allNavLinks.forEach(link => link.addEventListener('click', controlActive));
updateBtn.addEventListener('click', updateWish );
searchInput.addEventListener('keyup', searchDB );

createWishTable();


function searchDB(e) {
    let searchTerm = this.value.toLowerCase();
    let filtered = wishes.filter(function(el){
        return el.item.toLowerCase().includes(searchTerm) || el.price.includes(searchTerm) || el.source.toLowerCase().includes(searchTerm);
    })
createWishTable(filtered);
}

function updateWish(e) {
    let updated = {
            id: eidInput.value,
            item : eitemInput.value,
            price : epriceInput.value,
            link : elinkInput.value,
            important : eimportantInput.checked,
            source : esourceInput.value
        
    }
                wishes[index] = updated;
                createWishTable();
                showAllWishView();
}

function saveNewWish(e) {
    let newWish = {
        id : idInput.value ,
        item : itemInput.value ,
        price : priceInput.value ,
        link : linkInput.value ,
        source : sourceInput.value ,
        important : importantInput.checked
    }
wishes.push(newWish);
createWishTable();
showAllWishView();

  }

function showAddWishView(e) {


    e.preventDefault();

    editDeleteView.style.display = 'none';
    allWishView.style.display = 'none';
    editWishView.style.display = 'none';
    addWishView.style.display = 'block';
    addWishBtn.style.background = '#f9ffe6';
}

function showEditDeleteView(e) {
    createEditDeleteTable();
    if(e){              //postavili smo ovaj uslov kako bi mogli ovu fju da pozivamo i mi a ne samo browser
        e.preventDefault();
    }

    allWishView.style.display = 'none';
    addWishView.style.display = 'none';
    editWishView.style.display = 'none';
    editDeleteView.style.display = 'block';
}
function showAllWishView(e) {
    if(e){              //postavili smo ovaj uslov kako bi mogli ovu fju da pozivamo i mi a ne samo browser
        e.preventDefault();
    }

    editDeleteView.style.display = 'none';
    addWishView.style.display = 'none';
    editWishView.style.display = 'none';
    allWishView.style.display = 'block';

}



function createWishTable(filtered){
    let data = filtered || wishes ;
    let text = "";
    let importantMsg = "";
    data.forEach(wish => {
        (wish.important) ? importantMsg = 'important' : importantMsg = 'Normal';
        text += `
                        <tr class ="${importantMsg.toLowerCase()}">
                            <td>${wish.id}</td>
                            <td>${wish.item}</td>
                            <td>${wish.price}</td>
                            <td><a href="${wish.link}" class="btn btn-sm btn-info">Link</a></td>
                            <td>${importantMsg}</td>
                            <td>${wish.source}</td>
                        </tr>
        `.trim();
    })
    allWishTbody.innerHTML = text;
}


function controlActive(e) {
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    })

    this.classList.add('active');
}

function createEditDeleteTable(){
    let text = "";
    let importantMsg = "";
    wishes.forEach((wish,index) => {
        (wish.important) ? importantMsg = 'important' : importantMsg = 'Normal';
        text += `
                        <tr class ="${importantMsg.toLowerCase()}">
                            <td>${wish.id}</td>
                            <td>${wish.item}</td>
                            <td>${wish.price}</td>
                            <td><a href="${wish.link}" class="btn btn-sm btn-info">Link</a></td>
                            <td>${importantMsg}</td>
                            <td>${wish.source}</td>
                            <td><button data-index = "${index}" class="btn btn-sm btn-danger delete-btns">Delete</button></td> <td><button data-index = "${index}" class="btn btn-sm btn-warning edit-btns">Edit</button></td>
                        </tr>
        `.trim();
    })
    editDeleteTbody.innerHTML = text;
    let allDeleteBtns = document.querySelectorAll('.delete-btns');
    let allEditBtns = document.querySelectorAll('.edit-btns');
    allDeleteBtns.forEach((btn,index) => {
        btn.addEventListener('click', deleteWish);
        allEditBtns[index].addEventListener('click', showUpdateForm);
    })
}

function deleteWish() {
 index = this.getAttribute('data-index');
wishes.splice(index,1);
createWishTable();
showAllWishView();

  }
  function showUpdateForm(e) {
     index = this.getAttribute('data-index');
    let currentWish = wishes[index];

    editDeleteView.style.display = 'none';
    addWishView.style.display = 'none';
    allWishView.style.display = 'none';
    editWishView.style.display = 'block';
    

    eidInput.value = currentWish.id;
    eitemInput.value = currentWish.item;
    epriceInput.value = currentWish.price;
    elinkInput.value = currentWish.link;
    esourceInput.value = currentWish.source;

    (currentWish.important) ? eimportantInput.setAttribute('checked' , true) : false ;


}