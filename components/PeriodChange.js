import { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Pressable } from "react-native";

export default function PeriodChange({ value, onChange }) {
  // Support both controlled (value/onChange from parent) and uncontrolled usage
  const [internalSelected, setInternalSelected] = useState("Monthly");
  const selected = value ?? internalSelected;

  const [open, setOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState(null);
  const triggerRef = useState(null);

  const other = selected === "Monthly" ? "Weekly" : "Monthly";

  const handleOpen = () => {
    triggerRef[0]?.measure((fx, fy, width, height, px, py) => {
      setTriggerLayout({ x: px, y: py + height + 6, width });
      setOpen(true);
    });
  };

  const handleSelect = (next) => {
    if (onChange) {
      onChange(next);
    } else {
      setInternalSelected(next);
    }
    setOpen(false);
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {/* Trigger */}
      <TouchableOpacity
        ref={(r) => (triggerRef[0] = r)}
        onPress={handleOpen}
        style={{
          backgroundColor: "#FFFFFF4D",
          borderRadius: 999,
          paddingHorizontal: 18,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text style={{ color: "#000", fontSize: 15, fontWeight: "500" }}>
          {selected}
        </Text>
        <Text style={{ color: "#000", fontSize: 11 }}>
          {open ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {/* Dropdown via Modal */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}>
          {triggerLayout && (
            <View
              style={{
                position: "absolute",
                top: triggerLayout.y,
                left: triggerLayout.x,
                backgroundColor: "#FFFFFF4D",
                borderRadius: 999,
                paddingHorizontal: 18,
                paddingVertical: 10,
                minWidth: triggerLayout.width,
                shadowColor: "#f0f0f0",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 8,
              }}
            >
              <TouchableOpacity onPress={() => handleSelect(other)}>
                <Text style={{ color: "#000", fontSize: 15, fontWeight: "500" }}>
                  {other}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}