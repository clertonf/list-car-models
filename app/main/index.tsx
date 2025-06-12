import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  CarBrandCard,
  ErrorScreen,
  Screen,
  Text,
} from "@/components";
import { useAuth } from "@/contexts";
import { useRefresh } from "@/hooks";
import { CarBrand, getCarBrands } from "@/services";
import { LogOut } from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();

  const { logout } = useAuth();

  const {
    data: brands = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<CarBrand[]>({
    queryKey: ["car-brands"],
    queryFn: getCarBrands,
  });

  const { refreshing, onRefresh } = useRefresh(refetch);

  const handlePress = (id: string) => {
    router.push(`/main/models/${id}`);
  };

  async function handleLogout() {
    Alert.alert(
      "Sair",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: logout,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }

  if (isError) {
    return <ErrorScreen message="Erro ao carregar as marcas." />;
  }

  return (
    <Screen className="flex-1 p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text bold variant="headingLarge">
          Marcas de Carros
        </Text>

        <TouchableOpacity onPress={handleLogout}>
          <LogOut size={24} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <FlatList
          data={brands}
          keyExtractor={(item) => item?.codigo}
          renderItem={({ item }) => (
            <CarBrandCard
              nome={item?.nome}
              onPress={() => handlePress(item?.codigo)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <Text className="text-lg font-semibold mb-2">
              Marcas disponíveis
            </Text>
          }
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              Nenhuma marca encontrada.
            </Text>
          }
        />
      )}
    </Screen>
  );
}
