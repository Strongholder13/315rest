/*
**
 */


$(async function (){
    await loadTable();

    await getCurrent();

});

const fetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },

    findAllRoles: async () => await fetch('api/roles'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    GetForDel: async (id) => await fetch (`api/users/${id}`, {credentials: 'include', method: 'DELETE', headers: fetchService.head}),
    updateUserById: async (user) => await fetch(`api/users`, {
        credentials: 'include',
        method: 'PATCH',
        headers: fetchService.head,
        body: JSON.stringify(user)
    })

}


function getCurrent(){
    fetch(`/api/user`)
        .then(resp => resp.json())
        .then(data => {

            $('#currentUsername').append(data.username);
           let roles = data.roles.map(role => " " + role.role.substring(5));
            $('#currentRoles').append(roles);

            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.surname}</td>
                <td>${data.age}</td>
                <td>${data.username}</td>
                <td>${roles}</td>
             </tr>)`;
            $('#currentUser').append(user);
        })
        .catch((error) => {
            alert(error);
        });
}

function loadTable() {
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
                     <td>  <button type="button" onclick="GetForEd(${ussr.id})" class="btn btn-info" data-toggle="modal" id="EditBtn" data-action="edit" data-target="#edit" data-id="${ussr.id}" >Edit</button> </td>
                     <td> <button type="button" onclick="GetForDel(${ussr.id})" class="btn btn-danger" data-toggle="modal" id="DeleteBtn" data-action="delete" data-target="#delete" data-id="${ussr.id}">Delete</button>  </td>
                  </tr>)`;

            table.append(data);
            })
                .catch((error) =>{
                    alert("not Оk");
                    })
        })}

function GetForDel(id) {
    fetchService.findOneUser(id)
        .then(response => {
            response.json()
                .then(user => {
                        $('#delID').val(user.id)
                        $('#delName').val(user.name)
                        $('#delSN').val(user.surname)
                        $('#delAge').val(user.age)
                        $('#delUname').val(user.username)
                        $('#delRole').empty()
                    }
                )
        })

}

function Delete() {
    let id = document.getElementById('delID').value;
    document.forms["DeleteForm"].addEventListener("submit", event => {
        event.preventDefault();
        fetchService.GetForDel(id)


            .then(() => {
                loadTable()
                $('#deleteModalCloseButton').click();
            })
    })
}

function GetForEd(id) {
    fetchService.findOneUser(id)
        .then(response => {
            response.json()
                .then(user => {
                        $('#edID').val(user.id)
                        $('#e-name').val(user.name)
                        $('#e-surname').val(user.surname)
                        $('#edit-age').val(user.age)
                        $('#e-username').val(user.username)
                    $('#edit-password').empty()
                        $('#e-Role').empty();
                fetchService.findAllRoles()
                    .then(res => res.json())
                    .then(roles => {
                        roles.forEach(role => {
                            let selectedRole = false;
                            for (let i = 0; i < user.roles.length; i++) {
                                if (user.roles[i].role === role.role) {
                                    selectedRole = true;
                                    break;
                                }
                            }
                            let el = document.createElement("option");
                            el.text = role.role.substring(5);
                            el.value = role.id;
                            if (selectedRole) el.selected = true;
                            $('#e-Role')[0].appendChild(el);
                        })
                    })
            })
        })
}

document.forms["editForm"].addEventListener("submit", ev => {
    ev.preventDefault();
    let editUserRoles = [];
    for (let i = 0; i < document.forms["editForm"].roles.options.length; i++) {
        if (document.forms["editForm"].roles.options[i].selected) editUserRoles.push({
            id: document.forms["editForm"].roles.options[i].value,
            role: 'ROLE_' + document.forms["editForm"].roles.options[i].text
        })
    }
    let user = {
        id: document.getElementById('edID').value,
        name: document.getElementById('e-name').value,
        surname: document.getElementById('e-surname').value,
        age: document.getElementById('edit-age').value,
        username: document.getElementById('e-username').value,
        password: document.getElementById('edit-password').value,
        roles: editUserRoles
    };
    fetchService.updateUserById(user).then(() => {
        $('#editModalCloseButton').click();
        loadTable()
    })

})

$(async function() {
    await newUser();
});

const tabTrigger = new bootstrap.Tab(document.getElementById('nav-home-tab'));

