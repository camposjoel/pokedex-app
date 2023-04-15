import { createStackNavigator } from '@react-navigation/stack'
import { SearchScreen } from '../screens/SearchScreen'
import { PokemonScreen } from '../screens/PokemonScreen'
import { RootStackParams } from './TabHome'

const TabSearch = createStackNavigator<RootStackParams>();

export const TabSearchNavigator = () => {
  return (
    <TabSearch.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white"
        }
      }}
    >
      <TabSearch.Screen name="HomeScreen" component={SearchScreen} />
      <TabSearch.Screen name="PokemonScreen" component={PokemonScreen} />
    </TabSearch.Navigator>
  )
}