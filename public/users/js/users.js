const formDOM = document.querySelector('.form')
const nameInputDOM = document.querySelector('.name-input')
const roleDOM = document.querySelector('#role')
const departmentInputDOM = document.querySelector('.department-input')
const positionInputDOM = document.querySelector('.position-input')
const emailInputDOM = document.querySelector('.email-input')
const modalDOM = document.querySelector('.modal')
const overlayDOM = document.querySelector('.overlay')
const closeDOM = document.querySelector(".btn-close")
const btnUpdateDOM = document.querySelector('.btnUpdate')
const formAlertDOM = document.querySelector('.form-alert')
const usersDOM = document.querySelector('.usersList')
const staffsDOM = document.querySelector('.staffsList')
const staffsTab = document.querySelector('#allStaffs')
const searchInputDOM = document.querySelector('.searchInput')
const searchButtonDOM = document.querySelector('.btnSearch')

const showUsers = async () => {

    try
    {
        const token = localStorage.getItem('token')
const {
    data:{users},
} = await axios.get(`/api/v1/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},)

if (users.length < 1) {
    usersDOM.innerHTML = '<h5 class="empty-list">No users in your list</h5>'
    //loadingDOM.style.visibility = 'hidden'
    return
  }
//console.log({users})
const allUsers = users
.map((user) => {
const {name, department, position, role, email, _id:userID} = user
return `<tr>
<td>${name}</td>
<td>${department}</td>
<td>${position}</td>
<td>${role}</td>
<td>${email}</td>
<td><div class="user-links">

<!-- edit link -->
<button data-id="${userID}"  data-toggle="modal" data-target="#exampleModal" class="edit-btn">
<i class="fas fa-edit"></i>
</button>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${userID}">
<i class="fas fa-trash"></i>
</button>
</div>
</td>

</tr>`
})
.join('')
usersDOM.innerHTML = allUsers
    } catch(error) {
        
        usersDOM.innerHTML = error
        '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
}

showUsers ()





//const deleteBtnDOM = document.querySelector('.delete-btn')
//const editBtnDOMS = document.querySelectorAll('.edit-btn')
//Bring data for update
usersDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('edit-btn')) {
      //loadingDOM.style.visibility = 'visible'
      const id = el.parentElement.dataset.id

//editBtnDOMS.forEach((button) => {
//button.addEventListener('click', async (e) => {
    modalDOM.style.display = "block"
    overlayDOM.style.display = "block"
    //modalDOM.style.display = 'block'
  //  const id = e.target.dataset.id
    try
    {
        
        const token = localStorage.getItem('token')
const {
    data:{user},
} = await axios.get(`/api/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},)

    const {name, department, position, role, email, _id:userID} = user
    nameInputDOM.value = name
    departmentInputDOM.value = department
    positionInputDOM.value = position
    emailInputDOM.value = email
    roleDOM.value = role
    btnUpdateDOM.dataset.id = userID

} catch(error) {
    console.log(error)
}
}
})

closeDOM.addEventListener('click', async ( ) => {
    overlayDOM.style.display = "none"
})

////Update Role
btnUpdateDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const id = btnUpdateDOM.dataset.id
      //loadingDOM.style.visibility = 'visible'
      
    try
    
   {
        const token = localStorage.getItem('token')
const userRole = roleDOM.value

console.log(userRole)
const {
    data:{user},
} = await axios.patch(`/api/v1/users/${id}/updateRole`, {role:userRole, }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }}, 
    
)
formAlertDOM.style.display = 'block'
formAlertDOM.textContent = `success, edited role`
formAlertDOM.classList.add('text-success')
    } catch (error) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
        //formAlertDOM.innerHTML = error
    }

    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
      }, 3000)
})
//})
//showSingleUser ()


/*
  searchButtonDOM.addEventListener('click', async () => {
    const searchName = searchInputDOM.value

    try
    {
        
        const token = localStorage.getItem('token')
const {
    data:users,
} = await axios.get(`/api/v1/users/?name=`+searchName, {
    headers: {
      Authorization: `Bearer ${token}`,
    }},)

    if (users.length < 1) {
      usersDOM.innerHTML = '<h5 class="empty-list">No userss in your list</h5>'
      //loadingDOM.style.visibility = 'hidden'
      return
    }
  //console.log({users})
 // const allUsers = users
  //.map((user) => {
  const {name, department, position, role, email, _id:userID} = users
  const allUsers = `<tr>
  <td>${name}</td>
  <td>${department}</td>
  <td>${position}</td>
  <td>${role}</td>
  <td>${email}</td>
  <td><div class="user-links">
  
  <!-- edit link -->
  <button data-id="${userID}" data-toggle="modal" data-target="#exampleModal" class="edit-btn">
  <i class="fas fa-edit"></i>
  </button>
  <!-- delete btn >
  <button type="button" class="delete-btn" data-id="${userID}">
  <i class="fas fa-trash"></i>
  </button>
  </div>
  </td>
  -->
  </tr>`
  //})
 // .join('')
  usersDOM.innerHTML = allUsers
      } catch(error) {
          
          usersDOM.innerHTML = error
          '<h5 class="empty-list">There was an error, please try later....</h5>'
      }
  
  

   

  
  })
  */