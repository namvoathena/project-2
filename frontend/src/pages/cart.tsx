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
import { currency } from "@utils/utils";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { CartState } from "store/cart";

const Cart = () => {
  const cartState: CartState = useSelector((state: RootState) => state.cart);

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {Object.keys(cartState.items).map((productId, idx) => (
            <ProductCard7
              mb="1.5rem"
              id={productId}
              key={idx}
              qty={cartState.items[productId].productQuantity}
              slug={productId}
              name={cartState.items[productId].productName}
              price={cartState.items[productId].productPrice}
              imgUrl={cartState.items[productId].productImg}
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
                {currency(cartState.totalPrice)}
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
