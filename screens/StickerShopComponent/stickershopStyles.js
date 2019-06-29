import { StyleSheet , Platform} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
      },
      card: {
        elevation: 5,
        flexDirection: "row",
        margin: 5,
        backgroundColor: "#e7e7e7",
        padding: 5
      },
      iconButton: {
        height: 35,
        width: 35,
        right: 0
      },
      activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 80,
        color:"#bc2b78",
      },
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
      }
    })