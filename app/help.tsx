import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';

export default function InstructionsPage() {
  return (
    <ImageBackground
      source={require('../assets/images/bored.jpg')} // replace with your image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Instructions</Text>
        <ScrollView contentContainerStyle={styles.instructionsContainer}>
          {/* Updated Instructions */}
          <Text style={styles.instructionText}>
            1. First, click on the camera button.
          </Text>
          <Text style={styles.instructionText}>
            2. You will then be given an option to choose a photo from your gallery or take a new photo using your camera.
          </Text>
          <Text style={styles.instructionText}>
            3. Once you add the image, the app will check if the plant is correct.
          </Text>
          <Text style={styles.instructionText}>
            4. If you're right, you will earn 2 points. If not, you get 0 points.
          </Text>
          <Text style={styles.instructionText}>
            5. As you reach higher levels, the quests will get harder and the animals/plants will get harder to find!
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(240, 255, 240, 0.8)', // semi-transparent background for text readability
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionsContainer: {
    paddingBottom: 40,
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#2E7D32',
    lineHeight: 24,
  },
});