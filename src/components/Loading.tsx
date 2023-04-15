import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const Loading = () => {
  return (
    <View>
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size={50} color="gray" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})