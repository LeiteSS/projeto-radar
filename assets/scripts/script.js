// READ

async function loadTable() {
    const http = await (await fetch("assets/scripts/leitura.JSON")).json();
    let HTML = '';
    http.forEach(user => {
        HTML += `<tr>
        <td>${user['id']}</td>
        <td>${user['name']}</td>
        <td>${user['email']}</td>
        <td>${user['tel']}</td>
        <td>${user['birth']}</td>
        <td>${user['cpf']}</td>
        <td>${user['cargo']}</td>
        <td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('${user['id']}')" id="btnEditar"><i class="fa-solid fa-user-pen"></i></button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="userDelete('${user['id']}')" id="btnApagar"><i class="fa-solid fa-user-xmark"></i></button></td>
        </tr>`;
    })
    document.getElementById("mytable").innerHTML = HTML;
}

loadTable();

// CREATE

function showUserCreateBox() {
    Swal.fire({
      title: 'Adicionar Funcionário',
      html:
        '<input id="id" type="hidden">' +
        '<input id="name" class="swal2-input" placeholder="Nome">' +
        '<input id="email" class="swal2-input" placeholder="E-mail">' +
        '<input id="tel" class="swal2-input" placeholder="Telefone">' +
        '<input id="birth" class="swal2-input" placeholder="Nascimento">' +
        '<input id="cpf" class="swal2-input" placeholder="CPF">' +
        '<input id="cargo" class="swal2-input" placeholder="Cargo">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
}
  
function userCreate() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("tel").value;
    const nascimento = document.getElementById("birth").value;
    const cpf = document.getElementById("cpf").value;
    const cargo = document.getElementById("cargo").value;
    
    const json = JSON.stringify({
        "name": name, "email": email, "tel": telefone, "birth": nascimento, "cpf": cpf, "cargo": cargo
    });
    console.log(json)
    const url = "assets/scripts/leitura.JSON";
    const configs = {
        method: 'POST',
        body: json,
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }

    const http = fetch(url, configs);

    http.then(response => {
        Swal.fire(response['statusText']);
        loadTable();
    })
}

// UPDATE

async function showUserEditBox(id) {
    console.log(id);
    const http = await (await fetch("assets/scripts/leitura.JSON")).json();
    const user = http[id-1];
    Swal.fire({
        title: 'Editar Funcionário',
          html:
          '<input id="id" type="hidden" value='+user['id']+'>' +
          '<input id="name" class="swal2-input" placeholder="Nome" value='+user['name']+'>' +
          '<input id="email" class="swal2-input" placeholder="E-mail" value='+user['email']+'>' +
          '<input id="tel" class="swal2-input" placeholder="Telefone" value='+user['tel']+'>' +
          '<input id="birth" class="swal2-input" placeholder="Nascimento" value='+user['birth']+'>' +
          '<input id="cpf" class="swal2-input" placeholder="CPF" value='+user['cpf']+'>' +
          '<input id="cargo" class="swal2-input" placeholder="Cargo" value='+user['cargo']+'>',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
}
  
function userEdit() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("tel").value;
    const nascimento = document.getElementById("birth").value;
    const cpf = document.getElementById("cpf").value;
    const cargo = document.getElementById("cargo").value;
    
    const json = JSON.stringify({
        "name": name, "email": email, "tel": telefone, "birth": nascimento, "cpf": cpf, "cargo": cargo
    });
    const url = "assets/scripts/leitura.JSON";
    const configs = {
        method: 'PUT',
        body: json,
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }

    const http = fetch(url, configs);

    http.then(response => {
        Swal.fire(response['statusText']);
        loadTable();
    })
}

// DELETE

async function userDelete(id) {
    const json = JSON.stringify({"id": id});
    console.log(json)
    const url = "assets/scripts/leitura.JSON";
    const configs = {
        method: 'DELETE',
        body: json,
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        }
    }

    const http = fetch(url, configs);

    http.then(response => {
        Swal.fire(response["statusText"]);
        loadTable();
    })
}