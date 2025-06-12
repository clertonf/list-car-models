import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Página não encontrada" }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">Essa tela não existe.</Text>
        <Link href="/main" className="py-4">
          <Text className="text-blue-500 text-base">
            Voltar para a tela inicial
          </Text>
        </Link>
      </View>
    </>
  );
}
