import { useEffect, useRef } from 'react';
import { View, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

const { height } = Dimensions.get('window');

const CustomModal = ({ visible, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(onClose);
    }
  }, [visible, slideAnim, onClose]);

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainerWrapper}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>&#x2716;</Text>
          </TouchableOpacity>
          {children}
        </Animated.View>
        <View style={styles.afterElement} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerWrapper: {
    justifyContent: 'flex-end',
    position: 'relative',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  afterElement: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
});

export default CustomModal;
