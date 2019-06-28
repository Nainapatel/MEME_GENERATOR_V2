import { StyleSheet, Platform , Dimensions } from 'react-native';
let {width, height} = Dimensions.get('screen');
export default StyleSheet.create({
    input: {
        alignSelf: "stretch",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 5,
        padding: 5
      },
      image: {
        height: "100%",
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#fff"
      },
      selectImage: {
        height: 600,
        width: "100%"
      },
      GridViewContainer: {
        flex: 1,
        height: 150,
        margin: 5,
        elevation: 5,
        backgroundColor: "#ffffff",
        borderColor: "#fff",
        borderRadius: 8,
        borderWidth: 0.5
      },
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70
      },
      activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80
      },
      header:{
        backgroundColor: "#ffffff",
        height: Platform.OS === "android" ? 55 : 65
      },
      title:{
         flex: 7, 
         flexDirection: "column" 
      },
      text1: {
        fontSize: 21,
        color: "black",
        justifyContent: "center",
        margin: 10,
        fontWeight: "bold",
        marginLeft:35
      },
      selectImage:{
      marginLeft:15,
      marginRight: 15,
      marginTop:20,
        width:350,
        height:350
      }
      
    })