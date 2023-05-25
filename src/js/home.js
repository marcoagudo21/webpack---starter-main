import "../css/componentes.css";
import { obtenerGeneraciones, obtenerPokemonId, obtenerPokemonName } from "./http-provider";

// Referencias
const form = document.querySelector(".hero__nav__input__form");
const genBtn = document.querySelectorAll(".genBtn");
const card__container2 = document.querySelector(".card__container2");
const overlay = document.querySelector(".overlay")

const colores = {
  grass: "#48D0B0",
  fire: "#FB6C6C",
  water: "#609FB5",
  normal: "#BAB0D5",
  bug: "#C3CE75",
  fighting: "#D6B591",
  rock: "#A6AAB6",
  flying: "#BAB0D5",
  ice: "#7FCCEC",
  poison: "#7C538C",
  fairy:  "#F469A9",
  psychic: "#9B7FA6",
  ground: "#B1736C",
  electric: "#FFD86F",
  steel: "#CCCCDE",
  dragon: "#F9BE00",
  ghost: "#735797",
  dark: "#333333",


}
function oscurecerColor(colorHex, factor) {
  // Extraer los componentes de color individuales
  const r = parseInt(colorHex.substring(1, 3), 16);
  const g = parseInt(colorHex.substring(3, 5), 16);
  const b = parseInt(colorHex.substring(5, 7), 16);

  // Calcular los nuevos componentes de color oscurecidos
  const nuevoR = Math.round(r * factor);
  const nuevoG = Math.round(g * factor);
  const nuevoB = Math.round(b * factor);

  // Convertir los componentes de color a formato hexadecimal
  const nuevoColorHex = `#${nuevoR.toString(16).padStart(2, '0')}${nuevoG.toString(16).padStart(2, '0')}${nuevoB.toString(16).padStart(2, '0')}`;

  return nuevoColorHex;
}

const asignarColor = (types) => {
  let color;
  if (types.length > 1 && types[0].type.name === "normal") {
     color = colores[types[1].type.name];
  } else {
     color = colores[types[0].type.name];
  }
  return color;
}


// Search Inicio
let data = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  data.push(e.target[0].value);
  e.target[0].value = "";
  const searchPokemonByName = async () => {
    const dataString = data.join("");
    let pokemon = await obtenerPokemonName(dataString);
    console.log(pokemon);
  };
  searchPokemonByName();
});

// Search Fin



