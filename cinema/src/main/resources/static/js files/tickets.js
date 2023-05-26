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
            var filmRow = "<div class='film-row'>"                   //строка filmRow содержит HTML-разметку для одного элемента фильма.
            filmRow += "<p><strong>Билет №</strong> " + "<strong>" + j + "</strong>" + "</p>"

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
            filmRow += "<p><button type='button' class='btn btn-outline-dark' onclick='drawUpdateForm(" + data[i].id + ")'>Редактировать</button></p>"
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
    .then(showTickets())
}

// const s = document.getElementById("sessions")
async function drawSessions(){
  const response = await fetch("http://localhost:8081/sessions/getAll");
  const sessions = await response.json();
  mainUL.innerHTML = " "
  if(sessions.length != 0){
    for(let i = 0;i < sessions.length;i++){
      var sessionRow = "<div class='sessionRow'>"
      sessionRow += "<p><strong>Number:</strong> " + sessions[i].id + "</p>"
      sessionRow += "<p><strong>Фильм:</strong> " + sessions[i].film.name + "</p>"
      sessionRow += "<p><strong>Зал:</strong> " + sessions[i].hall.number + "</p>"
      sessionRow += "<p><strong>Дата:</strong> " + sessions[i].start.slice(8, 10) + "." + sessions[i].start.slice(5, 7) + "." + sessions[i].start.slice(0, 4) + "</p>"
      sessionRow += "<p><strong>Начало:</strong> " + sessions[i].timeStart.slice(0, 5) + "</p>"
      sessionRow += "<p><strong>Конец:</strong> " + sessions[i].timeEnd.slice(0, 5) + "</p>"
      sessionRow += "<p><strong>Цена:</strong> " + sessions[i].price + " руб. </p>"
      sessionRow += "<button class='btn btn-outline-secondary' onclick='createTicket()'>Add Ticket</button>"
      sessionRow += "</div>"

      var li = document.createElement("li")
      li.innerHTML = sessionRow //Создается элемент li и добавляется в него содержимое filmRow
      mainUL.appendChild(li)
    }
    document.body.appendChild(mainUL); // добавляем на страницу
  }

}

const form = document.getElementById("ticketForm")
async function createTicket() {
    var line = parseInt(document.getElementById("line").value) //ряд
    var number = parseInt(document.getElementById("number").value) //место
    var session_id = parseInt(document.getElementById("session").value)
  
    if(!isNaN(session_id) && !isNaN(line) && !isNaN(number) ){
      const response = await fetch(`http://localhost:8081/seats/get/${line}/${number}`)
      const seat = await response.json()
      console.log(seat)

      if(seat.length != 0 ){
        let seat_id = getId(seat)
        console.log(seat_id)
        const data = {
              "seat": {"id":seat_id},
              "session": {"id": session_id }
            }
      console.log(data)
      fetch("http://localhost:8081/tickets/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        })
      }
    }  
    // "redirect":
    showTickets()
  }
form.addEventListener("submit", createTicket)

// function getId(data){
//   for(let i = 0; i<data.length;i++){
//       var id = data[i].id
//   }
//   return id
// }

async function showTicketsByDate(){
  const date = document.getElementById("date").value
  const response = await fetch(`http://localhost:8081/sessions/start/${date}`)
  const sessions = await response.json()
  const session_id = getId(sessions)
  console.log("nd",session_id)

  if(session_id.length != undefined){
    for(let i = 0; i < session_id.length; i ++){
      const response1 = await fetch(`http://localhost:8081/tickets/session/${session_id[i]}`)
      const ticket = await response1.json()
      console.log("t",ticket.length)
      if(ticket.length != 0){
        show(ticket,mainUL)
      }
    }
  }else{
    const response1 = await fetch(`http://localhost:8081/tickets/session/${session_id}`)
    const ticket = await response1.json()
    show(ticket,mainUL)
  }

}

function getId(data){
  const ids = []
  console.log(data.length)
  if(data.length > 1){
    for(let i = 0; i < data.length;i++){
      ids.push(data[i].id)
    }
    return ids

  }if(data.length <= 1){
    for(let i = 0; i<data.length;i++){
      var id = data[i].id
    }
    return id

    
    }
  }

async function buyTicket(id){
  console.log(id)
  const newOrder = await fetch(`http://localhost:8081/orders/add`,{
        method: "POST",
          body: JSON.stringify({}),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
        }
  )
    r = await fetch("http://localhost:8081/orders/getAll")
    const orders = await r.json() 

    for(let i = 0; i < 1; i++){
      var last_order = orders.slice(-1)
    }
    const order_id = getId(last_order)
    const data = {
      "taken":true,
      "order":{"id": order_id}
    }
    const response1 = await fetch(`http://localhost:8081/tickets/update/${id}`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
          }
    )
    .then(response => response.json())
    .then(showTickets())

}

