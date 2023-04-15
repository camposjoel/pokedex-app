import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PokemonFull } from '../interfaces/PokemonInterfaces'
import { FadeInImage } from './FadeInImage'

interface Props {
  pokemon: PokemonFull
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      style={{...StyleSheet.absoluteFillObject}}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.listContainer}>
        {
          pokemon.types.map(({ type }) => (
            <Text key={type.name} style={{...styles.textRegular, marginRight: 10}}>
              {type.name}
            </Text>
          ))
        }
        </View>

        <Text style={styles.title}>Weight</Text>
        <Text style={styles.textRegular}>{pokemon.weight} lb</Text>
      </View>


      <View style={{marginHorizontal: 20}}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      <View style={{marginHorizontal: 20}}>
        <Text style={styles.title}>abilities</Text>
        <View style={styles.listContainer}>
        {
          pokemon.abilities.map(({ ability }) => (
            <Text key={ability.name} style={{...styles.textRegular, marginRight: 10}}>
              {ability.name}
            </Text>
          ))
        }
        </View>
      </View>

      <View style={{marginHorizontal: 20}}>
        <Text style={styles.title}>Moves</Text>
        <View style={{flexDirection: "row", flexWrap: 'wrap'}}>
        {
          pokemon.moves.map(({ move }) => (
            <Text key={move.name} style={{...styles.textRegular, marginRight: 10}}>
              {move.name}
            </Text>
          ))
        }
        </View>
      </View>

      <View style={{marginHorizontal: 20}}>
        <Text style={styles.title}>Stats</Text>
        <View>
        {
          pokemon.stats.map((item) => (
            <View key={item.stat.name} style={{flexDirection: "row"}}>
              <Text style={{...styles.textRegular, marginRight: 10, width: 150}}>
                {item.stat.name}
              </Text>
              <Text style={{...styles.textRegular, fontWeight: "bold"}}>
                {item.base_stat}
              </Text>
            </View>
          ))
        }
        </View>


        <View
          style={{
            marginBottom: 20,
            alignItems: "center"
          }}
        >
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 380
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "black",
    marginTop: 20
  },
  textRegular: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "black"
  },
  listContainer: {
    flexDirection: "row"
  },
  basicSprite: {
    height: 100,
    width: 100
  }
})