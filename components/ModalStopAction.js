import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";

export default function ModalStopAction({
  isVisible,
  onClose,
  onEdit,
  onDelete,
}) {
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
          {iconGenerator("alert-circle-outline", 26, Colors.accent)}
          <Text style={styles.modalText}>Choose an action</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.buttonCloseText}>Cancel</Text>
            </Pressable>
            <View style={styles.actionButtons}>
              {onEdit && (
                <Pressable style={styles.buttonOption} onPress={onEdit}>
                  <Text style={styles.buttonOptionText}>Edit</Text>
                </Pressable>
              )}
              {onDelete && (
                <Pressable style={styles.buttonDeleteOption} onPress={onDelete}>
                  <Text style={styles.buttonDeleteText}>Delete</Text>
                </Pressable>
              )}
            </View>
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonOption: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonDeleteOption: {
    borderRadius: 20,
  },
  buttonDeleteText: {
    fontFamily: "Quicksand-Bold",
    color: Colors.error,
  },
  buttonOptionText: {
    fontFamily: "Quicksand-Bold",
    color: Colors.textLight,
  },
  buttonClose: {
    borderRadius: 20,
  },
  buttonCloseText: {
    fontFamily: "Quicksand-Bold",
    color: "gray",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
  },
});
