const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('form');
const input = document.querySelector('form input');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`);

    if (apiResponse.status !== 200)
        return null;

    return apiResponse.json();
};

const clearPokemon = () => {
    pokemonName.innerHTML = '';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
    searchPokemon = 0;
};

const definePokemon = (pokemon) => {
    pokemonName.innerHTML = pokemon.name;
    pokemonNumber.innerHTML = pokemon.id;
    searchPokemon = pokemon.id;
    pokemonImage.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const pokemonData = await fetchPokemon(pokemon);

    if (pokemonData)
    {
        pokemonImage.style.display = 'block';
        definePokemon(pokemonData);
    }
    else
    {
        pokemonName.innerHTML = 'Not found :c';
        clearPokemon();
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
    input.value = '';
});

buttonNext.addEventListener('click', () => renderPokemon(searchPokemon + 1));
buttonPrev.addEventListener('click', () => {
    renderPokemon(searchPokemon - 1 <= 0 ? 1 : searchPokemon - 1);
});

renderPokemon(searchPokemon);