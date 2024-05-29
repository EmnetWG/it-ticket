
const defaultStatsDOM = document.querySelector('.defaultStats')
const monthlyApplicationsDOM = document.querySelector('.statList')
const pendingStatDOM = document.querySelector('.pending-stat')
const acceptedStatDOM = document.querySelector('.accepted-stat')

const showStats = async () => {

    try {
  const token = localStorage.getItem('token')
    const {data:{defaultStats, monthlyApplications},} = await axios.get(`/api/v1/tickets/staffStats`,
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
}


showStats ()