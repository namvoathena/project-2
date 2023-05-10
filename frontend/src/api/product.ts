import { GetQueryProductList, GetQueryProduct } from "@models/product.model";
import axiosClient from "./axiosClient";

export const getListProduct = async (params: GetQueryProductList) => {
  let url = `/product?page=${params.page}&limit=${params.limit}`;
  if (params.search) url += `&search=${params.search}`;
  if (params.category) url += `&category=${params.category}`;
  if (params.sort) url += `&sort=${params.sort}`;
  if (params.brand) url += `&brand=${params.brand}`;
  if (params.seller) url += `&seller=${params.seller}`;
  if (params.price) url += `&price=${params.price}`;
  if (params.color) url += `&color=${params.color}`;
  return await axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const getSingleProduct = async (params: GetQueryProduct) => {
  let url = `/product/${params.id}`;
  return await axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const getAllProductIds = async () => {
  let url = `/product/all/ids`;
  return await axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const getAllProductFilterOptions = async () => {
  let url = `/product-filter`;
  return await axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};
