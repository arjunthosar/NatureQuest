import { router } from "expo-router"
import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native"
import { Menu, Button, Provider } from "react-native-paper"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [menuVisible, setMenuVisible] = useState(false)

  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)

  const handleSelectLocation = (loc) => {
    setLocation(loc)
    closeMenu()
  }

  const handleLogin = () => {
    if (!username || !password || !location) {
      Alert.alert("Oops!", "Please fill in all fields.")
      return
    }
    router.push("/tutorial")
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>🌿 Touch Grass 🌿</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#000"
          value={username}
          onChangeText={setUsername}
        />

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.dropdownButton} onPress={openMenu}>
              <Text style={{ color: location ? "#000" : "#000", fontSize: 16 }}>
                {location || "Select Location..."}
              </Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => handleSelectLocation("Ontario")}
            title="Ontario"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Alberta")}
            title="Alberta"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Manitoba")}
            title="Manitoba"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Nova Scotia")}
            title="Nova Scotia"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("British Columbia")}
            title="British Columbia"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("New Brunswick")}
            title="New Brunswick"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Newfoundland")}
            title="Newfoundland"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Prince Edward Island")}
            title="Prince Edward Island"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Quebec")}
            title="Quebec"
          />
          <Menu.Item
            onPress={() => handleSelectLocation("Saskatchewan")}
            title="Saskatchewan"
          />
        </Menu>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F3FAEF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2E7D32",
  },
  input: {
    height: 45,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    color: "#000",
    width: "100%",
  },
  dropdownButton: {
    height: 45,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#FFF",
    width: "100%", // will now actually apply!
  },

  dropdownWrapper: {
    height: 45,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#FFF",
    alignSelf: "stretch", // <-- important
  },

  dropdownText: {
    color: "#000",
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: 85,
  },
  buttonText: {
    fontSize: 17,
    color: "#FFF",
    fontWeight: "bold",
  },
})