function showBoughtTickets(){
  const taken = true
  fetch(`http://localhost:8081/tickets/gett/${taken}`)
    .then(response => response.json()) 
    .then(tickets => showBought(tickets,mainUL))
}

function showBought(data,ul){
  var j = 1
    ul.innerHTML = " ";
    for (let i = 0; i < data.length; i++) {
        if(data[i].seat != null && data[i].session != null){
            var filmRow = "<div class='film-row'>"                   //строка filmRow содержит HTML-разметку для одного элемента фильма.
            filmRow += "<p><strong>Билет №</strong> " + "<strong>" + j + "</strong>" + "</p>"

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

            filmRow += "<p><strong>Дата и время покупки: </strong></p>"
            filmRow += data[i].order.dateOfBuying.slice(8, 10) + "." + data[i].order.dateOfBuying.slice(5, 7) + "." 
            + data[i].order.dateOfBuying.slice(0, 4) + " "+ data[i].order.time.slice(0, 5) 

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

function drawUpdateForm(id){
  var rowsEdit = "<form = edit>"

  rowsEdit += "<p class='text-monospace'>Введите ряд:</p>"
  rowsEdit += " <input type = 'number' id = 'editLine'>"

  rowsEdit += "<p class='text-monospace'>Введите место:</p>"
  rowsEdit += " <input type = 'number' id = 'editNumber'>"
  
  rowsEdit += "<p class='text-monospace'>Выберете сессию:</p>"
  rowsEdit += " <input type = 'number' id = 'editSession'>"
  rowsEdit += " <button type='button' class='btn btn-outline-dark' onclick='draw()'>Выбрать сессию</button>"

  rowsEdit += "</form>"
  rowsEdit += "<button type='button' class='btn btn-outline-dark' onclick='updateTicket(" + id + ")'>Изменить</button'>"
  mainUL.innerHTML = rowsEdit 
}

async function draw(){
  const response = await fetch("http://localhost:8081/sessions/getAll");
  const sessions = await response.json();
  // mainUL.innerHTML = " "
  if(sessions.length != 0){
    for(let i = 0;i < sessions.length;i++){
      var sessionRow = "<div class='sessionRow'>"
      sessionRow += "<p><strong>Number:</strong> " + sessions[i].id + "</p>"
      sessionRow += "<p><strong>Фильм:</strong> " + sessions[i].film.name + "</p>"
      sessionRow += "<p><strong>Зал:</strong> " + sessions[i].hall.number + "</p>"
      sessionRow += "<p><strong>Дата:</strong> " + sessions[i].start.slice(8, 10) + "." + sessions[i].start.slice(5, 7) + "." + sessions[i].start.slice(0, 4) + "</p>"
      sessionRow += "<p><strong>Начало:</strong> " + sessions[i].timeStart.slice(0, 5) + "</p>"
      sessionRow += "<p><strong>Конец:</strong> " + sessions[i].timeEnd.slice(0, 5) + "</p>"
      sessionRow += "<p><strong>Цена:</strong> " + sessions[i].price + " руб. </p>"
      sessionRow += "</div>"

      var li = document.createElement("li")
      li.innerHTML = sessionRow //Создается элемент li и добавляется в него содержимое filmRow
      mainUL.appendChild(li)
    }
    document.body.appendChild(mainUL); // добавляем на страницу
  }
}

async function updateTicket(id){
  const response = await fetch(`http://localhost:8081/tickets/get/${id}`)
  const ticket = await response.json()
  console.log(ticket)

  let seat_id = ticket.seat.id
  let session_id = ticket.session.id
  

  const editLine = parseInt(document.getElementById("editLine").value)
  const editNumber = parseInt(document.getElementById("editNumber").value )
  const editSession = parseInt(document.getElementById("editSession").value)
  


  if (!isNaN(editLine) && !isNaN(editNumber)){
    const response = await fetch(`http://localhost:8081/seats/get/${editLine}/${editNumber}`)
    const seat = await response.json()
     if(seat.length != 0){
      seat_id = getId(seat)
     }
  }

  if(!isNaN(editSession)){
    session_id = editSession
  }

  const data = JSON.stringify({
    "seat": {"id":seat_id},
    "session": {"id": session_id }
  })
  console.log(data)
  await fetch(`http://localhost:8081/sessions/update/${id}`,{
  
          method: "PUT",
          body: data,
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }

  })
  showTickets()


}