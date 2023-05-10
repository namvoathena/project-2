import { FC, Fragment } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { StyledMiniCart } from "./styles";
import { currency } from "@utils/utils";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { CartState, updateCartItem } from "store/cart";
import { CartItem } from "@models/cart.model";

type MiniCartProps = { toggleSidenav?: () => void };

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav }) => {
  const cartState: CartState = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  const handleCartAmountChange = (cartItem: CartItem) => () => {
    dispatch(updateCartItem(cartItem));
  };

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">bag</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {Object.keys(cartState.items).length} item
          </Typography>
        </FlexBox>

        <Divider />

        {!!!Object.keys(cartState.items).length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)"
          >
            <NextImage
              src="/assets/images/logos/shopping-bag.svg"
              width="90px"
              height="100%"
            />
            <Paragraph
              mt="1rem"
              color="text.muted"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Paragraph>
          </FlexBox>
        )}

        {Object.keys(cartState.items).map((productId: string, idx: number) => (
          <Fragment key={idx}>
            <div className="cart-item">
              <FlexBox alignItems="center" flexDirection="column">
                <Button
                  variant="outlined"
                  color="primary"
                  padding="5px"
                  size="none"
                  borderColor="primary.light"
                  borderRadius="300px"
                  onClick={handleCartAmountChange({
                    ...cartState.items[productId],
                    productQuantity:
                      cartState.items[productId].productQuantity + 1,
                  })}
                >
                  <Icon variant="small">plus</Icon>
                </Button>

                <Typography fontWeight={600} fontSize="15px" my="3px">
                  {cartState.items[productId].productQuantity}
                </Typography>

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange({
                    ...cartState.items[productId],
                    productQuantity:
                      cartState.items[productId].productQuantity - 1,
                  })}
                  disabled={cartState.items[productId].productQuantity === 1}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${productId}`}>
                <a>
                  <Avatar
                    size={76}
                    mx="1rem"
                    alt={cartState.items[productId].productName}
                    src={
                      cartState.items[productId].productImg ||
                      "/assets/images/products/iphone-x.png"
                    }
                  />
                </a>
              </Link>

              <div className="product-details">
                <Link href={`/product/${productId}`}>
                  <a>
                    <H5 className="title" fontSize="14px">
                      {cartState.items[productId].productName}
                    </H5>
                  </a>
                </Link>

                <Tiny color="text.muted">
                  {currency(cartState.items[productId].productPrice, 0)} x{" "}
                  {cartState.items[productId].productQuantity}
                </Tiny>

                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="primary.main"
                  mt="4px"
                >
                  {currency(
                    cartState.items[productId].productQuantity *
                      cartState.items[productId].productPrice
                  )}
                </Typography>
              </div>

              <Icon
                size="1rem"
                ml="1.25rem"
                className="clear-icon"
                onClick={handleCartAmountChange({
                  ...cartState.items[productId],
                  productQuantity: 0,
                })}
              >
                close
              </Icon>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {!!Object.keys(cartState.items).length && (
        <Fragment>
          <Link href="/checkout">
            <Button
              color="primary"
              variant="contained"
              m="1rem 1rem 0.75rem"
              onClick={toggleSidenav}
            >
              <Typography fontWeight={600}>
                Checkout Now ({currency(cartState.totalPrice)})
              </Typography>
            </Button>
          </Link>

          <Link href="/cart">
            <Button
              color="primary"
              variant="outlined"
              m="0px 1rem 0.75rem"
              onClick={toggleSidenav}
            >
              <Typography fontWeight={600}>View Cart</Typography>
            </Button>
          </Link>
        </Fragment>
      )}
    </StyledMiniCart>
  );
};

MiniCart.defaultProps = { toggleSidenav: () => {} };

export default MiniCart;
