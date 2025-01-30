const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

let allPokemon = {};

fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then((res) => res.json())
  .then((data) => {
    allPokemon = data;
    console.log(allPokemon);
  })
  .catch((err) => {
    console.log(err);
  });

searchBtn.addEventListener("click", () => {
  if (!allPokemon.results) {
    alert("Pokémon not found");
    return;
  }

  const pokemon = allPokemon.results;
  const regex = new RegExp(`[^a-zA-Z0-9-]`, "g");
  const searchPokemon = input.value.replace(regex, "").toLowerCase().trim();

  if (!searchPokemon) {
    alert("Pokémon not found");
    return;
  }

  if (!isNaN(parseInt(searchPokemon))) {
    // Search by ID
    const id = parseInt(searchPokemon);
    const currPokemon = pokemon.find((p) => p.url.includes(`/${id}/`));

    if (!currPokemon) {
      clearPokemonData();
      alert("Pokémon not found");
      return;
    }
    fetchPokemonData(currPokemon);
  } else {
    // Search by Name
    const currPokemon = pokemon.find(
      (p) => p.name.toLowerCase() === searchPokemon
    );

    if (!currPokemon) {
      clearPokemonData();
      alert("Pokémon not found");
      return;
    }
    fetchPokemonData(currPokemon);
  }
});

const fetchPokemonData = async (currPokemon) => {
  try {
    const res2 = await fetch(currPokemon.url);
    const currPokemonData = await res2.json();
    console.log(currPokemonData);
    displayPokemonData(currPokemonData);
  } catch (err) {
    console.log(err);
  }
};

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHp = document.getElementById("hp");
const pokemonTypes = document.getElementById("types");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSA = document.getElementById("special-attack");
const pokemonSD = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const displayPokemonData = (currPokemonData) => {
  const { name, id, height, weight } = currPokemonData;
  const currPokemonStats = currPokemonData.stats.map((s) => s.base_stat);
  const currPokemonTypes = currPokemonData.types.map((t) => t.type.name);
  console.log(name, id, height, weight, currPokemonStats, currPokemonTypes);
  //display data
  pokemonName.innerHTML = name;
  pokemonId.innerHTML = id;
  pokemonWeight.innerHTML = `Weight: ${weight}`;
  pokemonHeight.innerHTML = `Height: ${height}`;
  spriteContainer.innerHTML = `
      <img id="sprite" src="${currPokemonData.sprites.front_default}" alt="${currPokemonData.name} front default sprite">
    `;
  pokemonHp.innerHTML = currPokemonStats[0];
  pokemonAttack.innerHTML = currPokemonStats[1];
  pokemonDefense.innerHTML = currPokemonStats[2];
  pokemonSA.innerHTML = currPokemonStats[3];
  pokemonSD.innerHTML = currPokemonStats[4];
  pokemonSpeed.innerHTML = currPokemonStats[5];
  pokemonTypes.innerHTML = currPokemonData.types
    .map((obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join("");
};

const clearPokemonData = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();
  pokemonName.innerHTML = "";
  pokemonId.innerHTML = "";
  pokemonWeight.innerHTML = "";
  pokemonHeight.innerHTML = "";
  pokemonHp.innerHTML = "";
  pokemonAttack.innerHTML = "";
  pokemonDefense.innerHTML = "";
  pokemonSA.innerHTML = "";
  pokemonSD.innerHTML = "";
  pokemonSpeed.innerHTML = "";
  pokemonTypes.innerHTML = "";
};
