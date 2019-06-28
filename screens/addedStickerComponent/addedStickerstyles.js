import { StyleSheet ,Platform} from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    main: {
      flexDirection: "row",
      flex: 1,
      backgroundColor: "#fff"
    },
    card: {
      flexDirection: "row",
      margin: 5,
      backgroundColor: "pink",
      padding: 5
    },
    iconButton: {
      height: 50,
      width: 50
    },
    // GridViewContainer: {
    //   flex: 1,
    //   width: 50,
    //   height: 50,
    //   margin: 5,
    //   borderColor: "#fff",
    //   borderRadius: 8,
    //   borderWidth: 0.5
    // },
    image: {
      // height:'100%',
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: "#fff",
      width: 60,
      height:60,
      margin:3
    },
    bottomView:{
      width: '100%', 
      height: 50, 
      backgroundColor: 'white', 
      position: 'absolute',
      padding:10,
      bottom: 0,
      elevation:10
    },
    MainContainer:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

  });
  