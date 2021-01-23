// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  console.log(isLoading);
  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator animating={true} />
    </View>
  ) : null;

  // <Modal
  //   transparent={true}
  //   animationType={"none"}
  //   visible={false}
  //   onRequestClose={() => {
  //     console.log("close modal");
  //   }}
  // >
  //   <View style={styles.modalBackground}>
  //     <View style={styles.activityIndicatorWrapper}>
  //       <ActivityIndicator animating={true} color="#000000" size="large" style={styles.activityIndicator} />
  //     </View>
  //   </View>
  // </Modal>
};

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     alignItems: "center",
//     flexDirection: "column",
//     justifyContent: "space-around",
//     backgroundColor: "#00000040",
//   },
//   activityIndicatorWrapper: {
//     backgroundColor: "#FFFFFF",
//     height: 100,
//     width: 100,
//     borderRadius: 10,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   activityIndicator: {
//     alignItems: "center",
//     height: 80,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
