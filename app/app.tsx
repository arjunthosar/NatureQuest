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
    ScrollView
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"

let points = 0

export default function App() {
        const [selectedImage, setSelectedImage] = useState<string | null>(null)
    
        const openImageOptions = (prompt: string) => {
            if (Platform.OS === "ios") {
                ActionSheetIOS.showActionSheetWithOptions(
                    {
                        options: ["Cancel", "Take Photo", "Choose from Gallery"],
                        cancelButtonIndex: 0,
                    },
                    (buttonIndex) => {
                        if (buttonIndex === 1) {
                            takePhoto(prompt)
                        } else if (buttonIndex === 2) {
                            pickImage(prompt)
                        }
                    }
                )
            } else {
                // For Android, use Alert with options
                Alert.alert("Select Image", "Choose an option", [
                    { text: "Take Photo", onPress: () => takePhoto(prompt) },
                    { text: "Choose from Gallery", onPress: () => pickImage(prompt) },
                    { text: "Cancel", style: "cancel" },
                ])
            }
        }
    
        const pickImage = async (prompt: string) => {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            })
    
            if (!result.canceled) {
                const uri = result.assets[0].uri
                setSelectedImage(uri)
                checkImage(uri, prompt)
            }
        }
    
        const takePhoto = async (prompt: string) => {
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
                checkImage(uri, prompt)
            }
        }
    
        const checkImage = async (imageUri: string, prompt: string) => {
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
                                                text: `Reply with "Yes" or "No" only. Is "${bestMatch}" and "${prompt}" referring to similar plants? Low confidence is fine.`,
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
                        Alert.alert(`Good job! That is indeed a ${prompt}. You get 2 points!`, bestMatch) 
                        points += 2
                    } else if (generatedText.includes("No")) {
                        Alert.alert("❌ No Match", bestMatch)
                    } else {
                        Alert.alert(bestMatch, generatedText)
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
            <ScrollView style={styles.container}>
                <Text style= {{fontSize: 30, color: "#2E7D32", fontWeight: "bold", textAlign: "center"}}>Level 1:</Text>
                <Text style={{fontSize: 30, color: "#2E7D32", fontWeight: "bold", textAlign: "center"}}>Take a picture of a dandelion!</Text>
                <TouchableOpacity onPress={() => {openImageOptions("dandelion")}} style={styles.button}>
                    <Image
                        source={require("../assets/images/camicon.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 30, color: "#2E7D32", fontWeight: "bold", textAlign: "center"}}>Take a picture of an aloe vera!</Text>
                <TouchableOpacity onPress={() => {openImageOptions("aloe vera")}} style={styles.button}>
                    <Image
                        source={require("../assets/images/camicon.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 30, color: "#2E7D32", fontWeight: "bold", textAlign: "center"}}>Take a picture of a squirrel!</Text>
                <TouchableOpacity onPress={() => {openImageOptions("squirrel")}} style={styles.button}>
                    <Image
                        source={require("../assets/images/camicon.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 30, color: "#2E7D32", fontWeight: "bold", textAlign: "center"}}>Take a picture of a maple tree!</Text>
                <TouchableOpacity onPress={() => {openImageOptions("maple tree")}} style={styles.button}>
                    <Image
                        source={require("../assets/images/camicon.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 30, color: "#2E7D32", fontWeight: "bold", textAlign: "center"}}>Take a picture of a robin!</Text>
                <TouchableOpacity onPress={() => {openImageOptions("robin")}} style={styles.button}>
                    <Image
                        source={require("../assets/images/camicon.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </TouchableOpacity>

            <View style={{flexDirection: 'row', marginTop: 20, width: '100%'}}>
              <TouchableOpacity onPress={() => {router.push({pathname: "/leaderboard", params: {points: points}})}} style={[styles.button, {width: '50%'}]}>
                <Image source={require("../assets/images/leaderboard.png")} style={{width: 40, height: 40}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {router.push("/help")}} style={[styles.button, {width: '50%'}]}>
                <Image source={require("../assets/images/help.png")} style={{width: 40, height: 40}} />
              </TouchableOpacity>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
      backgroundColor: "#D4EDDA",
      width: "100%",
      marginTop: 20,
      padding: 20,
      alignItems: "center",
      borderRadius: 30,
  },

});

