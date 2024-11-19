import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface SelectOptionsProps {
  options: string[];
  setValue: (key: string, value: string) => void;
}

export default function Select({ options, setValue }: SelectOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const open = () => setIsOpen((state) => !state);

  const handleSelect = (selectedValue: string) => {
    setValue("type", selectedValue);
    setSelectValue(selectedValue);
  };

  return (
    <>
      <Pressable style={styles.selectButton} onPress={open}>
        <View style={styles.selectContent}>
          <Text style={styles.selectText}>
            {selectValue ? selectValue : "Selecione uma opção"}
          </Text>
        </View>
      </Pressable>

      <Modal
        transparent
        animationType="slide"
        visible={isOpen}
        onRequestClose={open}
      >
        <TouchableWithoutFeedback onPress={open}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={selectValue ?? "Selecione uma opção"}
                onValueChange={(selectedValue) => handleSelect(selectedValue)}
                style={styles.picker}
              >
                {options.map((option) => (
                  <Picker.Item label={option} value={option} key={option} />
                ))}
              </Picker>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    borderRadius: 6,
    borderColor: "#4B5563",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectText: {
    color: "#ffffff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1f2937",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
  },
  picker: {
    width: "100%",
    color: "#ffffff",
  },
});