function newUser() {
     fetch('/api/roles')
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.role.substring(5);
                el.value = role.id;
                $('#newUserRoles')[0].appendChild(el);
            })
        })

    const form = document.forms["newUserForm"];

    form.addEventListener('submit', addNewUser)

    function addNewUser(e) {
        e.preventDefault();
        let newUserRoles = [];
        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) newUserRoles.push({
                id : form.roles.options[i].value,
                name : form.roles.options[i].name
            })
        }
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                surname: form.surname.value,
                age: form.age.value,
                password: form.password.value,
                username: form.username.value,
                roles: newUserRoles
            })
        }).then(() => {
            form.reset();
            loadTable();
            tabTrigger.show();
        })

    }

}


















//
// document.forms["newUserForm"].addEventListener("submit", ev => {
//     ev.preventDefault();
//     let newUserRoles = [];
//     for (let i = 0; i < document.forms["newUserForm"].roles.options.length; i++) {
//         if (document.forms["newUserForm"].roles.options[i].selected) newUserRoles.push({
//             id: document.forms["newUserForm"].roles.options[i].value,
//             name: 'ROLE_' + document.forms["newUserForm"].roles.options[i].text
//         })
//     }
//     let user = {
//         username: document.getElementById('usernameNew').value,
//         password: document.getElementById('passwordNew').value,
//         name: document.getElementById('nameNew').value,
//         surname: document.getElementById('surnameNew').value,
//         age: document.getElementById('ageNew').value,
//         roles: newUserRoles
//     };
//     fetchService.addNewUser(user)
//         .then(() => {
//             document.forms["newUserForm"].reset();
//             loadTable();
//             $('#AllUsers li:first-child a').tab('show')
//         })
// })
//
// function showRolesInNewUserForm() {
//     fetchService.findAllRoles()
//         .then(res => res.json())
//         .then(roles => {
//             roles.forEach(role => {
//                 let el = document.createElement("option");
//                 el.text = role.role.substring(5);
//                 el.value = role.id;
//                 $('#newUserRoles')[0].appendChild(el);
//             })
//         })
// }
//







// async function newUser() {
//     await fetch("/api/roles")
//         .then(res => res.json())
//         .then(roles => {
//             roles.forEach(role => {
//                 let el = document.createElement("option");
//                 el.text = role.role.substring(5);
//                 el.value = role.id;
//                 $('#roleNew')[0].appendChild(el);
//             })
//         })
//
//     const form = document.forms["addUser"];
//
//     form.addEventListener('submit', addNewUser)
//
//     function addNewUser(e) {
//         e.preventDefault();
//         let newUserRoles = [];
//         for (let i = 0; i < form.roles.options.length; i++) {
//             if (form.roles.options[i].selected) newUserRoles.push({
//                 id : form.roles.options[i].value,
//                 name : form.roles.options[i].name
//             })
//         }
//         fetch("/api/users", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: form.name.value,
//                 surname: form.surname.value,
//                 password: form.password.value,
//                 age: form.age.value,
//                 username: form.username.value,
//                 roles: newUserRoles
//             })
//         }).then(() => {
//             form.reset();
//             loadTable();
//             $('#allUsersTable').click();
//         })
//     }
//
// }

//
//  function newUser() {
//     fetch("/api/roles")
//         .then(r => r.json())
//         .then(roles => {
//             roles.forEach(role => {
//                 let element = document.createElement("option");
//                 element.text = role.role.substring(5);
//                 element.value = role.id;
//                 $('#newUserRoles')[0].appendChild(element);
//             })
//         })
//
//     const formAddNewUser = document.forms["addUser"];
//
//     formAddNewUser.addEventListener('submit', function (event) {
//         event.preventDefault();
//         let newUserRoles = [];
//         for (let i = 0; i < formAddNewUser.roles.options.length; i++) {
//             if (formAddNewUser.roles.options[i].selected) newUserRoles.push({
//                 id: formAddNewUser.roles.options[i].value,
//                 role: formAddNewUser.roles.options[i].role
//             })
//         }
//
//         fetch("/api/users", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 firstName: formAddNewUser.firstName.value,
//                 lastName: formAddNewUser.lastName.value,
//                 age: formAddNewUser.age.value,
//                 username: formAddNewUser.username.value,
//                 password: formAddNewUser.password.value,
//                 roles: newUserRoles
//             })
//         }).then(() => {
//             formAddNewUser.reset();
//             loadTable();
//             $('#AllUsers').click();
//         })
//             .catch((error) => {
//                 alert(error);
//             })
//     })
// }





