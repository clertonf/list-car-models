import { useState } from "react";

export function useRefresh<T>(refetch: () => Promise<T>) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }

  return { refreshing, onRefresh };
}
