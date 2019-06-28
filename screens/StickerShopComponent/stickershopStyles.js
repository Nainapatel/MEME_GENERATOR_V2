import { StyleSheet } from 'react-native';

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
    })