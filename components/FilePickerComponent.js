import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Colors from "../styles/colors";

export default function FilePickerComponent({ onFilePicked }) {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFile(result.assets[0].name);

      onFilePicked(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Add additional files</Text>
      </TouchableOpacity>
      {file && <Text style={styles.fileName}>{file}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  fileName: {
    fontSize: 14,
    color: Colors.textDark1,
  },
});
