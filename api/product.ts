import { api } from "./index";
import { IReviewSentResponse, ProductModel } from "../interfaces/product.interface";
import { IReviewForm } from "../components/ReviewForm/ReviewForm.interface";

export const getProductsByCategory = (category: string, limit = 10) => api.post<ProductModel[]>("/api/product/find", {
  category,
  limit,
});

export const sendReview = (review: IReviewForm & { productId: string }) => api.post<IReviewSentResponse>("/api/review/create-demo2", {
  ...review,
});