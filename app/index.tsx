import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  title: {
    fontSize: 40,
    color: "#2E7D32"
  },
  button: {
    borderRadius: 10,
    height: 50,
    width: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 25,
    color: "#2E7D32",
  }
});

export default function Index() {
  return (
      <View style={styles.container}>
        <Image source={require("../assets/images/nature.png")} style={styles.background}/>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
  );
}
