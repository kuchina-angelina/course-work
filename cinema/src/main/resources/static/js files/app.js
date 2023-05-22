const form = document.getElementById("sessionForm")

async function addFilm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value
    const hall = document.getElementById("hall").value
    const price = document.getElementById("price").value
    const timeString = (document.getElementById("timeStart").value)

    let timeParts = timeString.split(":")
    console.log("hjhj",timeParts)
    let hours = Number(timeParts[0])
    let minutes = Number(timeParts[1])
    time = new Date()
    time.setHours(hours,[minutes])

    var h = time.getHours() 
    var m = time.getMinutes()
    // console.log("Time", timeStart)
    let timeStart = `${h}:${m}`
    console.log("Time", typeof(timeStart))
  
    if (name.length != 0){ 
      const response = await fetch(`http://localhost:8081/films/name/${name}`)
      const film = await response.json()

      const response2 = await fetch(`http://localhost:8081/halls/getn/${hall}`)
      const halls = await response2.json()

      

      if(film.length != 0 && halls.length != 0){
        const film_id = getId(film)
        const hall_id = getId(halls)

      const data = JSON.stringify({
        "film": {"id": film_id},
        "hall":{"id":hall_id},
        "price":price,
        "timeStart":timeStart
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
        rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Поле Название фильма обязательно для ввода!</li></ul>"
        rows += "</div>"
        error.innerHTML = rows;
    }
  }

      
  
    //     
    // }else{
    //     console.log("else")
    //     const error = document.getElementById("error") //строка filmRow содержит HTML-разметку для одного элемента фильма.
    //     var rows = "<div id = showError>"
    //     rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Некорректный ввод данных</li></ul>"
    //     rows += "</div>"
    //     error.innerHTML = rows; //Создается элемент li и добавляется в него содержимое rows
   
form.addEventListener("submit", addFilm)

function getId(data){
    for(let i = 0; i<data.length;i++){
        var id = data[i].id
    }
    return id
}