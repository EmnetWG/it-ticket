const formDOM = document.querySelector('.form')
const nameInputDOM = document.querySelector('.name-input')
const subCategoryInputDOM = document.querySelector('.subCategory-name-input')
const categoryInputDOM = document.querySelector('.category-name-input')
//const categoryDOM = document.querySelector('#category')
const addModal = document.querySelector('.subCategoryContent')
const updateModal = document.querySelector('.modal')
//const modal = document.querySelector('.subCategoryContent')
const overlayDOM = document.querySelector('.overlay')
const closeDOM = document.querySelector(".btn-close")
const btnAddDOM = document.querySelector('.addSubCategory')
const btnUpdateDOM = document.querySelector('.btnUpdate')
const formAlertDOM = document.querySelector('.form-alert')
const formAlertUpdate = document.querySelector('.form-alert-update')
const subCategoryDOM = document.querySelector('.subCategoryList')
const categorySelectDOM = document.querySelector('.selectCategory')
const categorySelectUpdateDOM = document.querySelector('.selectCategoryUpdate')
const successDOM = document.querySelector('.success')
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

btnAddDOM.addEventListener('click', async () => {
  addModal.style.display='block';
  bringCategorys ()
})
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  addModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
}

//BringCategoryUpdate
const bringCategorysUpdate = async () =>  {
  try
  {
      const token = localStorage.getItem('token')
const {
  data:{categorys}
} = await axios.get(`/api/v1/category`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }},)
//console.log(categorys)
if (categorys.length < 1) {
  subCategoryDOM.innerHTML = '<h5 class="empty-list">No category in your list</h5>'
  //loadingDOM.style.visibility = 'hidden'
  return
}
//console.log({users})
const allCategorys = categorys
.map((category) => {
const {name,  _id:categoryID} = category
return `
<option data-id="${categoryID}">${name}</option>
`
})
.join('')
categorySelectUpdateDOM.innerHTML = allCategorys
  } catch(error) {
      
    categorySelectUpdateDOM.innerHTML=
      `<h5 class="empty-list">There was an error, please try later....</h5>`
  }
}

//Bring Category
const bringCategorys = async () =>  {
  try
  {
      const token = localStorage.getItem('token')
const {
  data:{categorys}
} = await axios.get(`/api/v1/category`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }},)
//console.log(categorys)
if (categorys.length < 1) {
  categoryDOM.innerHTML = '<h5 class="empty-list">No category in your list</h5>'
  //loadingDOM.style.visibility = 'hidden'
  return
}
//console.log({users})
const allCategorys = categorys
.map((category) => {
const {name,  _id:categoryID} = category
return `
<option data-id="${categoryID}">${name}</option>
`
})
.join('')
categorySelectDOM.innerHTML = allCategorys
  } catch(error) {
      
    categorySelectDOM.innerHTML = error
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
}

//select
categorySelectDOM.addEventListener('change', async (event) => {
  const categoryid = event.target.options[event.target.selectedIndex].dataset.id
  //return categoryid
  console.log(categoryid)
})

categorySelectUpdateDOM.addEventListener('change', async (event) => {
  const categoryid = event.target.options[event.target.selectedIndex].dataset.id
  //return categoryid
  console.log(categoryid)
})
//

const bringAllCategorys = async (id) =>  {
  var category = null
  console.log(id)
  try
  {
      const token = localStorage.getItem('token')
const {
  data:{categorys}
} = await axios.get(`/api/v1/category`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }},)
//console.log(categorys)
if (categorys.length < 1) {
  subCategoryDOM.innerHTML = '<h5 class="empty-list">No category in your list</h5>'
  //loadingDOM.style.visibility = 'hidden'
  return
}
//let json = await categorys.json()
JSON.stringify(categorys)
return categorys
  //console.log(categorys)

 // for(var i=0; i<categorys.length; i++) {
//if(categorys[i]._id == id){
//  category= categorys[i].name
 // console.log(category)
 // return category
}
 // }
//const allCategorysName = categorys.map((categorydata) => {
 // const {name,  _id:categoryID}= categorydata
 //console.log(categorydata.name)
  //if(id == categorydata.categoryID) {
   // category=categorydata.name
 // }
//})
//return categorys
//return category
  //}

