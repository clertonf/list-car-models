import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";

import {
  ActivityIndicator,
  CarModelCard,
  ErrorScreen,
  Screen,
  Text,
} from "@/components";
import { CarModel, getModelsByBrandId } from "@/services";

export default function ModelsScreen() {
  const { id } = useLocalSearchParams();

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: models = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<CarModel[]>({
    queryKey: ["car-models", id],
    queryFn: () => getModelsByBrandId(id as string),
    enabled: !!id,
  });

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }

  if (isError) {
    return (
      <ErrorScreen
        canGoBack
        message={`Erro ao carregar os modelos da marca ${id}.`}
      />
    );
  }

  return (
    <Screen className="flex-1 p-4" canGoBack>
      <Text bold variant="headingLarge" className="mb-4">
        Modelos da Marca {id}
      </Text>

      {isLoading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <FlatList
          data={models}
          keyExtractor={(item) => item.codigo}
          renderItem={({ item }) => <CarModelCard nome={item.nome} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Screen>
  );
}
