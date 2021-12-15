const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(151).fill().map((_, index) => 
  fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
  const types = pokemon.types.map(typeInfo => typeInfo.type.name)
  
  accumulator += `
    <li class="card ${types[0]}">
    <img class="card-image" alt="${pokemon.name}." src="${pokemon.sprites.other["official-artwork"].front_default}"/>
      <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
      <p class="card-subtitle">${types.join(' | ')}</p>
    </li>
  `;
  
  return accumulator;
}, '');

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage);
