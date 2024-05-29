const formDOM = document.querySelector('.form')

const passwordInputDOM = document.querySelector('.password-input')

const emailInputDOM = document.querySelector('.email-input')

const formAlertDOM = document.querySelector('.form-alert')
//const resultDOM = document.querySelector('.result')
//const btnDOM = document.querySelector('#data')
//const successDOM = document.querySelector('.sucess')

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  //successDOM.classList.remove('text-success')

  e.preventDefault()
  
  const password = passwordInputDOM.value
  
  const email = emailInputDOM.value



  try {
    const { data } = await axios.post('/api/v1/auth/login', {  email, password })
 console.log(data)
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = data.msg

    formAlertDOM.classList.add('text-success')
    
    passwordInputDOM.value = ''
   
    emailInputDOM.value = ''

    localStorage.setItem('token', data.token)
    //resultDOM.innerHTML = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Logged in'
    formAlertDOM.classList.add('text-success')
   //window.location.href = "/users/users.html"
    //console.log('token')
    if(data.user.role=="supervisor") {
      window.open("ticket/allTickets.html", '_self')
    }

    if(data.user.role=="manager") {
      window.open("ticket/department.html", '_self')
    }

    if(data.user.role=="IT staff") {
      window.open("ticket/staffTicket.html", '_self')
    }

    if(data.user.role=="user") {
      window.open("ticket/userTicket.html", '_self')
    }
    //
  } catch (error) {
    //formAlertDOM.style.display = 'block'
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
