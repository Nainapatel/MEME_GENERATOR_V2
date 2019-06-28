
import React, {Component} from 'react';
import {createStackNavigator, createMaterialTopTabNavigator,createAppContainer,NavigationEvents} from 'react-navigation';

import Second from './second';
import First from './first'



const TabScreen = createMaterialTopTabNavigator(
  {
   First: { screen: First },
   Second: { screen: Second },
  },
  {
   tabBarPosition: 'bottom',
   swipeEnabled: true,
   animationEnabled: true,
   tabBarOptions: {
     activeTintColor: '#302f2f',
     inactiveTintColor: 'gray',
     style: {
       backgroundColor: '#ffffff',
       // elevation:5,
  
     },
     labelStyle: {
       textAlign: 'center',
       fontWeight: '600',
       fontSize:15
     },
     indicatorStyle: {
       borderBottomColor: '#363636',
       borderBottomWidth: 2,
     },
   },
  }
  );
  
  const Tabs = createStackNavigator({
   TabScreen: {
     screen: TabScreen,
     navigationOptions: {
       header:null
     },
   },
  
  });
 export default createAppContainer(Tabs);