catch(error){
 console.log(error)
}
} 
//console.log(bringAllCategorys())
//Bring Categorey name
const categoryName = async (id) => {
  try
  {
      
      const token = localStorage.getItem('token')
const {
  data:category
} = await axios.get(`/api/v1/category/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }})
//console.log(category)
  const {categoryname,  _id:categoryid} = category.category
  //console.log(name)
  //categoryInputDOM.value = name
  
  //btnUpdateDOM.dataset.id = categoryID
  return `<td data-id='${categoryid}'>${categoryname}</td>`

} catch(error) {
  console.log(error)
}
}

// submit form

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  e.preventDefault()
  bringCategorys ()
  //successDOM.classList.remove('text-success')
 //const e1 = e.target
 //if (e.target.parentElement.classList.contains('selectCategory')) {
  //loadingDOM.style.visibility = 'visible'
 // const category = e.target.parentElement.dataset.id
  //console.log(category)
  
  const name = nameInputDOM.value
  //const category = " "
  
  const category = categorySelectDOM.options[categorySelectDOM.selectedIndex].dataset.id
  //const option = document.getElementsByTagName("option")[0];
//const category = option.dataset.id
  //console.log(option.dataset.rc)
  //console.log(option.dataset.clnc)
  

  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.post('/api/v1/subCategory', { name, category } ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }})

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = data.msg

    formAlertDOM.classList.add('text-success')
    nameInputDOM.value = ''
    

    //resultDOM.innerHTML = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Registration is successful'
    formAlertDOM.classList.add('text-success')
    showSubCategorys()

  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.msg
    
    //resultDOM.innerHTML = ''
    //successDOM.textContent = 'no token present'
    formAlertDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)

})

const showSubCategorys = async () => {

    try
    {
        const token = localStorage.getItem('token')
const {
    data:subCategorys}
 = await axios.get(`/api/v1/subCategory/name`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},)
console.log(subCategorys)
if (subCategorys.length < 1) {
    subCategoryDOM.innerHTML = '<h5 class="empty-list">No category in your list</h5>'
    //loadingDOM.style.visibility = 'hidden'
    //subCategoryDOM.innerHTML= error.msg
    return
  }
//console.log({users})
const allSubCategorys = subCategorys.categorys
.map((subcategory) => {
const {name,  category, _id:subCategoryID} = subcategory

//const result = bringAllCategorys(category)
//console.log(result)
/*
const promiseResult = (category1)=> {
const result = bringAllCategorys(category1)
result.then(value => {
  //console.log(value)
  return value
})

}*/
//console.log(promiseResult(category))
//const resultValue = promiseResult(category)
//console.log(resultValue)
//console.log(result)
//console.log(categoryOutput)
return `<tr>
<td>${name}</td>
<td data-id="${category._id}">${category.name}</td>


<td><div class="user-links">

<!-- edit link -->
<button data-id="${subCategoryID}"  data-toggle="modal" data-target="#exampleModal" class="edit-btn">
<i class="fas fa-edit"></i>
</button>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${subCategoryID}">
<i class="fas fa-trash"></i>
</button>
</div>
</td>

</tr>`
})
.join('')
subCategoryDOM.innerHTML = allSubCategorys
    } catch(error) {
        
        subCategoryDOM.innerHTML= 
        `<h5 class="empty-list">There was an error, please try later....</h5>`
    }
}

showSubCategorys ()

//bringCategorys ()


//Bring data for update
subCategoryDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('edit-btn')) {
      //loadingDOM.style.visibility = 'visible'
      const id = el.parentElement.dataset.id

//editBtnDOMS.forEach((button) => {
//button.addEventListener('click', async (e) => {
  overlayDOM.style.display = "block"
    updateModal.style.display = "block"
    
    bringCategorysUpdate ()
    //modalDOM.style.display = 'block'
  //  const id = e.target.dataset.id
    try
    {
        
        const token = localStorage.getItem('token')
const 
   {data:subCategory1}
 = await axios.get(`/api/v1/subCategory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},)

    const {name, category, _id:subCategoryID} = subCategory1.subCategory
    subCategoryInputDOM.value = name
   // console.log(subCategory1)
    console.log(category)

    for (var i = 0; i < categorySelectUpdateDOM.length; i++) {
      if (categorySelectUpdateDOM[i].dataset.id === category) {
        categorySelectUpdateDOM[i].selected = true;
      }
    }
    
    //categorySelectDOM.value = category
    //categorySelectUpdateDOM.dataset.id = category 
    //const categoryAttribute=categorySelectUpdateDOM.options[categorySelectDOM.selectedIndex].getAttribute(category)
    //categorySelectUpdateDOM.options[category].selected=true
    //categorySelectUpdateDOM.selectedIndex=category 
    //const category = categorySelectDOM.options[categorySelectDOM.selectedIndex].dataset.id
    btnUpdateDOM.dataset.id = subCategoryID

} catch(error) {
    console.log(error)
}
}
})

closeDOM.addEventListener('click', async ( ) => {
    overlayDOM.style.display = "none"
})


//Update Sub Category
btnUpdateDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const id = btnUpdateDOM.dataset.id
      //loadingDOM.style.visibility = 'visible'
      
    try
    
   {
        const token = localStorage.getItem('token')
const nameValue = subCategoryInputDOM.value
const categoryValue = categorySelectUpdateDOM.options[categorySelectUpdateDOM.selectedIndex].dataset.id
console.log(categoryValue)
const 
    data
 = await axios.patch(`/api/v1/subCategory/${id}`, {name:nameValue, category:categoryValue }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }}, 
    
)
formAlertUpdate.style.display = 'block'
formAlertUpdate.textContent = `success, edited subCategorey`
formAlertUpdate.classList.add('text-success')
showSubCategorys()
    } catch (error) {
      formAlertUpdate.style.display = 'block'
      formAlertUpdate.innerHTML = `error, please try again`
        //formAlertDOM.innerHTML = error
    }

    setTimeout(() => {
      formAlertUpdate.style.display = 'none'
      formAlertUpdate.classList.remove('text-success')
      }, 3000)
})
//})

//delete SubCategory
subCategoryDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    //loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {

      const token = localStorage.getItem('token')
      await axios.delete(`/api/v1/subCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }},)
        showSubCategorys()
    } catch (error) {
      console.log(error)
    }
  }
 // loadingDOM.style.visibility = 'hidden'
})