/*
**
 */


$(async function (){
    await loadTable();
});

 async function loadTable() {
    const table = $('#AllUsers');
    table.empty();
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(ussr => {
            let data = `$(
                 <tr>
                     <td> ${ussr.id} </td>
                     <td> ${ussr.name} </td>
                     <td> ${ussr.surname} </td>
                     <td> ${ussr.age} </td>
                     <td> ${ussr.username} </td>
                     <td> ${ussr.roles.map( role => " " + role.role.substring(5)) } </td>
                     <td>  <button type="button" class="btn btn-danger" data-toggle="modal">Delete</button> </td>
                     <td> <button type="button" class="btn btn-danger" data-toggle="modal" >Delete</button>  </td>
                  </tr>)`;

            table.append(data);
            })
                .catch((error) =>{
                    alert("not Оk");
                    })
        })}
// let response = await fetch('/api/users');
//
// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//                    // получаем тело ответа (см. про этот метод ниже)
//     let table = await response.json();
//     alert("Оk: " + response.status);
// } else {
//     alert("Ошибка HTTP: " + response.status);
// }

// fetch("/api/users").then(
//     res => {
//         res.json().then(
//             users => {
//                 console.log(users.data);
//                 if (users.data.length > 0) {
//
//                     var temp = "";
//                     users.data.forEach((itemData) => {
//                         temp += "<tr>";
//                         temp += "<td>" + itemData.id + "</td>";
//                         temp += "<td>" + itemData.name + "</td>";
//                         temp += "<td>" + itemData.surname + "</td></tr>";
//                         temp += "<td>" + itemData.username + "</td></tr>";
//                         temp += "<td>" + itemData.age + "</td></tr>";
//                     });
//                     document.getElementById('user').innerHTML = temp;
//                 }
//             }
//         )
//     }
// )






// async function loadTable(url, table){
//     const tableHead = table.querySelector("thead");
//     const tableBody = table.querySelector("tbody");
//     const response = await fetch(url);
//     const data = await response.json();
//
//     console.log(data);
// }






//
// fetch('api/users').then((data)=>{
//     return data.json();
// }).then((objectData) =>{
//     console.log(objectData[0].id);
//     let tableData="";
//     objectData.map((values)=>{
//         tableData= '<h1>${values.id}</h1>';
//     });
//     document.getElementById("allTable").innerHTML=tableData;
// } )