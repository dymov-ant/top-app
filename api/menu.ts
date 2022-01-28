import { api } from "./index";
import { MenuItem } from "../interfaces/menu.interfase";

export const getMenuByFirstCategory = (firstCategory: number) => api.post<MenuItem[]>("/api/top-page/find", {firstCategory});