
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BadgerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="News" 
        component={BadgerNewsScreen} 
        options={{
            tabBarLabel: 'News',
            tabBarIcon: ({ color, size }) => (
              <Icon name="newspaper-outline" size={size} color={color} />
            ),
          }}
      />
      <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} 
         options={{
            tabBarLabel: 'Preferences',
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings-outline" size={size} color={color} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}

export default BadgerTabs;
