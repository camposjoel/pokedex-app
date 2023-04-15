import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParams } from '../navigation/TabHome'
import { FadeInImage } from '../components/FadeInImage'
import { usePokemon } from '../hooks/usePokemon'
import { PokemonDetails } from '../components/PokemonDetails'

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { simplePokemon, color } = route.params
  const { id, name, picture } = simplePokemon

  const { pokemon, isLoading } = usePokemon(id)

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    headerContainer: {
      height: 370,
      backgroundColor: color,
      zIndex: 9,
      alignItems: "center",
      borderBottomRightRadius: 200,
      borderBottomLeftRadius: 200
    },
    backButton: {
      position: "absolute",
      left: 20,
      top: 20
    },
    pokemonName: {
      color: "white",
      fontSize: 40,
      alignSelf: "flex-start",
      left: 20,
      top: 60,
      textTransform: "capitalize"
    },
    pokeball: {
      width: 250,
      height: 250,
      bottom: -20,
      opacity: 0.6
    },
    pokemonImg: {
      width: 250,
      height: 250,
      position: "absolute",
      bottom: -20
    },
    activityContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  })

  return (
    <View style={styles.mainContainer}>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back-outline"
            color="white"
            size={40}
          />
        </TouchableOpacity>

        <Text style={styles.pokemonName}>
          {name + '\n#' + id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        <FadeInImage
          uri={picture}
          style={styles.pokemonImg}
        />
      </View>

      {/* Details and loading */}
      {
        isLoading ? 
        (
          <View style={styles.activityContainer}>
            <ActivityIndicator
              color={color}
              size={50}
            />
          </View>
        )
        :
        (
          <PokemonDetails pokemon={pokemon} />
        )
      }


    </View>
  )
}

