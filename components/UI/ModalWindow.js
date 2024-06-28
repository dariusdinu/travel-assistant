import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../../styles/colors";
import iconGenerator from "../../utils/IconGenerator";

export default function ModalWindow({
  isVisible,
  onClose,
  iconType,
  message,
  onConfirm,
}) {
  const [isModalVisible, setModalVisible] = useState(isVisible);

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        backdropColor={Colors.primary}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={400}
        animationOutTiming={500}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={400}
      >
        <View style={styles.modalView}>
          {iconGenerator(iconType, 26, Colors.accent)}
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onClose && (
              <Pressable style={styles.buttonClose} onPress={onClose}>
                <Text style={styles.buttonCloseText}>Cancel</Text>
              </Pressable>
            )}
            {onConfirm && (
              <Pressable style={styles.buttonConfirm} onPress={onConfirm}>
                <Text style={styles.buttonConfirmText}>OK</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 2,
  },
  buttonContainer: {
    alignItems: "space-between",
    flexGrow: 1,
    marginTop: 20,
    gap: 50,
    flexDirection: "row",
  },
  buttonConfirm: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonConfirmText: {
    fontFamily: "Quicksand-Bold",
    color: Colors.textLight,
  },
  buttonClose: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonCloseText: {
    fontFamily: "Quicksand-Bold",
    color: "gray",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
  },
});
