const formDOM = document.querySelector('.form')

const passwordInputDOM = document.querySelector('.password-input')

const oldPasswordInputDOM = document.querySelector('.old-password-input')

const formAlertDOM = document.querySelector('.form-alert')
//const resultDOM = document.querySelector('.result')
//const btnDOM = document.querySelector('#data')
//const successDOM = document.querySelector('.sucess')

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  formAlertDOM.classList.remove('text-success')
  //successDOM.classList.remove('text-success')
  try {
  const token = localStorage.getItem('token')
  const {
      data:{user},
  }= await axios.get(`/api/v1/users/showMe`, 
  {
      headers: {
        Authorization: `Bearer ${token}`,
      }},)
     const userID = user.userId
     console.log(userID)

 
  
  const newPassword = passwordInputDOM.value
  
  const oldPassword = oldPasswordInputDOM.value



 
    const { data:userPassword } = await axios.patch(`/api/v1/users/updatePassword`, {  oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }},
    )
 //console.log(data)
    //formAlertDOM.style.display = 'block'
   // formAlertDOM.textContent = error.msg

   // formAlertDOM.classList.add('text-success')
    
    //passwordInputDOM.value = ''
   
    //oldPasswordInputDOM.value = ''

    //localStorage.setItem('token', data.token)
    //resultDOM.innerHTML = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Password updated'
    formAlertDOM.classList.add('text-success')
   //window.location.href = "/users/users.html"
    //console.log('token')
    
    //
  } catch (error) {
    //formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.response.data.msg
    //localStorage.removeItem('token')
    //resultDOM.innerHTML = ''
    //successDOM.textContent = 'no token present'
    formAlertDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)
})
