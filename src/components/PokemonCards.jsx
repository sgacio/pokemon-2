import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const PokemonCards = () => {
  const [cards, setCards] = useState([])
  const [cName, setCName] = useState('')

  const giveMeTheApi = async () => {
    const resp = await axios.get(
      'https://api.pokemontcg.io/v1/cards?name=squirtle'
    )
    setCards(resp.data.cards)
  }

  const searchApi = async () => {
    const resp = await axios.get(
      `https://api.pokemontcg.io/v1/cards?name=${cName}`
    )
    setCards(resp.data.cards)
  }

  useEffect(() => {
    giveMeTheApi()
  }, [])

  const putTheNameInTheBox = event => {
    setCName(event.target.value)
  }

  return (
    <main>
      <div className="top-part">
        <input
          type="search"
          placeholder="Pokemon Card Name"
          onChange={putTheNameInTheBox}
        ></input>
        <button onClick={searchApi}>search</button>
      </div>
      <ul>
        {cards.map(result => {
          return (
            <li>
              <section>
                <div>Pokedex Number: {result.nationalPokedexNumber}</div>
                <div>Type: {result.types}</div>
                <div>Rarity: {result.rarity}</div>
              </section>
              <div>
                <img src={result.imageUrl} style={{ height: '25rem' }} />
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default PokemonCards
