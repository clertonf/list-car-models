const API_BASE_URL = "https://parallelum.com.br/fipe/api/v1/carros";

export type CarBrand = {
  nome: string;
  codigo: string;
};

export type CarModel = {
  nome: string;
  codigo: string;
};

export async function getCarBrands(): Promise<CarBrand[]> {
  const res = await fetch(`${API_BASE_URL}/marcas`);
  if (!res.ok) throw new Error("Erro ao buscar marcas");
  return res.json();
}

export async function getModelsByBrandId(id: string): Promise<CarModel[]> {
  const res = await fetch(`${API_BASE_URL}/marcas/${id}/modelos`);
  if (!res.ok) throw new Error("Erro ao buscar modelos");
  const data = await res.json();
  return data.modelos || [];
}