// Overlay inicio
const crearOverlayHtml = (name, types, img, id, hp, attack, defense, spatk, spdef, speed, total, height, weight, color, abilities) => {
  const color2 = oscurecerColor(color, 0.7)
  const overlayContent = `
  <div class="pokemon__details__presentation">
    <i class="fa-solid fa-arrow-left"></i>
    <div class="pokemon__details__presentation__pokemon">
      <h2>${name}</h2>
      <div class="nature">
      ${types
        .map(
          ({ type }) =>
            `<p style="background-color:${color2}">${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</p>`
        )
        .join("")}
      </div>
      
      <img
        src=${img}
        alt=""
      />
    </div>
    <h2 class="id" style="color:${color2}">${id}</h2>
  </div>
  <div class="pokemon__details__stats">
    <div class="pokemon__details__stats__bar">
      <button class="about disabled" >About</button>
      <button class="base_stats enabled" >Base Stats</button>
      <button class="evolution disabled" >Evolution</button>
    </div>
    <div class="pokemon__details__stats__table">
      <table id="ab" class="d-none">
        <tbody>
          <tr>
            <td class="line1">Species</td>
            <td class="line2">${types.map( ({type}) => `${type.name.charAt(0).toUpperCase() + type.name.slice(1)}`).join(", ")}</td>
          </tr>
          <tr>
            <td class="line1">Height</td>
            <td class="line2">${height}cm</td>
          </tr>
          <tr>
            <td class="line1">Weight</td>
            <td class="line2">${weight}kg</td>
          </tr>
          <tr>
            <td class="line1">Abilities</td>
            <td class="line2">${abilities.map(({ability}) => `${ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}`).join(", ")}</td>
          </tr>
        </tbody>
      </table>
      <table id="stats" >
        <tbody>
          <tr>
            <td class="line1">HP</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar progress-bar-striped w-50 bg-danger" role="progressbar" aria-valuenow="${hp}" aria-valuemin="0" aria-valuemax="100" style=" width: ${hp}% !important" >${hp}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="line1">Attack</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-success w-50" role="progressbar" aria-valuenow="${attack}" aria-valuemin="0" aria-valuemax="100" style=" width: ${attack}% !important" >${attack}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="line1">Defense</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-danger w-50" role="progressbar" aria-valuenow="${defense}" aria-valuemin="0" aria-valuemax="100" style=" width: ${defense}% !important" >${defense}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="line1">Sp.Atk</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar w-75 progress-bar-striped bg-success" role="progressbar" aria-valuenow="${spatk}" aria-valuemin="0" aria-valuemax="100" style=" width: ${spatk}% !important" >${spatk}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="line1">Sp.Def</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-danger w-75" role="progressbar" aria-valuenow="${spdef}" aria-valuemin="0" aria-valuemax="100" style=" width: ${spdef}% !important" >${spdef}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="line1">Speed</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar w-50 progress-bar-striped bg-success" role="progressbar" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100" style=" width: ${speed}% !important" >${speed}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="line1">Total</td>
            <td class="line2">
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-danger w-100" role="progressbar" aria-valuenow="${total}" aria-valuemin="0" aria-valuemax="100">${total}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`;
const pokemon__details = document.createElement('div');
pokemon__details.classList.add('pokemon__details');
pokemon__details.innerHTML = overlayContent;
pokemon__details.style.backgroundColor = color;
console.log(pokemon__details);
overlay.appendChild(pokemon__details);


const leftArrow = document.querySelector(".fa-arrow-left")
leftArrow.addEventListener('click', (e)=>{
  overlay.classList.replace( 'overlay-dflex', 'overlay-dnone');
  overlay.innerHTML = '';
})

const about = document.querySelector('.about');
const base_stats = document.querySelector('.base_stats');
const evolution = document.querySelector('.evolution');
const ab = document.getElementById('ab');
const stats = document.getElementById('stats');
about.addEventListener('click', (e)=>{
  console.log(e.target.classList);
  console.log(ab);
  if (e.target.classList[1] != 'enabled') {
    e.target.classList.replace('disabled', 'enabled')
    ab.classList.remove('d-none');
    stats.classList.add('d-none');
    if (base_stats.classList[1] === 'enabled') {
      base_stats.classList.replace('enabled', 'disabled')
    } else {
      evolution.classList.replace('enabled', 'disabled')
    }
  }
  
})
base_stats.addEventListener('click', (e)=>{
  console.log(e);
  if (e.target.classList[1] != 'enabled') {
    e.target.classList.replace('disabled', 'enabled')
    stats.classList.remove('d-none');
    ab.classList.add('d-none');
    if (about.classList[1] === 'enabled') {
      about.classList.replace('enabled', 'disabled')
    } else {
      evolution.classList.replace('enabled', 'disabled')
    }
  }
})
evolution.addEventListener('click', (e)=>{
  console.log(e);
  if (e.target.classList[1] != 'enabled') {
    e.target.classList.replace('disabled', 'enabled')
    if (about.classList[1] === 'enabled') {
      about.classList.replace('enabled', 'disabled')
    } else {
      base_stats.classList.replace('enabled', 'disabled')
    }
  }
})

}
const cambiarOverlay = async() => {
  let cartas = document.querySelectorAll(".card");
  
  cartas.forEach(carta => {
    
    carta.addEventListener("click", async(e) => {
        console.log(e);
        let data;
        if (e.target.parentElement.classList != 'card') {
          data = await obtenerPokemonId(e.target.parentElement.offsetParent.id)
        } else {
          
           data = await obtenerPokemonId(e.target.parentElement.id)
        }
        const pokeInfo = {
          id: data.id,
          name: data.name.toUpperCase(),
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          spatk: data.stats[3].base_stat,
          spdef: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
          img: data.sprites.other.dream_world.front_default,
          types: data.types,
          abilities: data.abilities,
          height: data.height * 10,
          weight: data.weight / 10,
          abilities: data.abilities,
          total: function () {
            return this.hp + this.attack + this.defense + this.spatk + this.spdef + this.speed} 
        };
        console.log(pokeInfo.total(), pokeInfo.types[0].type.name, pokeInfo.abilities[0].ability.name);

        console.log(pokeInfo.types.length);
       
        const color = asignarColor(pokeInfo.types);
        console.log(color);
        
        if (pokeInfo.img != null) {
          crearOverlayHtml(pokeInfo.name, pokeInfo.types, pokeInfo.img, pokeInfo.id, pokeInfo.hp, pokeInfo.attack, pokeInfo.defense, pokeInfo.spatk, pokeInfo.spdef, pokeInfo.speed, pokeInfo.total(), pokeInfo.height, pokeInfo.weight, color, pokeInfo.abilities)
          

        } else {
          let img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeInfo.id}.png`
          crearOverlayHtml(pokeInfo.name, pokeInfo.types, img2, pokeInfo.id, pokeInfo.hp, pokeInfo.attack, pokeInfo.defense, pokeInfo.spatk, pokeInfo.spdef, pokeInfo.speed, pokeInfo.total(), pokeInfo.height, pokeInfo.weight, color, pokeInfo.abilities)

        }
      


        overlay.classList.replace('overlay-dnone', 'overlay-dflex')
      });
  })
}


// Overlay Fin



// Generaciones Inicio
const crearHtmlGeneraciones = (id, name, types, img, color) => {
  let color2 = oscurecerColor(color, 0.7)
  const card = `
    <div class="pokemonInfo">
      <span style="color:${color2}" >${id}</span>
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      ${types
        .map(
          ({ type }) =>
            `<p style="background-color:${color2}" >${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</p>`
        )
        .join("")}
    </div>
    <img
      src="${img}"
      alt=""
      class="pokemonImg"
    />
  `;
  const newCardElement = document.createElement("div");
  newCardElement.classList.add("card");
  newCardElement.id = id;
  newCardElement.innerHTML = card;
  newCardElement.style.backgroundColor = color;
  card__container2.appendChild(newCardElement);
  
};
const searchGeneraciones = async (offset, limit) => {
  for (let i = offset; i <= limit; i++) {
    const {
      id,
      name,
      types,
      sprites
      // sprites: {
      //   other: {
      //     dream_world: { front_default },
      //   },
      // },
      
    } = await obtenerGeneraciones(i);
    let front_default =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    let front_default2 = sprites.other.dream_world.front_default;
    // console.log(name, front_default);
    let color = asignarColor(types);
    
    if (front_default2 != null) {
      crearHtmlGeneraciones(id, name, types, front_default2, color);
    } else {
      crearHtmlGeneraciones(id, name, types, front_default, color)
    }
  }
  
  cambiarOverlay()
};

genBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    card__container2.innerHTML = "";
    console.log(e.target.id);
    let offset;
    let limit;
    if (e.target.id === "genbtn1") {
      offset = "1";
      limit = "151";
    } else if (e.target.id === "genbtn2") {
      offset = "152";
      limit = "250";
    } else if (e.target.id === "genbtn3") {
      offset = "251";
      limit = "386";
    } else if (e.target.id === "genbtn4") {
      offset = "387";
      limit = "493";
    } else if (e.target.id === "genbtn5") {
      offset = "494";
      limit = "649";
    } else if (e.target.id === "genbtn6") {
      offset = "650";
      limit = "721";
    } else if (e.target.id === "genbtn7") {
      offset = "722";
      limit = "809";
    }
    searchGeneraciones(offset, limit);
  })
);

//   Generaciones Fin

// ID inicio

export const init = () => {};
