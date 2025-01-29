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
  //converts pokemon name to allowed characters
  const totalPokemonCount = allPokemon.count;
  const pokemon = allPokemon.results;
  const regex = new RegExp(`[^a-zA-Z0-9-]`, "g");
  const searchPokemon = input.value.replace(regex, "").toLowerCase();
  console.log(totalPokemonCount, searchPokemon);
  if (parseInt(searchPokemon) !== NaN) {
    //search by id
    const id = parseInt(searchPokemon);
    if (id <= totalPokemonCount) {
      const currPokemon = pokemon.find((p) => p.url.includes(`/${id}/`));
      console.log(currPokemon);
      fetchPokemonData(currPokemon);
    } else {
      alert("Pokémon not found");
      return;
    }
  } else {
    //search by name

  }
});

const fetchPokemonData = async (currPokemon) => {
  try {
    const res2 = await fetch(currPokemon.url);
    const currPokemonData = await res2.json();
    console.log(currPokemonData);
  } catch (err) {
    console.log(err);
  }
};

const displayPokemonData = (currPokemonData) => {
    const { name, id, height, weight, abilities, types, sprites } = currPokemonData;
    const { front_default } = sprites;
    console.log(name, id, height, weight, abilities, types, front_default);
    //display data
};