import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { TabHomeNavigator } from './TabHome'
import { TabSearchNavigator } from './TabSearch'

const Tab = createBottomTabNavigator()


export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5856D6",
        tabBarLabelStyle: {
          marginBottom: 6
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderTopColor: "white",
          borderWidth: 0,
          elevation: 0
        }
      }}
    >
      <Tab.Screen
        name="MainScreen"
        component={TabHomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => <Icon color={color} size={20} name="home-outline" />
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={TabSearchNavigator}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({color}) => <Icon color={color} size={20} name="search-outline" />
        }}
      />
    </Tab.Navigator>
  );
}