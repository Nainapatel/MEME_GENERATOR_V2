import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import AddImage from '../screens/AddImageComponent/AddImage';
import StickerShop from '../screens/StickerShopComponent/StickerShop';
import SavedImage from '../screens/SaveImgComponent/SavedImage'


import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		AddImage:{
			screen:AddImage
		},
		StickerShop: {
			screen: StickerShop
		},
		SavedImage: {
			screen: SavedImage
		},
			
	},
	DrawerConfig
);

export default createAppContainer(DrawerNavigator);