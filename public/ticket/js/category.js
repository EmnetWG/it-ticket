const formDOM = document.querySelector('.form')
const nameInputDOM = document.querySelector('.name-input')
const categoryInputDOM = document.querySelector('.category-name-input')
const addModal = document.querySelector('.categoryContent')
const updateModal = document.querySelector('.modal')
//const updateModal = document.querySelector('.categoryContentUpdate')
const overlayDOM = document.querySelector('.overlay')
const closeDOM = document.querySelector(".btn-close")
const btnAddDOM = document.querySelector('.addCategory')
const formAlertDOM = document.querySelector('.form-alert')
const formAlertUpdate = document.querySelector('.form-alert-update')
const categoryDOM = document.querySelector('.categoryList')
const btnUpdateDOM = document.querySelector('.btnUpdate')
//const overlayDOM = document.querySelector('.overlay')

//const resultDOM = document.querySelector('.result')
//const btnDOM = document.querySelector('#data')
const successDOM = document.querySelector('.success')

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  //successDOM.classList.remove('text-success')

  e.preventDefault()
  const name = nameInputDOM.value
  



  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.post('/api/v1/category', { name } ,
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
    showCategorys ()

  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.response.data.msg
    
    //resultDOM.innerHTML = ''
    //successDOM.textContent = 'no token present'
    formAlertDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)
})


btnAddDOM.addEventListener('click', async () => {
  addModal.style.display='block';
})
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


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
const showCategorys = async () => {

    try
    {
        const token = localStorage.getItem('token')
const {
    data:{categorys}
} = await axios.get(`/api/v1/category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},)

if (categorys.length < 1) {
    categoryDOM.innerHTML = '<h5 class="empty-list">No category in your list</h5>'
    //loadingDOM.style.visibility = 'hidden'
    return
  }
//console.log({users})
const allCategorys = categorys
.map((category) => {
const {name,  _id:categoryID} = category
return `<tr>
<td>${name}</td>

<td><div class="user-links">

<!-- edit link -->
<button data-id="${categoryID}"  data-toggle="modal" data-target="#exampleModal" class="edit-btn">
<i class="fas fa-edit"></i>
</button>
<!-- delete btn --->
<button type="button" class="delete-btn" data-id="${categoryID}">
<i class="fas fa-trash"></i>
</button>
</div>
</td>

</tr>`
})
.join('')
categoryDOM.innerHTML = allCategorys
    } catch(error) {
        
        categoryDOM.innerHTML = error
        '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
}

showCategorys ()

//delete category
categoryDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    //loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {

      const token = localStorage.getItem('token')
      await axios.delete(`/api/v1/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }},)
      showCategorys()
    } catch (error) {
      console.log(error)
    }
  }
 // loadingDOM.style.visibility = 'hidden'
})

//Bring data for update
categoryDOM.addEventListener('click', async (e) => {
    const el = e.target

    
    if (el.parentElement.classList.contains('edit-btn')) {
      //loadingDOM.style.visibility = 'visible'
      const id = el.parentElement.dataset.id

//editBtnDOMS.forEach((button) => {
//button.addEventListener('click', async (e) => {
  //  
    overlayDOM.style.display = "block"
    updateModal.style.display = "block"
    //modalDOM.style.display = 'block'
  //  const id = e.target.dataset.id
    try
    {
        
        const token = localStorage.getItem('token')
const {
    data:category
} = await axios.get(`/api/v1/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }})
console.log(category)
    const {name,  _id:categoryID} = category.category
    console.log(name)
    categoryInputDOM.value = name
    
    btnUpdateDOM.dataset.id = categoryID

} catch(error) {
    console.log(error)
}
}
})


closeDOM.addEventListener('click', async ( ) => {
    overlayDOM.style.display = "none"
})

/* Update Category */
btnUpdateDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const id = btnUpdateDOM.dataset.id
      //loadingDOM.style.visibility = 'visible'
      
    try
    
   {
        const token = localStorage.getItem('token')
const name = categoryInputDOM.value

console.log(name)
const 
    data
 = await axios.patch(`/api/v1/category/${id}`, {name}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }}, 
    
)
formAlertUpdate.style.display = 'block'
formAlertUpdate.textContent = `success, edited category`
formAlertUpdate.classList.add('text-success')
showCategorys ()

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
