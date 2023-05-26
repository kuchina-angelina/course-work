const form = document.getElementById("sessionForm")

function showSessions(){
    fetch("http://localhost:8081/sessions/getAll")
    .then(response => response.json())
    .then(sessions => show(mainUL,sessions))
}
const mainUL = document.getElementById("script") // <ol> - циферки ul -  точки
function show(ul, data){
  ul.innerHTML = " "
  if(data.length != 0){
    for(let i = 0;i < data.length;i++){
      console.log(data[i])
      var sessionRow = "<div class='sessionRow'>"
      sessionRow += "<p><strong>Фильм:</strong> " + data[i].film.name + "</p>"
      sessionRow += "<p><strong>Дата:</strong> " + data[i].start.slice(8, 10) + "." + data[i].start.slice(5, 7) + "." + data[i].start.slice(0, 4) + "</p>"
      sessionRow += "<p><strong>Начало:</strong> " + data[i].timeStart.slice(0, 5) + "</p>"
      sessionRow += "<p><strong>Конец:</strong> " + data[i].timeEnd.slice(0, 5) + "</p>"
      sessionRow += "<p><strong>Зал:</strong> " + data[i].hall.number + "</p>"

      sessionRow += "<p><strong>Цена:</strong> " + data[i].price + " руб. </p>"
      sessionRow += "<p><button type='button' class='btn btn-outline-dark' onclick='deleteSession(" + data[i].id + ")'>Delete</button></p>"
      sessionRow += "<p><button type='button' class='btn btn-outline-dark' onclick='drawUpdateForm(" + data[i].id + ")'>Редактировать</button></p>"


      var li = document.createElement("li")
      li.innerHTML = sessionRow //Создается элемент li и добавляется в него содержимое filmRow
      mainUL.appendChild(li)
    }
    document.body.appendChild(mainUL); // добавляем на страницу
  }else{
    // const error = document.getElementById("error") //строка filmRow содержит HTML-разметку для одного элемента фильма.
        var rows = "<div id = showError>"
        rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Информация не найдена</li></ul>"
        rows += "</div>"
        mainUL.innerHTML = rows;
  }
}

function showSessionsByDate(){
    const start = document.getElementById("start").value
    console.log(start)
    fetch(`http://localhost:8081/sessions/start/${start}`)
    .then(response => response.json())
    .then(sessions => show(mainUL,sessions))
}

async function showSessionsByFilm(){
  const name = document.getElementById("film").value
  const response = await fetch(`http://localhost:8081/films/name/${name}`)
  const film =  await response.json()
  const film_id = getId(film)

  fetch(`http://localhost:8081/sessions/film/${film_id}`)
  .then(response => response.json())
  .then(sessions => show(mainUL,sessions))

}

async function addSession(event) {
    event.preventDefault();

    //извлекаем данные, которые ввели на странице
    const name = document.getElementById("name").value
    const hall = document.getElementById("hall").value
    const price = document.getElementById("price").value
    const timeString = document.getElementById("timeStart").value
    const dateStart = document.getElementById("dateStart").value

    // преобразование времени из строки
    let timeParts = timeString.split(":") //сплит по двоеточию: на часы и минуты
    let hours = Number(timeParts[0]) //часы
    let minutes = Number(timeParts[1]) //минуты

    let timeStart = `${hours}:${minutes}:00` //переменная, которая добавится в БД
    // console.log("*",timeStart)
  
    if (name.length != 0 ){ 
      const response = await fetch(`http://localhost:8081/films/name/${name}`)
      const film = await response.json()

      const response2 = await fetch(`http://localhost:8081/halls/getn/${hall}`)
      const halls = await response2.json()

      if(film.length != 0 && halls.length != 0){
        //берем айди фильма и зала, чтобы добавить в бд
        const film_id = getId(film)
        const hall_id = getId(halls)

        // расчет для определения окончания сеанса, идея такая: берем часы и минуты начала сеанса и прибавляем время фильма + 10 минут рекламы
        console.log(film)
        for (let i = 0; i< film.length; i++){
          console.log(film[i].duration)
          var hoursEnd = parseInt(film[i].duration)/60
          var minutesEnd = (hoursEnd - parseInt(JSON.stringify(hoursEnd).charAt(0))) * 60
          console.log(Math.floor(hoursEnd))
          console.log(Math.round(minutesEnd))
        }
        var finalHours = Math.floor(hoursEnd) + hours
        var finalMinutes = Math.round(minutesEnd) + minutes + 10
        while (finalMinutes >= 60){
          finalHours += 1
          finalMinutes -= 60
        }
        var timeEnd = `${finalHours}:${finalMinutes}:00` 
        console.log(timeEnd)

        const data = JSON.stringify({
          "film": {"id": film_id},
          "hall":{"id":hall_id},
          "price":price,
          "start":dateStart,
          "timeStart":timeStart,
          "timeEnd":timeEnd
        })
      
        console.log(data)
        await fetch('http://localhost:8081/sessions/add', {
              method: "POST",
              body: data,
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
                      }
              })  
        }else{
            const error = document.getElementById("error")
            var rows = "<div id = showError>"
            rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Данный фильм не найден!</li></ul>"
            rows += "</div>"
            error.innerHTML = rows;
        }
    }else{
        const error = document.getElementById("error")
        var rows = "<div id = showError>"
        rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Все поля обязательны для ввода!</li></ul>"
        rows += "</div>"
        error.innerHTML = rows;
    }
  } 
