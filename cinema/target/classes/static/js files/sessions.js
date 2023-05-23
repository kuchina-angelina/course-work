const form = document.getElementById("sessionForm")

function showSessions(){
    fetch("http://localhost:8081/sessions/getAll")
    .then(response => response.json())
    .then(sessions => console.log(sessions))
}

function showSessionsByToday(){
    var date = new Date()
    console.log(date)
    console.log(date.getMonth())
    console.log(date.getFullYear())

    // fetch(`http://localhost:8081/sessions/start/${start}`)
    // .then(response => response.json())
    // .then(sessions => console.log(sessions))
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
    console.log("*",timeStart)
  
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


        var timeEnd = `${Math.floor(hoursEnd)+hours}:${Math.round(minutesEnd)+minutes}:00` 

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