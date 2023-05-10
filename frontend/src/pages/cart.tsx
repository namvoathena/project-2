import { Fragment } from "react";
import Link from "next/link";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { useAppContext } from "@context/AppContext";
import { currency } from "@utils/utils";

const Cart = () => {
  const { state } = useAppContext();

  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {state.cart.map((item) => (
            <ProductCard7
              mb="1.5rem"
              id={item.id}
              key={item.id}
              qty={item.qty}
              slug={item.slug}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
            />
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <Typography color="gray.600">Total:</Typography>

              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {currency(getTotalPrice())}
              </Typography>
            </FlexBox>

            <Divider mb="1rem" />

            <TextField placeholder="Voucher" fullwidth />

            <Button
              variant="outlined"
              color="primary"
              mt="1rem"
              mb="30px"
              fullwidth
            >
              Apply Voucher
            </Button>

            <Link href="/checkout">
              <Button variant="contained" color="primary" fullwidth>
                Checkout Now
              </Button>
            </Link>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Cart.layout = CheckoutNavLayout;

export default Cart;
