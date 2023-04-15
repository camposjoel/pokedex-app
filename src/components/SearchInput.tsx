import React, { useEffect, useState } from 'react'
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

interface Props {
  style?: StyleProp<ViewStyle>,
  onDebounce: (value: string) => void
}

export const SearchInput = ({ style, onDebounce }: Props) => {
  const [textValue, setTextValue] = useState('')

  const debouncedValue = useDebouncedValue(textValue)

  useEffect(() => {
    onDebounce(debouncedValue)
  }, [debouncedValue])

  return (
    <View style={{...styles.container, ...style as any}}>
      <View style={styles.textBackground}>

        <TextInput
          placeholder="Search Pokemon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        
        <Icon name="search-outline" size={30} color="grey" />

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 12
    // backgroundColor: "tomato",
  },
  textBackground: {
    backgroundColor: "#F3F1F3",
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2
  }
})
