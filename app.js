let pagina = 1;
const main = document.querySelector("main");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const search = document.querySelector("#buscador");

async function fetchData(page) {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function mostrarPagina(page) {
  main.innerHTML = "";
  const data = await fetchData(page);

  data.results.forEach((personaje) => {
    const div = document.createElement("div");
    div.classList.add("personaje");
    const nombre = document.createElement("h2");
    nombre.textContent = personaje.name;
    const especie = document.createElement("h4");
    especie.textContent = personaje.species;
    const tipo = document.createElement("h4");
    tipo.textContent = personaje.type || "Desconocido";
    const img = document.createElement("img");
    img.src = personaje.image;
    const ubicacion = document.createElement("h4");
    ubicacion.textContent = personaje.location.name;

    div.appendChild(nombre);
    div.appendChild(img);
    div.appendChild(especie);
    div.appendChild(tipo);
    div.appendChild(ubicacion);
    main.appendChild(div);
  });

  prevButton.disabled = !data.info.prev;
  nextButton.disabled = !data.info.next;
}

search.addEventListener("input", () => {
  const usuarioBusqueda = search.value.toLowerCase().trim();
  document.querySelectorAll(".personaje").forEach((div) => {
    const nombre = div.querySelector("h2").textContent.toLowerCase();
    div.style.display = nombre.includes(usuarioBusqueda) ? "block" : "none";
  });
});

prevButton.addEventListener("click", () => {
  if (pagina > 1) {
    pagina--;
    mostrarPagina(pagina);
  }
});

nextButton.addEventListener("click", () => {
  pagina++;
  mostrarPagina(pagina);
});

mostrarPagina(pagina);
