// // SplashScreen.js
// import React, { useEffect, useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import { Video } from "expo-av";
// import { useNavigation } from "@react-navigation/native";
// import * as SplashScreen from "expo-splash-screen";

// const SplashScreenComponent = () => {
//   const navigation = useNavigation();
//   const video = useRef(null);

//   useEffect(() => {
//     SplashScreen.preventAutoHideAsync();
//     const timeout = setTimeout(() => {
//       navigation.replace("Root"); // Navigate to your main component after the video ends
//     }, 5000); // Adjust this duration to match your video length

//     return () => clearTimeout(timeout);
//   }, [navigation]);

//   const handleVideoLoad = async () => {
//     await SplashScreen.hideAsync();
//     video.current.playAsync();
//   };

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={video}
//         source={require("../../assets/Splash-Video.mp4")}
//         style={styles.video}
//         resizeMode="cover"
//         shouldPlay
//         onLoad={handleVideoLoad}
//         onPlaybackStatusUpdate={(status) => {
//           if (status.didJustFinish) {
//             navigation.replace("Root");
//           }
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default SplashScreenComponent;
