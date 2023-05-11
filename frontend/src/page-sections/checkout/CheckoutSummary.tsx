import { FC } from "react";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { CartState } from "store/cart";
import { currency } from "@utils/utils";

type Props = {
  cart: CartState;
};

const CheckoutSummary: FC<Props> = ({ cart }) => {
  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            {currency(cart.totalPrice)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontWeight="600" lineHeight="1">
            Freeship
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Payment:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontWeight="600" lineHeight="1">
            Cash on delivery
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Tax:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontWeight="600" lineHeight="1">
            No tax
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint">Discount:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb="1.5rem"
      >
        {currency(cart.totalPrice)}
      </Typography>

      <TextField placeholder="Voucher" fullwidth />

      <Button variant="outlined" color="primary" mt="1rem" mb="30px" fullwidth>
        Apply Voucher
      </Button>
    </Card1>
  );
};

export default CheckoutSummary;
