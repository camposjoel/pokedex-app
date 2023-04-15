import React from 'react'
import { Text, Image, FlatList, ActivityIndicator, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { globalStyles } from '../theme/appTheme'

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const { simplePokemonList, loadPokemons } = usePokemonPaginated()

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.pokeballBg}
      />
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.globalMargin,
                ...globalStyles.title,
                top: top + 15,
                marginBottom: top + 20
              }}
            >
              Pokedex
            </Text>
          }
          ListFooterComponent={
            <ActivityIndicator style={{ height: 100 }} size={20} color="gray" />
          }
        />
      </View>
    </>
  )
}
