import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import * as Sharing from "expo-sharing";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState<{
    localUri: string;
  }>(null);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
    console.log(pickerResult);
  };
  let openShareDialogAsync = async () => {
    if (Platform.OS === "web") {
      alert("Uh oh, sharing isn't available on your platform");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
  },
  instructions: { color: "#888", fontSize: 18, marginHorizontal: 15 },
  button: { backgroundColor: "blue", padding: 20, borderRadius: 5 },
  buttonText: { fontSize: 20, color: "#fff" },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
