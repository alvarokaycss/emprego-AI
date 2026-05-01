const API_URL = "http://127.0.0.1:8000";

export const getJobs = async () => {
  const response = await fetch(`${API_URL}/jobs`);
  if (!response.ok) throw new Error("Erro ao buscar vagas");
  return response.json();
};