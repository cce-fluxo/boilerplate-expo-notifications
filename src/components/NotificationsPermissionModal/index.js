import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const NotificationsPermissionModal = ({
  isNotificationsPermissionModalVisible,
  message,
  onPress,
  buttonText,
}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNotificationsPermissionModalVisible}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View style={styles.modalTopLine} />

          <Text style={styles.messageTextStyle}>{message}</Text>

          <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    minHeight: 180,
    position: "absolute",
    bottom: 0,
    backgroundColor: "grey",
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: "10%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTopLine: {
    width: 90,
    borderBottomWidth: 5,
    borderRadius: 4,
    borderColor: "white",
    marginBottom: 30,
  },
  messageTextStyle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 40,
  },
  buttonStyle: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: "lightblue",
    borderWidth: 0,
    elevation: 0,
    width: 200,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationsPermissionModal;
