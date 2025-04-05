import { StyleSheet, Text, View } from "react-native";

let styles = StyleSheet.create({
  title: {
    fontSize: 20,
  }
})

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Nature Quest</Text>
    </View>
  );
}
