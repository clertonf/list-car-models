import { Text, View } from "react-native";

type CarModelCardProps = {
  nome: string;
};

export function CarModelCard({ nome }: CarModelCardProps) {
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-300">
      <Text className="text-lg font-bold text-gray-500 tracking-wide">
        {nome}
      </Text>
    </View>
  );
}
