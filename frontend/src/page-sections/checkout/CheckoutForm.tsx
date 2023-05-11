import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik } from "formik";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { CartState } from "store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@hook/useAuth";
import { RootState } from "store";
import { createOrder } from "api/order";

type Props = {
  cart: CartState;
};

const CheckoutForm: FC<Props> = ({ cart }) => {
  const router = useRouter();
  const auth = useAuth();
  const cartState: CartState = useSelector((state: RootState) => state.cart);

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("${path} is required"),
    phone: yup.string().required("${path} is required"),
    email: yup.string().required("${path} is required"),
    shippingAddress: yup.string().required("${path} is required"),
  });

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    shippingAddress: "",
  };

  const handleFormSubmit = async (values) => {
    await createOrder({
      ...cartState,
      userId: auth.user.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      shippingAddress: values.shippingAddress,
    });
    router.replace("/orders");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Information
            </Typography>

            <TextField
              fullwidth
              mb="1rem"
              label="Full Name"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              errorText={touched.name && errors.name}
            />

            <TextField
              fullwidth
              mb="1rem"
              label="Phone Number"
              onBlur={handleBlur}
              onChange={handleChange}
              name="phone"
              value={values.phone}
              errorText={touched.phone && errors.phone}
            />

            <TextField
              fullwidth
              mb="1rem"
              type="email"
              onBlur={handleBlur}
              label="Email"
              name="email"
              onChange={handleChange}
              value={values.email}
              errorText={touched.email && errors.email}
            />

            <TextField
              fullwidth
              label="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              name="shippingAddress"
              value={values.shippingAddress}
              errorText={touched.shippingAddress && errors.shippingAddress}
            />
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullwidth
                >
                  Back to Cart
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullwidth
                disabled={Object.keys(cart.items).length == 0}
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
