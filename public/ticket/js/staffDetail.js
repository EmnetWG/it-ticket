const defaultStatsDOM = document.querySelector('.defaultStats')
const monthlyApplicationsDOM = document.querySelector('.statList')
const pendingStatDOM = document.querySelector('.pending-stat')
const acceptedStatDOM = document.querySelector('.accepted-stat')
const selectDOM = document.querySelector('.selectTicketAssignedTo')

const bringStaffName = async () => {
    try {
        const token = localStorage.getItem('token')
          const {data:{users}} = await axios.get(`/api/v1/users/ITStaff`,
          {
              headers: {
                Authorization: `Bearer ${token}`,
              }},
           )

           if (users.length < 1) {
            selectDOM.innerHTML = '<h5 class="empty-list">No users in your list</h5>'
            //loadingDOM.style.visibility = 'hidden'
            return
          }
        //console.log({users})
        const allUsers = users
        .map((user) => {
        const {name,  _id:userID} = user
        return `
        <option data-id="${userID}">${name}</option>`
    })
    .join('')
    selectDOM.insertAdjacentHTML('beforeend', allUsers)

        } 
     catch(error) {
            console.log(error)
        }
   

}

bringStaffName ()

selectDOM.addEventListener('change', async (event) => {

    try {
        const id = event.target.options[event.target.selectedIndex].dataset.id
        //const id = e.target.dataset.id
  const token = localStorage.getItem('token')
    const {data:{defaultStats, monthlyApplications},} = await axios.get(`/api/v1/tickets/${id}/staffDetail`,
    {
        headers: {
          Authorization: `Bearer ${token}`,
        }},
     )
     console.log({defaultStats, monthlyApplications})
     pendingStatDOM.innerHTML=defaultStats.pending 
     acceptedStatDOM.innerHTML=defaultStats.accepted
     if (monthlyApplications.length < 1) {
      monthlyApplicationsDOM.innerHTML = '<h5 class="empty-list">No tickets in your list</h5>'
      //loadingDOM.style.visibility = 'hidden'
      return
    }
  
    //const ticketsFilter = tickets.filter(item => item.approval=='approved')
  
  //console.log({tickets})
  const allStats = monthlyApplications
  .map((stat) => {
  var {date, category, count} = stat
  
  
  return `<tr>
  <td>${date}</td>
  <td>${category}</td>
  <td>${count}</td>
  
  
  
  
  </tr>`
  })
  .join('')
  monthlyApplicationsDOM.innerHTML = allStats   
  
 
    
}
catch(error) {
    console.log(error)
}
} )



//showStats ()