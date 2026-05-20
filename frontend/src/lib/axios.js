import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api/v1"
      : `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});
