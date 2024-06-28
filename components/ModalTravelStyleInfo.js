import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Colors from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import iconGenerator from "../utils/IconGenerator";

const travelStyleDescriptions = {
  explorer: {
    title: "Explorer",
    description:
      "Explorers seek to discover hidden gems and enjoy spontaneous adventures. They prefer off-the-beaten-path locations and love immersing themselves in local cultures and experiences.",
    preferredActivities:
      "Preferred Activities: Walking tours, historical sites, local markets, interacting with locals, exploring less-known areas.",
    icon: "compass",
  },
  relaxed: {
    title: "Relaxed",
    description:
      "Relaxed travelers prioritize leisure and comfort. They enjoy slow-paced activities, such as lounging on beaches, visiting spas, and staying at luxury accommodations.",
    preferredActivities:
      "Preferred Activities: Spa visits, beach lounging, scenic drives, leisurely strolls, comfortable accommodations with amenities.",
    icon: "bed",
  },
  adventurous: {
    title: "Adventurous",
    description:
      "Adventurous travelers crave excitement and thrill. They seek out activities like hiking, rock climbing, and other adrenaline-pumping experiences.",
    preferredActivities:
      "Preferred Activities: Hiking, mountain climbing, water sports, zip-lining, adventure sports, and exploring rugged terrains.",
    icon: "trail-sign",
  },
  cultural: {
    title: "Cultural Enthusiast",
    description:
      "Cultural enthusiasts are passionate about learning and experiencing the art, history, and traditions of the places they visit. They prioritize museums, galleries, performances, and other cultural institutions.",
    preferredActivities:
      "Preferred Activities: Visiting museums and galleries, attending cultural performances and festivals, exploring historical landmarks, taking guided cultural tours.",
    icon: "library",
  },
  gourmet: {
    title: "Gourmet",
    description:
      "Gourmet travelers are food lovers who want to experience the best culinary delights. They seek out renowned restaurants, food markets, and cooking classes.",
    preferredActivities:
      "Preferred Activities: Dining at top restaurants, food and wine tastings, culinary tours, cooking classes, visiting markets and local food producers.",
    icon: "restaurant",
  },
  nature: {
    title: "Nature Lover",
    description:
      "Nature lovers appreciate the great outdoors. They enjoy activities such as hiking, camping, and visiting national parks to experience natural beauty.",
    preferredActivities:
      "Preferred Activities: Hiking in nature reserves, wildlife watching, camping, bird watching, visiting botanical gardens and natural parks.",
    icon: "leaf",
  },
};

export default function ModalTravelStyleInfo({ isVisible, onClose }) {
  return (
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
      <ScrollView style={styles.modalView}>
        <Text style={styles.modalTitle}>Traveling Styles</Text>
        {Object.entries(travelStyleDescriptions).map(([key, details]) => (
          <View key={key} style={styles.travelStyleContainer}>
            <View style={styles.titleContainer}>
              <View>{iconGenerator(details.icon, 20, Colors.textDark1)}</View>
              <Text style={styles.travelStyleTitle}>{details.title} </Text>
            </View>
            <Text style={styles.travelStyleDescription}>
              {details.description}
            </Text>
            <Text style={styles.travelStyleActivities}>
              {details.preferredActivities}
            </Text>
          </View>
        ))}
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
          <Text style={styles.buttonCloseText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  modalTitle: {
    marginBottom: 32,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
  },
  travelStyleContainer: {
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  travelStyleTitle: {
    fontSize: 20,
    fontFamily: "Quicksand-Bold",
    color: Colors.textDark1,
    marginBottom: 5,
  },
  travelStyleDescription: {
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    color: Colors.textDark1,
    marginBottom: 5,
  },
  travelStyleActivities: {
    fontSize: 14,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark1,
    marginBottom: 20,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 100,
  },
  buttonCloseText: {
    color: Colors.textLight,
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
  },
});
