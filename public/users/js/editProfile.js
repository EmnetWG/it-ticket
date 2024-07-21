


const formDOM = document.querySelector('.form')
const nameInputDOM = document.querySelector('.name-input')
const roleDOM = document.querySelector('#role')
const departmentInputDOM = document.querySelector('.department-input')
const positionInputDOM = document.querySelector('.position-input')
const emailInputDOM = document.querySelector('.email-input')
const btnUpdateDOM = document.querySelector('.btnUpdate')
const formAlertDOM = document.querySelector('.form-alert')





const bringUserData = async ( ) => {
    try {
        //modal.style.display = "block";
        const token = localStorage.getItem('token')
    const {
        data:{user},
    }= await axios.get(`/api/v1/users/showMe`, 
    {
        headers: {
          Authorization: `Bearer ${token}`,
        }},)
       const userID = user.userId
       // const{name, userId, role} = user
      // if(userID) {
      //  window.open(`/editProfile.html/${userID}`, "_self");
      // }
      console.log(user)
  console.log(userID)
      const {data:users} = await axios.get(`/api/v1/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }},)
        
        const {name, department, position, role, email, _id:userId} = users.user
        nameInputDOM.value = name
        departmentInputDOM.value = department
        positionInputDOM.value = position
        emailInputDOM.value = email
       // roleDOM.value = role
        btnUpdateDOM.dataset.id = userId

    }

 catch (error) {
    console.log(error)
}
}

bringUserData ()

formDOM.addEventListener('submit', async (e) => {
    formAlertDOM.classList.remove('text-success')
    //successDOM.classList.remove('text-success')
     const id=btnUpdateDOM.dataset.id
    e.preventDefault()
    const name = nameInputDOM.value
    //const password = passwordInputDOM.value
    const department = departmentInputDOM.value
    const position = positionInputDOM.value
    const email = emailInputDOM.value
    
  
  
    try {
     const token = localStorage.getItem('token')
      const { data } = await axios.patch(`/api/v1/users/${id}`, { name, department,
          position, email },  {
            headers: {
              Authorization: `Bearer ${token}`,
            }},)
  
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = data.msg
  
      formAlertDOM.classList.add('text-success')
      nameInputDOM.value = ''
     // passwordInputDOM.value = ''
      departmentInputDOM.value = ''
      positionInputDOM.value = ''
      emailInputDOM.value = ''
  
      localStorage.setItem('token', data.token)
      //resultDOM.innerHTML = ''
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = 'Update is successful'
      formAlertDOM.classList.add('text-success')
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = error.response.data.msg
      localStorage.removeItem('token')
      //resultDOM.innerHTML = ''
      //successDOM.textContent = 'no token present'
      formAlertDOM.classList.remove('text-success')
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
    }, 2000)
  })
  
