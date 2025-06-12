import { Text, TouchableOpacity } from "react-native";

type CarBrandCardProps = {
  nome: string;
  onPress: () => void;
};

export function CarBrandCard({ nome, onPress }: CarBrandCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-200 rounded-md p-3 mb-3 border border-gray-300"
      activeOpacity={0.7}
    >
      <Text className="text-base font-normal text-gray-800">{nome}</Text>
    </TouchableOpacity>
  );
}
