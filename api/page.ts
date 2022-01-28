import { api } from "./index";
import { TopPageModel } from "../interfaces/page.interface";

export const getPageByAlias = (alias: string) => api.get<TopPageModel>(`/api/top-page/byAlias/${alias }`);