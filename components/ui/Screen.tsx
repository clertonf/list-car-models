import { useAppSafeArea } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";

import { ScrollViewContainer, ViewContainer } from "./ScreenContainer";
import { Text } from "./Text";

import { twMerge } from "tailwind-merge";

interface ScreenProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  className?: string;
}

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
  className,
}: ScreenProps) {
  const navigation = useNavigation();
  const { top, bottom } = useAppSafeArea();
  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container
        backgroundColor="transparent"
        className={twMerge("px-6", className)}
        style={{
          paddingTop: top,
          paddingBottom: bottom,
        }}
      >
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-6"
          >
            <ArrowLeft />
            <Text semiBold className="ml-2">
              voltar
            </Text>
          </TouchableOpacity>
        )}
        {children}
      </Container>
    </KeyboardAvoidingView>
  );
}
