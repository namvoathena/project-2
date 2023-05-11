import Grid from "@component/grid/Grid";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { CartState } from "store/cart";

const Checkout = () => {
  const cartState: CartState = useSelector((state: RootState) => state.cart);

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm cart={cartState} />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary cart={cartState} />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
