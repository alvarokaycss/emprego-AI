const API_URL = "http://127.0.0.1:8000";

export const getJobs = async (page = 1) => {
  const response = await fetch(`${API_URL}/jobs?page=${page}&limit=5`);
  if (!response.ok) throw new Error("Erro ao buscar vagas");
  return response.json();
};