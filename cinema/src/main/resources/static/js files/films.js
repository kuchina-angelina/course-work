// import tickets.js

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
    console.log(data.length)
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
    .then(tickets => console.log(tickets))
}
