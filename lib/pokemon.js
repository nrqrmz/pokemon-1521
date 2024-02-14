// TODO write your code here
const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0'
const cardTemplate = document.querySelector('#cardTemplate')
const cardsContainer = document.querySelector('#cardsContainer')
const infoTemplate = document.querySelector('#infoTemplate')
const infoContainer = document.querySelector('#infoContainer')

fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then((pokedata) => {
          const cardClone = cardTemplate.content.cloneNode(true)
          cardClone.querySelector('img').src = pokedata.sprites.front_default
          cardClone.querySelector('h2').innerText = pokedata.name
          cardClone.querySelector('p').innerText = pokedata.types.map(t => t.type.name).join(' - ')
          cardClone.querySelector('a').addEventListener('click', () => {
            const infoClone = infoTemplate.content.cloneNode(true)
            infoContainer.innerHTML = ''
            infoClone.querySelector('img').src = pokedata.sprites.front_default
            infoClone.querySelector('h2').innerText = pokedata.name
            infoClone.querySelector('p').innerText = pokedata.types.map(t => t.type.name).join(' - ')

            infoContainer.appendChild(infoClone)
          })

          cardsContainer.appendChild(cardClone)
        })
    })
  })
