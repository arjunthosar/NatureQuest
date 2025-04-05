import React, { useState } from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Alert,
    ActionSheetIOS,
    Platform,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
      backgroundColor: "#D4EDDA",
      width: "100%",
      top: 50,
      padding: 20,
      alignItems: "center",
      borderRadius: 30,
  },

});

export default function App() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const openImageOptions = () => {
        if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["Cancel", "Take Photo", "Choose from Gallery"],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        takePhoto()
                    } else if (buttonIndex === 2) {
                        pickImage()
                    }
                }
            )
        } else {
            // For Android, use Alert with options
            Alert.alert("Select Image", "Choose an option", [
                { text: "Take Photo", onPress: takePhoto },
                { text: "Choose from Gallery", onPress: pickImage },
                { text: "Cancel", style: "cancel" },
            ])
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            const uri = result.assets[0].uri
            setSelectedImage(uri)
            checkImage(uri)
        }
    }

    const takePhoto = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

        if (cameraPermission.status !== "granted") {
            Alert.alert("Camera permission is required!")
            return
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            const uri = result.assets[0].uri
            setSelectedImage(uri)
            checkImage(uri)
        }
    }

    const checkImage = async (imageUri: string) => {
        try {
            const formData = new FormData()
            formData.append("image", {
                uri: imageUri,
                type: "image/jpeg",
                name: "photo.jpg",
            } as any)

            const response = await fetch(
                "https://api.inaturalist.org/v1/computervision/score_image",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo5MDk3MjA3LCJleHAiOjE3NDM5NjU2ODR9.Ncyiwy0u-kBD_O-GGHb1DTSi4c5Jb6wfcxC2DznYor8oZePxza4Z95mIHBSGBpWbIZGTRt2asVesGR_dlm_XCA",
                    },
                    body: formData,
                }
            )

            const data = await response.json()
            console.log("📦 API Response:", JSON.stringify(data, null, 2))

            if (data.results && data.results.length > 0) {
                const best = data.results[0]
                const bestMatch = best.taxon?.preferred_common_name || "Unknown species"
                const confidence = best.score

                const response2 = await fetch(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAXm7ckoaOE8pMkQAL3yjqK_tc7UPECtzk",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text: `Reply with "Yes" or "No" only. Is "${bestMatch}" and "Grass" referring to generally the same plant? Low confidence is fine. If plants have name in similar, it is a "yes".`,
                                        },
                                    ],
                                },
                            ],
                        }),
                    }
                )
                const data2 = await response2.json();
                const generatedText = data2.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated";
                
                if (generatedText.includes("Yes")) {
                    Alert.alert("Good job! That is indeed grass.", bestMatch) 
                } else if (generatedText.includes("No")) {
                    Alert.alert("❌ No Match", bestMatch)
                } else {
                    Alert.alert(bestMatch, generatedText)
                }
                
                if (generatedText.includes("Yes")) {
                    router.push("/app")
                }
            } else {
                Alert.alert("❌ No Match", "Try a clearer or closer photo.")
            }
        } catch (error) {
            console.error("Error checking image:", error)
            Alert.alert("Error", "Something went wrong while checking the image.")
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/life.png")} style={{width: "100%", height: "100%", position: "absolute"}}/>
            <Text style={{ color: '#006400', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
              Welcome to Nature Quest!
            </Text>
            <Text style={{ color: '#006000', fontSize: 15, textAlign: 'center', margin: 20 }}>
              This is a game about finding things in nature! Throughout this experience you will be finding different types of plants and animals. The main objective for you is to reach Level 5 and beat the game. Good luck!
            </Text>
            <Text style={{ color: '#00A000', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
              Start by finding some grass! ⬇️
            </Text>
            <TouchableOpacity onPress={openImageOptions} style={styles.button}>
                <Image
                    source={require("../assets/images/camicon.png")}
                    style={{ width: 100, height: 100 }}
                />
            </TouchableOpacity>
        </View>
    )
}