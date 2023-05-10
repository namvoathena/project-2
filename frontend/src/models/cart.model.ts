export type CartItem = {
  productId: string;
  productImg: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
};

export interface Cart {
  userId: string;
  name: string;
  phone: string;
  email: string;
  totalPrice: number;
  discount: number;
  unitPrice: string;
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  items: {
    [productId: string]: CartItem;
  };
}

export default Cart;
