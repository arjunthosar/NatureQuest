import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

let styles = StyleSheet.create({
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
  }
})

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F3FAEF",
      }}
    >
      <Image source={require("../assets/images/logo.png")} style={{width: 400, height: 400}} />
      <TouchableOpacity style={styles.button} onPress={() => {}}> {/*TODO: navigate to login page*/}
        <Text style={{fontSize: 25, color: "#2E7D32"}}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}
