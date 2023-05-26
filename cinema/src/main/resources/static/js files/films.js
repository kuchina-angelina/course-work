function showFilms() { //функция для отображения всех фильмов
    fetch("http://localhost:8081/films/getAll")
    .then(response => response.json()) 
    .then(films => show(films,mainUL))
}

function showFilmsByName(){ //функция для поиска фильма по названию
    const name = document.getElementById("name").value
    fetch(`http://localhost:8081/films/name/${name}`)
    .then(response => response.json()) 
    .then(names => show(names,mainUL))
}

function showFilmsByGenre(){ //функция для поиска фильма по жанру
    const genre = document.getElementById("genre").value
    if (genre != null){
        fetch(`http://localhost:8081/films/genre/${genre}`)
    .then(response => response.json()) 
    .then(genres => show(genres,mainUL))
    }
    
}

//функция для отрисовки фильмов
const mainUL = document.getElementById("script") // <ol> - циферки ul -  точки
// находит элемент HTML страницы с идентификатором "script" и сохраняет его в константу mainUL. 
function show(data, ul) { //ul - элемент списка, в который будут добавлены фильмы
    ul.innerHTML = " "
    if(data.length != 0){
        for (let i = 0; i < data.length; i++) {
        var filmRow = "<div class='film-row'>" //строка filmRow содержит HTML-разметку для одного элемента фильма.
        filmRow += "<p><strong>Название:</strong> " + data[i].name + "</p>"
        var hours = parseInt(data[i].duration)/60
        var minutes = (hours - parseInt(JSON.stringify(hours).charAt(0))) * 60
        
        if(JSON.stringify(hours).charAt(0) == 1){
            filmRow += "<p><strong>Длительность:</strong> " + Math.floor(hours) + " час " +  Math.round(minutes) +" мин.</p>"
        }
        else{
            filmRow += "<p><strong>Длительность:</strong> " + Math.floor(hours) + " часа " + Math.round(minutes) +" мин.</p>"            
        }

        filmRow += "<p><strong>Жанр:</strong> " + data[i].genre + "</p>"
        filmRow += "<p><button type='button' class='btn btn-outline-dark' onclick='deleteFilm(" + data[i].id + ")'>Delete</button></p>"
        // filmRow += "<p><button type='button' class='btn btn-outline-dark' onclick='updateFilm("+ data[i].id + ")' >Редактировать</button></p>"
        filmRow += "<p><button type='button' class='btn btn-outline-dark' onclick='drawUpdateForm("+ data[i].id + ")' >Редактировать</button></p>"
        filmRow += "<button type='button' class='btn btn-outline-dark' onclick='showTicketsByName("+ data[i].id + ")' >Билеты</button>"

        filmRow += "<p><strong></strong></p>"
        filmRow += "</div>"
        var li = document.createElement("li");
        li.innerHTML = filmRow; //Создается элемент li и добавляется в него содержимое filmRow
        mainUL.appendChild(li);
    }
    document.body.appendChild(mainUL); // добавляем на страницу
    console.log(data);
  }else{
    const error = document.getElementById("error") //строка filmRow содержит HTML-разметку для одного элемента фильма.
        var rows = "<div id = showError>"
        rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Некорректный ввод данных</li></ul>"
        rows += "</div>"
        error.innerHTML = rows;
  }
    }
    
function deleteFilm(id) {
    fetch(`http://localhost:8081/films/delete/${id}`, {
        method: "DELETE"
        }
    )
    .then(showFilms())
}

const form = document.getElementById("filmForm")
async function addFilm(event) {
    event.preventDefault(); // ??

    var name = document.getElementById("name").value
    var duration = parseInt(document.getElementById("duration").value) // делаем из строки число -> если были введены не цифры, то выведется сообщение об этом
    var genre = document.getElementById("genre").value

    if (name.length != 0 && genre.length != 0 && !isNaN(duration)){ //проверка того, чтобы поля ввода не были пустыми
        var data = JSON.stringify({"name": name,"duration":duration,"genre":genre})
        await fetch('http://localhost:8081/films/add', {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })  
    }else{
        console.log("else")
        const error = document.getElementById("error") //строка filmRow содержит HTML-разметку для одного элемента фильма.
        var rows = "<div id = showError>"
        rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Некорректный ввод данных</li></ul>"
        rows += "</div>"
        error.innerHTML = rows; //Создается элемент li и добавляется в него содержимое rows
    }   
}
form.addEventListener("submit", addFilm)

