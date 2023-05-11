import { Fragment, useEffect, useState } from "react";
import Hidden from "@component/hidden";
// import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
// import Pagination from "@component/pagination";
import OrderRow from "@component/orders/OrderRow";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import CustomerDashboardLayout from "@component/layout/customer-dashboard";
import { useAuth } from "@hook/useAuth";
import { AuthGuard } from "@component/sessions/AuthGuard";
import { getListOrder } from "api/order";

// ====================================================
const OrderList = () => {
  const [orderList, setOrderList] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      if (auth.user) {
        const order = await getListOrder({
          page: 1,
          limit: 9,
          token: auth.user.access_token,
        });
        setOrderList(order.data);
      } else {
        setOrderList([]);
      }
    };
    fetchOrder();
  }, [auth.user]);

  if (!orderList) {
    return <div>Loading...</div>;
  }

  return (
    <AuthGuard>
      <Fragment>
        <DashboardPageHeader title="My Orders" iconName="bag_filled" />

        <Hidden down={769}>
          <TableRow padding="0px 18px" boxShadow="none" bg="none">
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Order #
            </H5>

            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Status
            </H5>

            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Date purchased
            </H5>

            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Total
            </H5>

            <H5 flex="0 0 0 !important" color="text.muted" px="22px" my="0px" />
          </TableRow>
        </Hidden>

        {orderList.map((item) => (
          <OrderRow order={item} key={item.id} />
        ))}

        {/* <FlexBox justifyContent="center" mt="2.5rem">
          <Pagination
            onChange={(data) => console.log(data)}
            pageCount={Math.ceil(orderList.length / 10)}
          />
        </FlexBox> */}
      </Fragment>
    </AuthGuard>
  );
};

OrderList.layout = CustomerDashboardLayout;

export default OrderList;