form.addEventListener("submit", addSession)

function getId(data){
    for(let i = 0; i<data.length;i++){
        var id = data[i].id
    }
    return id
}

function deleteSession(id) {
  fetch(`http://localhost:8081/sessions/delete/${id}`, {
      method: "DELETE"
      }
  )
  .then(showSessions())
}

function drawUpdateForm(id){
  var rowsEdit = "<form = edit>"
  rowsEdit += "<p class='text-monospace'>Введите название фильма:</p>"
  rowsEdit += " <input type = 'text' id = 'editName'>"

  rowsEdit += "<p class='text-monospace'>Введите дату показа фильма:</p>"
  rowsEdit += " <input type = 'date' id = 'editStart'>"

  rowsEdit += "<p class='text-monospace'>Введите время начала:</p>"
  rowsEdit += " <input type = 'time' id = 'editTime'>"

  rowsEdit += "<p class='text-monospace'>Введите зал:</p>"
  rowsEdit += " <p><input type = 'number' id = 'editHall'></p>"

  rowsEdit += "<p class='text-monospace'>Введите цену:</p>"
  rowsEdit += " <p><input type = 'number' id = 'editPrice'></p>"

  rowsEdit += "</form>"
  rowsEdit += " <button type='button' class='btn btn-outline-dark' onclick='updateSession(" + id + ")'>Изменить</button'>"

  mainUL.innerHTML = rowsEdit 
}

async function updateSession(id){
  const response = await fetch(`http://localhost:8081/sessions/get/${id}`)
  const session = await response.json()
  console.log(session)

  let film_id = session.film.id
  let hall_id = session.hall.id
  let start = session.start
  let name = session.film.name
  let timeStart = session.timeStart
  let timeEnd = session.timeEnd
  let hall = session.hall.number
  let price = session.price

  const editStart = document.getElementById("editStart").value
  const editName = document.getElementById("editName").value //fk
  const editTime = document.getElementById("editTime").value
  const editHall = parseInt(document.getElementById("editHall").value)//fk
  const editPrice = document.getElementById("editPrice").value


  if (editStart.length != 0){
      start = editStart
  }

  if(editTime.length != 0){
      let timeParts = editTime.split(":") 
      let hours = Number(timeParts[0]) 
      let minutes = Number(timeParts[1])
      timeStart = `${hours}:${minutes}:00`

      dur = session.film.duration
      var hoursEnd = parseInt(dur)/60
      var minutesEnd = (hoursEnd - parseInt(JSON.stringify(hoursEnd).charAt(0))) * 60
      console.log(Math.floor(hoursEnd))
      console.log(Math.round(minutesEnd))
      
      var finalHours = Math.floor(hoursEnd) + hours
      var finalMinutes = Math.round(minutesEnd) + minutes + 10

      while (finalMinutes >= 60){
        finalHours += 1
        finalMinutes -= 60
      }
      timeEnd = `${finalHours}:${finalMinutes}:00` 
      console.log(timeEnd)
  }

  if(!isNaN(editPrice)){
    price = editPrice
  }

  if(!isNaN(editHall)){
    const response2 = await fetch(`http://localhost:8081/halls/getn/${editHall}`)
    const halls = await response2.json()

    if( halls.length != 0){
      hall_id = getId(halls)
    }
    else{

    }
  }

  if(editName.length != 0){
    const response = await fetch(`http://localhost:8081/films/name/${editName}`)
    const film = await response.json()
    console.log(film)

    if(film.length != 0){
      film_id = getId(film)    
    }
    else{
      const eF = document.getElementById("error")
      var rows = "<div id = showError>"
      rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Данный фильм не найден!</li></ul>"
      rows += "</div>"
      eF.innerHTML = rows
        
    }
  }



  const data = JSON.stringify({
    "film": {"id": film_id}, 
    "hall":{"id":hall_id},
    "price":price,
    "start":start,
    "timeStart":timeStart,
    "timeEnd":timeEnd
  })
  console.log(data)
  await fetch(`http://localhost:8081/sessions/update/${id}`,{
  
          method: "PUT",
          body: data,
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }

  })
  showSessions()


  }
