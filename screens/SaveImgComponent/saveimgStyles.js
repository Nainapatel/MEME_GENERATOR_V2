import { StyleSheet } from 'react-native';

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
      }
    })