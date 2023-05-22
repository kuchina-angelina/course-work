function showTickets() {
    fetch("http://localhost:8081/tickets/getAll")
    .then(response => response.json()) 
    .then(tickets => show(tickets,mainUL))
}

const mainUL = document.getElementById("tickets") // <ol> - циферки ul -  точки
// находит элемент HTML страницы с идентификатором "script" и сохраняет его в константу mainUL. 
function show(data, ul) { //ul - элемент списка, в который будут добавлены фильмы
    var j = 1
    ul.innerHTML = " ";
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
                filmRow += "<p><strong>Фильм:</strong>" + data[i].session.film.name + ", " + data[i].session.film.duration + "</p>"
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
                continue
            }
    }
    document.body.appendChild(mainUL); // добавляем на страницу
    console.log(data);
}

function deleteTicket(id) {
    fetch(`http://localhost:8081/tickets/delete/${id}`, {
        method: "DELETE"
        }
    )
    // .then(response => response.json()) 
    .then(showFilms())
}


const form = document.getElementById("ticketForm")
function createTicket() {
    // const taken = document.getElementById("taken").checked;
    var hall = parseInt(document.getElementById("hall").value) // номер зала
    var line = parseInt(document.getElementById("line").value)
    var name = document.getElementById("name").value
  
    const data = {
      seat: { line: line },
      session: { film: name },
    };
  
    fetch("http://localhost:8081/tickets/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Ticket created successfully");
      })
      .catch(error => {
        console.error("Error creating ticket:", error);
      });
  }
  
// async function addTicket(event) {
//     event.preventDefault(); // ??

//     var name = document.getElementById("name").value //название фильма
//     var hall = parseInt(document.getElementById("hall").value) // номер зала
//     var line = parseInt(document.getElementById("line").value) //ряд
//     var number = parseInt(document.getElementById("number").value) //место

//     if (name.length != 0 && !isNaN(hall) && !isNaN(line) && !isNaN(number) ){ //проверка того, чтобы поля ввода не были пустыми
//         console.log("if")
//         film = fetch(`http://localhost:8081/films/name/${name}`)
//         console.log(film)
//         // var data = JSON.stringify({
//         //     // "seat": {"line": line, "number": number}, 
//         //     "session":{"film": film}

//     // }) 
//         await fetch('http://localhost:8081/tickets/add', {
//             method: "POST",
//             body: JSON.stringify({
//                 // "seat": {"line": line, "number": number}, 
//                 "session":{"film": film}}),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             }
//         })  
//     }else{
//         console.log("else")
//         const error = document.getElementById("error") //строка filmRow содержит HTML-разметку для одного элемента фильма.
//         var rows = "<div id = showError>"
//         rows += "<ul class = 'list-group'><li class = 'list-group-item list-group-item-warning'>Некорректный ввод данных</li></ul>"
//         rows += "</div>"
//         error.innerHTML = rows; //Создается элемент li и добавляется в него содержимое rows
//     } 
// }  

form.addEventListener("submit", createTicket)
