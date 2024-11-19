import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { createTransactionType } from "../app/create.transaction";
import { Calendar1 } from "lucide-react-native";

type CalendarProps = {
  setValue: UseFormSetValue<createTransactionType>;
};

export default function Calendar({ setValue }: CalendarProps) {
  const [calendarValue, setCalendarValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
 
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleCalendar = (date: string) => {
    setValue("date", date);
    setCalendarValue(date);
    close();
  };

  return (
    <React.Fragment>
      <Text className="text-gray-300">Data</Text>
      <Pressable
        className="rounded-md max-w-md active:opacity-80 shadow-md transition-colors duration-300"
        onPress={open}
      >
        <View className="flex-row items-center rounded-md px-4 py-3 border border-gray-600">
          <Text className="text-white font-bold mr-2">
            {calendarValue ? calendarValue : "Selecione a data"}
          </Text>
          <Calendar1 color="#fff" size={20} />
        </View>
      </Pressable>

      <Modal
        transparent
        animationType="slide"
        visible={isOpen}
        onRequestClose={close}
      >
        <TouchableWithoutFeedback onPress={close}>
          <View style={calendarStyle.overlay}>
            <DatePicker mode="calendar" onSelectedChange={handleCalendar} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
}

const calendarStyle = StyleSheet.create({
  overlay: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    padding: 8,
    gap: 5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
});
