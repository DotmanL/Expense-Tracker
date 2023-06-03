import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
  onPress: () => void;
};

function IconButton(props: Props) {
  const { iconName, size, color, onPress } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
});
