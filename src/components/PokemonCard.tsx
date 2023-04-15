import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/TabHome'
import { SimplePokemon } from '../interfaces/PokemonInterfaces'
import { FadeInImage } from './FadeInImage'

const SCREEN_WIDTH = Dimensions.get('window').width

interface Props {
  pokemon: SimplePokemon  
}

export const PokemonCard = ({ pokemon }: Props) => {
  const [bgColor, setBgColor] = useState('lightgray')
  const isMounted = useRef(true)
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  const getBackgroundColor = async () => {
    const result = await ImageColors.getColors(pokemon.picture)
    if (isMounted.current === false) return;

    switch (result.platform) {
      case 'android':
        return setBgColor(result.dominant || 'lightgray')
      case 'ios':
        return setBgColor(result.background)
      default:
        return setBgColor('lightgray')
    }
  }

  useEffect(() => {
    getBackgroundColor()

    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={
        () => navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor })
      }
    >
      <View style={{...styles.cardContainer, backgroundColor: bgColor}}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeball}
          />
        </View> 

        <FadeInImage
          uri={pokemon.picture}
          style={styles.avatar}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: SCREEN_WIDTH * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    top: 12,
    left: 12,
    textTransform: "capitalize",
    textShadowColor: "black",
    textShadowRadius: 4
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: "hidden"
  },
  pokeball: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: -20,
    right: -20,
  },
  avatar: {
    width: 110,
    height: 110,
    position: "absolute",
    right: -8,
    bottom: -5
  }
})