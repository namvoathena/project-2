export interface ProductPagination {
  current_page: number;
  last_page: number;
  limit: number;
  total: number;
}

export interface ProductImage {
  base_url: string;
  is_gallery: boolean;
  label: any;
  position: any;
  large_url: string;
  medium_url: string;
  small_url: string;
  thumbnail_url: string;
}

export interface ProductSpecificationAttribute {
  code: string;
  name: string;
  value: string;
}

export interface ProductSpecification {
  attributes: Array<ProductSpecificationAttribute>;
  name: string;
}

export interface Product {
  _id: string;
  product_id: string;
  brand_id: string;
  category_id: string;
  seller_id: string;
  colors: Array<string>;
  day_ago_created: number;
  description: string;
  images: Array<ProductImage>;
  inventory_status: string;
  name: string;
  original_price: number;
  price: number;
  quantity_sold: number;
  rating_average: number;
  review_count: number;
  short_description: string;
  sku: string;
  specifications: Array<ProductSpecification>;
  thumbnail_url: string;
}

export interface GetQueryProduct {
  id: string;
}

export interface GetResultProduct {
  status_code: number;
  data: Product;
  pagination: ProductPagination;
}

export interface ProductList {
  _id: string;
  product_id: string;
  brand_id: string;
  category_id: string;
  seller_id: string;
  colors: Array<string>;
  day_ago_created: number;
  inventory_status: string;
  name: string;
  original_price: number;
  price: number;
  quantity_sold: number;
  rating_average: number;
  review_count: number;
  short_description: string;
  sku: string;
  stock_item: number;
  images: Array<ProductImage>;
  thumbnail_url: string;
}

export interface GetQueryProductList {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  brand?: string;
  seller?: string;
  price?: string;
  color?: string;
  category?: string;
}

export interface GetResultProductList {
  status_code: number;
  data: Array<ProductList>;
  pagination: ProductPagination;
}

export interface ProductCategoryOption {
  category_id: string;
  name: string;
}

export interface ProductBrandOption {
  brand_id: string;
  category_id: string;
  name: string;
}

export interface ProductColorOption {
  name: string;
  category_id: string;
}

export interface ProductSellerOption {
  seller_id: string;
  category_id: string;
  logo: string;
  address: string;
  name: string;
}

export interface ProductSortOption {
  label: string;
  value: string;
}

export interface ProductFilterOptions {
  category_options: Array<ProductCategoryOption>;
  brand_options: Array<ProductBrandOption>;
  color_options: Array<ProductColorOption>;
  seller_options: Array<ProductSellerOption>;
  sort_options: Array<ProductSortOption>;
}

export interface GetResultProductFilterOptions {
  status_code: number;
  data: ProductFilterOptions;
}

export default Product;
