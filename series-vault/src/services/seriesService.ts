import axios from "axios";
import type { Series } from "../types/series.types";

const API_URL = "http://localhost:3001/api/series";

// Hämtar alla serier från backend
export const getAllSeries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
 // Hämtar en serie baserat på ID
export const getSeriesById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
// Skapar en ny serie. Omit id eftersom det genereras av backend
export const createSeries = async (series: Omit<Series, "id">) => {
  const response = await axios.post(API_URL, series);
  return response.data;
};
// Uppdaterar en serie baserat på ID
export const updateSeries = async (
  id: number,
  updatedSeries: Omit<Series, "id">) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    updatedSeries
  );
  return response.data;
};
// Tar bort en serie baserat på ID
export const deleteSeries = async (id: number) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );
  return response.data;
};