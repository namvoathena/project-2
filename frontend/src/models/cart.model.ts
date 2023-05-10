type Item = {
  productImg: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
};

interface Cart {
  userId: string;
  name: string;
  phone: string;
  email: string;
  totalPrice: number;
  discount: number;
  unitPrice: string;
  payment_method: string;
  shippingAddress: string;
  createdAt: string;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  items: Array<Item>;
}

export default Cart;
