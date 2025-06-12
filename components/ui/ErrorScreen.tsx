import { Screen, Text } from "@/components";
import { View } from "react-native";

type ErrorScreenProps = {
  message: string;
  canGoBack?: boolean;
};

export function ErrorScreen({ message, canGoBack }: ErrorScreenProps) {
  return (
    <Screen canGoBack={canGoBack}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg font-bold text-center">
          {message}
        </Text>
      </View>
    </Screen>
  );
}
