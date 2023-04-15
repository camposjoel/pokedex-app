import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/PokemonApi'
import { PokemonPaginatedResponse, PokemonReference, SimplePokemon } from '../interfaces/PokemonInterfaces'

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
  
  const loadPokemons = async () => {

    const res = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200')
    
    mapPokemonList(res.data.results)
    setIsFetching(false)
  }

  const mapPokemonList = (pokemons: PokemonReference[]) => {
    const newPokemonList: SimplePokemon[]= pokemons.map(({ name, url }) => {
      const urlParts = url.split('/')
      const id = urlParts[urlParts.length - 2]
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    
      return {
        id,
        name,
        picture
      }
    })
    
    setSimplePokemonList(newPokemonList)
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  return {
    isFetching,
    simplePokemonList
  }
}