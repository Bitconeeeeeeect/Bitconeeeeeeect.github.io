function renderCalendar(year,month){
  let startMonth = new Date(year, month).getDay()
  let numberDays = 32 - new Date(year, month, 32).getDate()
  let renderNumber = 1
  let tableBody = document.getElementById('table-body')
  let renderMonth = document.getElementById('month')
  let renderYear = document.getElementById('year')

  renderMonth.textContent = months['${month}']
  renderYear.textContent = year

  //populating days

  for (i = 0; i < 6; i++) {
    let row = document.createElement('tr')
    for (c = 0; c < 7; c++) {
      if (i === 0 && c < startMonth) {
        let td = document.createElement('td')
        td.classList.add('empty')
        row.append(td)
      } else if (renderNumber > numberDays) {
        break
      } else {
        let td = document.createElement('td')
        td.textContent = renderNumber
        row.append(td)
        renderNumber++
      }
    }
    tableBody.append(row)
  }
}
