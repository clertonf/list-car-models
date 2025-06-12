import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  CarBrandCard,
  ErrorScreen,
  Screen,
  Text,
} from "@/components";
import { CarBrand, getCarBrands } from "@/services";

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: brands = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<CarBrand[]>({
    queryKey: ["car-brands"],
    queryFn: getCarBrands,
  });

  const handlePress = (id: string) => {
    router.push(`/main/models/${id}`);
  };

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }

  if (isError) {
    return <ErrorScreen message="Erro ao carregar as marcas." />;
  }

  return (
    <Screen className="flex-1 p-4">
      <Text bold variant="headingLarge" className="mb-4">
        Marcas de Carros
      </Text>

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
        />
      )}
    </Screen>
  );
}
