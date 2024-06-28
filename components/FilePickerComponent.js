import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";

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
        {iconGenerator("document-outline", 24, Colors.accent)}
        <Text style={styles.buttonText}>
          Add additional files (QR codes, tickets, passes)
        </Text>
      </TouchableOpacity>
      {file && (
        <View style={styles.fileInfo}>
          {iconGenerator("document", 24, Colors.accent)}
          <Text style={styles.fileName}>{file}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.textDark1,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Quicksand-SemiBold",
  },
  fileName: {
    fontSize: 14,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
  },
  fileInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
