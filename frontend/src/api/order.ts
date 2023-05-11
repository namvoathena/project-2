import axiosClient from "./axiosClient";
import { CartState } from "store/cart";

export const createOrder = async (params: CartState) => {
  // console.log("createOrder");
  const orderInfo = {
    user_id: params.userId,
    name: params.name,
    phone: params.phone,
    email: params.email,
    total_price: params.totalPrice,
    discount: params.discount,
    unit_price: params.unitPrice,
    payment_method: params.paymentMethod,
    shipping_address: params.shippingAddress,
    created_at: new Date().toISOString(),
    status: params.status,
    items: Object.values(params.items),
  };
  // console.log(orderInfo);
  let url = `/order`;
  return await axiosClient
    .post(url, orderInfo)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const getListOrder = async (params: {
  page: number;
  limit: number;
  token: string;
}) => {
  let url = `/order?page=${params.page}&limit=${params.limit}`;

  const config = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };

  const res = await axiosClient
    .get(url, config)
    .then((res) => res.data)
    .catch((e) => console.error(e));

  const return_order = [];

  if (res) {
    for (const order of res.data) {
      return_order.push({
        id: order._id,
        userId: order.user_id,
        name: order.name,
        phone: order.phone,
        email: order.email,
        totalPrice: order.total_price,
        discount: order.discount,
        unitPrice: order.unit_price,
        paymentMethod: order.payment_method,
        shippingAddress: order.shipping_address,
        createdAt: order.created_at,
        status: order.status,
        items: order.items.map((productItem) => {
          return {
            productId: productItem.product_id,
            productImg: productItem.product_img,
            productName: productItem.product_name,
            productPrice: productItem.product_price,
            productQuantity: productItem.product_quantity,
          };
        }),
      });
    }
    res.data = return_order;
  }

  console.log(res.data);

  return res;
};