function showTicketsByName (id){
    fetch(`http://localhost:8081/tickets/get/ticket/${id}`)
    .then(response => response.json()) 
    .then(tickets => showTickets(tickets, mainUL))
}

function showTickets(data, ul){
    ul.innerHTML = " "
    var j = 1
    if(data.length != 0){
        for (let i = 0; i < data.length; i++) {
            if(data[i].seat != null && data[i].session != null && data[i].taken == false){
                var filmRow = "<div class='film-row'>"; //строка filmRow содержит HTML-разметку для одного элемента фильма.
                // filmRow += "<p><strong>Название:</strong> " + data[i].taken + "</p>";
                filmRow += "<p><strong>Билет №</strong> " + "<strong>" + j + "</strong>" + "</p>"
                // filmRow += "<p><strong>Билет №</strong> " +  j + "</p>"
    
                if(data[i].session.hall != null ){
                    filmRow += "<p><strong>Зал: </strong>" + data[i].session.hall.number + "</p>"
                    }
    
                if (data[i].seat.line != null && data[i].seat.number != null){
                    filmRow += "<p><strong>Ряд: </strong>"+ data[i].seat.line + "<strong> Место: </strong> " + data[i].seat.number + "</p>"
                }
    
                if (data[i].session.film != null){
                    filmRow += "<p><strong>Фильм:</strong>" + data[i].session.film.name + ", " + data[i].session.film.duration + " мин.</p>"
                    filmRow += "<p><strong>Жанр:</strong>" + data[i].session.film.genre + "</p>"
    
                }
                filmRow += "<p><strong>Начало сеанса: </strong>" + data[i].session.timeStart.slice(0, 5) + "</p>" //вывести только часы и минуты
                filmRow += "<p><strong>Конец сеанса: </strong>" + data[i].session.timeEnd.slice(0, 5) + "</p>"
                filmRow += "<p><strong>Цена: </strong>" + data[i].session.price + " руб.</p>"
    
                filmRow += "<p><button type='button' class='btn btn-outline-dark' onclick='deleteTicket(" + data[i].id + ")'>Delete</button></p>"
                filmRow += "<p><button type='button' class='btn btn-outline-dark' onclick='buyTicket(" + data[i].id + ")'>Купить</button></p>"
                filmRow += "<p><strong></strong></p>"
                filmRow += "</div>"
                j += 1
    
                var li = document.createElement("li");
                li.innerHTML = filmRow  //Создается элемент li и добавляется в него содержимое filmRow
                mainUL.appendChild(li)
                }
    
                else {
                    // const error = document.getElementById("error") //строка filmRow содержит HTML-разметку для одного элемента фильма.
                    // var rows = "<div id = showError>"
                    // rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Некорректный ввод данных</li></ul>"
                    // rows += "</div>"
                    // error.innerHTML = rows;
                    continue
                }
        }

    }

}

async function drawUpdateForm(id){
    var rowsEdit = "<form = edit>"
    rowsEdit += "<p class='text-monospace'>Введите название фильма</p>"
    rowsEdit += " <input type = 'text' id = 'editName'>"

    rowsEdit += "<p class='text-monospace'>Введите жанр фильма</p>"
    rowsEdit += " <input type = 'text' id = 'editGenre'>"

    rowsEdit += "<p class='text-monospace'>Введите длительность фильма</p>"
    rowsEdit += " <input type = 'number' id = 'editDuration'>"
    rowsEdit += "</form>"
    rowsEdit += " <button type='button' class='btn btn-outline-dark' onclick='updateFilm(" + id + ")'>Изменить</button'>"

    mainUL.innerHTML = rowsEdit 
}

async function updateFilm(id){
    const response = await fetch(`http://localhost:8081/films/get/${id}`)
    const film = await response.json()
    console.log(film)

    let name = film.name
    let duration = film.duration
    let genre = film.genre

    const editName = document.getElementById("editName").value
    const editGenre = document.getElementById("editGenre").value
    const editDuration = parseInt(document.getElementById("editDuration").value)

    if (editName.length != 0){
        name = editName
    }
    if(editGenre.length != 0){
        genre = editGenre
    }
    if(!isNaN(editDuration)){
        duration = editDuration
    }

    var data = JSON.stringify({
        "name": name,
        "duration":duration,
        "genre":genre
    })
    console.log(data)
    await fetch(`http://localhost:8081/films/update/${id}`,{
    
            method: "PUT",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        

    })
    showFilms()


}
