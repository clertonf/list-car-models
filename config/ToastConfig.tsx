import { Text } from "@/components";
import { CircleCheck, CircleX, Info } from "lucide-react-native";
import { Platform, StyleSheet, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface ExtendedToastProps extends BaseToastProps {
  icon?: React.ReactNode;
  leftColor?: string;
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 24 : 0,
    width: "92%",
    borderLeftWidth: 4,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  iconAndTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  text1: {
    fontWeight: "700",
    fontSize: 14,
  },
  text2: {
    fontWeight: "400",
    fontSize: 14,
  },
});

export const toastConfig = {
  success: (props: ExtendedToastProps) => {
    return (
      <View
        {...props}
        style={[
          styles.container,
          { borderLeftColor: "#2ECE23", backgroundColor: "#f0fff4" },
        ]}
      >
        <View style={styles.iconAndTitle}>
          {props.icon || <CircleCheck color="#2ECE23" size={20} />}
          <Text style={[styles.text1, { color: "#276749" }]}>
            {props.text1}
          </Text>
        </View>
        {props.text2 && (
          <Text style={[styles.text2, { color: "#276749" }]}>
            {props.text2}
          </Text>
        )}
      </View>
    );
  },
  error: (props: ExtendedToastProps) => {
    return (
      <View
        {...props}
        style={[
          styles.container,
          { borderLeftColor: "#CE1C1C", backgroundColor: "#fff5f5" },
        ]}
      >
        <View style={styles.iconAndTitle}>
          {props.icon || <CircleX color="#CE1C1C" size={20} />}
          <Text style={[styles.text1, { color: "#742a2a" }]}>
            {props.text1}
          </Text>
        </View>
        {props.text2 && (
          <Text style={[styles.text2, { color: "#742a2a" }]}>
            {props.text2}
          </Text>
        )}
      </View>
    );
  },
  info: (props: ExtendedToastProps) => {
    return (
      <View
        {...props}
        style={[
          styles.container,
          { borderLeftColor: "#2F52E0", backgroundColor: "#ebf2ff" },
        ]}
      >
        <View style={styles.iconAndTitle}>
          {props.icon || <Info color="#2F52E0" size={20} />}
          <Text style={[styles.text1, { color: "#1d2e8a" }]}>
            {props.text1}
          </Text>
        </View>
        {props.text2 && (
          <Text style={[styles.text2, { color: "#1d2e8a" }]}>
            {props.text2}
          </Text>
        )}
      </View>
    );
  },
  custom: (props: ExtendedToastProps) => {
    return (
      <View
        {...props}
        style={[
          styles.container,
          {
            borderLeftColor: props.leftColor || "#000",
            backgroundColor: "#f9fafb",
          },
        ]}
      >
        <View style={styles.iconAndTitle}>
          {props.icon}
          <Text style={[styles.text1, { color: "#111" }]}>{props.text1}</Text>
        </View>
        {props.text2 && (
          <Text style={[styles.text2, { color: "#111" }]}>{props.text2}</Text>
        )}
      </View>
    );
  },
};
