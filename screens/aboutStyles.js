import { StyleSheet } from 'react-native';
import {

    Platform
  } from "react-native";

export default StyleSheet.create({
 
      text1: {
        fontSize: 21,
        color: "black",
        justifyContent: "center",
        margin: 10,
        fontWeight: "bold",
        marginLeft:45
      },
    
      header:{
        backgroundColor: "#ffffff",
        height: Platform.OS === "android" ? 55 : 65
      },
      title:{
         flex: 7, 
         flexDirection: "column" 
      },
      img:{
          height: 100,
          width: 100,
          borderRadius: 50
        
      }
    });
    

  