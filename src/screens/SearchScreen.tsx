import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchInput } from '../components/SearchInput'
import { usePokemonSearch } from '../hooks/usePokemonSearch'
import { globalStyles } from '../theme/appTheme'
import { PokemonCard } from '../components/PokemonCard'
import { Loading } from '../components/Loading'
import { SimplePokemon } from '../interfaces/PokemonInterfaces'

const WIDTH_SCREEN = Dimensions.get('window').width

export const SearchScreen = () => {

  const { top } = useSafeAreaInsets()
  const { isFetching, simplePokemonList } = usePokemonSearch()
  const [term, setTerm] = useState('')
  const [pokemonsFiltered, setPokemonsFiltered] = useState<SimplePokemon[]>([])

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonsFiltered([])
    }

    if (isNaN(+term)) {
      setPokemonsFiltered(
        simplePokemonList.filter(pokemon => pokemon.name.includes(term.toLowerCase()))
      )
    } else {
      const pokemon = simplePokemonList.find(pokemon => pokemon.id.includes(term))
      setPokemonsFiltered(
        pokemon ? [pokemon] : []
      )
    }
  }, [term])

  if (isFetching) {
    return <Loading />
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20
      }}
    >

      <SearchInput
        onDebounce={setTerm}
        style={{
          position: "absolute",
          zIndex: 9,
          width: WIDTH_SCREEN - 40,
          top: (Platform.OS === "ios") ? top : top + 10
        }}
      />

      <FlatList
        data={pokemonsFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.globalMargin,
              ...globalStyles.title,
              top: top + 15,
              marginBottom: top + 20,
              marginTop: top + 50
            }}
          >
            {term}
          </Text>
        }
      />

    </View>
  )
}
