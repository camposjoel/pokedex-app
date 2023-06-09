import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/PokemonApi'
import { PokemonPaginatedResponse, PokemonReference, SimplePokemon } from '../interfaces/PokemonInterfaces'

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
  
  const loadPokemons = async () => {
    setIsLoading(true)
    const res = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current)
    nextPageUrl.current = res.data.next

    mapPokemonList(res.data.results)
    setIsLoading(false)
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
    
    setSimplePokemonList([...simplePokemonList, ...newPokemonList])
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  return {
    isLoading,
    simplePokemonList,
    loadPokemons
  }
}