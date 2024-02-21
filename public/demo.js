mostrarDatos();


function insertar() {
  let nuevo = {
    nombre: document.getElementById("nombre").value,
    especie: document.getElementById("especie").value,
    alimentacion: document.getElementById("alimentacion").value,
    longevidad: document.getElementById("longevidad").value,
    img: document.getElementById("img").value,
  };

  fetch("/animales", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(nuevo),
  });
  location.reload();
}
function editar() {
  let nuevo = {
    nombre: document.getElementById("nombreEditar").value,
    especie: document.getElementById("especieEditar").value,
    alimentacion: document.getElementById("alimentacionEditar").value,
    longevidad: document.getElementById("longevidadEditar").value,
    img: document.getElementById("imgEditar").value,
  };
  fetch("/animales", {
    method: "PUT",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(nuevo),
  });
  location.reload();
}

function borrar() {
  let nuevo = {
    nombre: document.getElementById("nombreBorrar").value,
  };

  fetch("/animales", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(nuevo),
  });
  location.reload();
}

function mostrarDatos() {
  fetch("/animales", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let tabla = `
      <table border="2">
      <tr>
      <th colspan="6">ANIMALES</th>
      </tr>
      <tr>
          <th>NOMBRE</th>
          <th>ESPECIE</th>
          <th>ALIMENTACION</th>
          <th>LONGEVIDAD</th>
          <th>FOTO</th>
      </tr>`;
      for (let i = 0; i < data.length; i++) {
        tabla += `<tr>
          <th>${data[i].nombre}</th>
          <th>${data[i].especie}</th>
          <th>${data[i].alimentacion}</th>
          <th>${data[i].longevidad}</th>
          <th><img src="${data[i].img}" alt="animales" width="100" height="100"></th>
          `;
      }
      tabla += `</table>`;
      document.getElementById("mostrarAnimales").innerHTML = tabla;
    });
}
