// Crear el titulo "Poke App"
function pokeTitle() {
  const body = document.getElementById('body');
  
  const appName = 
  `<body>
    <h1>Poke App</h1>
  </body>`;

  body.insertAdjacentHTML('afterbegin', appName)
}

pokeTitle()

function showPokemonInfo() {
// Obtener la lista de pokemones desde la API
const endpoint = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const pokemonList = data.results;

    // Agregar opciones al select
    const options = $("#pokemonSelect");
    
    $.each(pokemonList, function(index, pokemon) {
      options.append($("<option/>").val(pokemon.url).text(pokemon.name));
    });

    // Agregar el evento onChange al select para mostrar la información del Pokemon seleccionado
    $("#pokemonSelect").change(function() {
      const pokemonUrl = $(this).val();
      if (pokemonUrl) {
        fetch(pokemonUrl)
          .then(response => response.json())
          .then(data => {
            crearPokemon(data);
          });
      } else {
        $("#pokemonDetail").html("");
      }
    });
  })
  .catch(error => console.error(error));
// Lo que hace la función es mostrar el pokemon en el html
function crearPokemon(pokemon) {
  const pokeDiv = document.getElementById('pokemonDetail');
  const abilities = pokemon.abilities.map((ability) => ability.ability.name).join(', ');
  const stats = pokemon.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

  const pokeDetails = 
  `<div>
    <img src="${pokemon.sprites.other.dream_world.front_default}">
    <h2 class="pokeName">Name: ${pokemon.name}</h2>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Abilities: ${abilities}</p>
    <p>Stats: ${stats}</p>
  </div>`;

  pokeDiv.insertAdjacentHTML('beforeend', pokeDetails)
}
}

showPokemonInfo()