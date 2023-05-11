import Link from "next/link";
import Image from "next/image";
import { FC, Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Card, { CardProps } from "@component/Card";
import { H3, SemiSpan } from "@component/Typography";
import { calculateDiscount, currency, getTheme } from "@utils/utils";
import { deviceSize } from "@utils/constants";
import ProductQuickView from "@component/products/ProductQuickView";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { CartState, updateCartItem } from "store/cart";
import { CartItem } from "@models/cart.model";

// styled component
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// =======================================================================
interface ProductCard1Props extends CardProps {
  off?: number;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
  images: string[];
  id?: string | number;
}
// =======================================================================

const ProductCard1: FC<ProductCard1Props> = ({
  id,
  off,
  slug,
  title,
  price,
  imgUrl,
  images,
  rating = 4,
  ...props
}) => {
  const cartState: CartState = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const cartItem: CartItem = cartState.items[id];

  const [open, setOpen] = useState(false);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (cartItem: CartItem) => {
    dispatch(updateCartItem(cartItem));
  };

  return (
    <>
      <Wrapper {...props}>
        <div className="image-holder">
          {!!off && (
            <Chip
              top="10px"
              left="10px"
              p="5px 10px"
              fontSize="10px"
              fontWeight="600"
              bg="primary.main"
              position="absolute"
              color="primary.text"
              zIndex={1}
            >
              {off}% off
            </Chip>
          )}

          <FlexBox className="extra-icons">
            <Icon
              color="secondary"
              variant="small"
              mb="0.5rem"
              onClick={toggleDialog}
            >
              eye-alt
            </Icon>

            <Icon className="favorite-icon outlined-icon" variant="small">
              heart
            </Icon>
          </FlexBox>

          <Link href={`/product/${slug}`}>
            <a>
              <Image
                alt={title}
                width={100}
                src={imgUrl}
                height={100}
                objectFit="cover"
                layout="responsive"
              />
            </a>
          </Link>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <Link href={`/product/${slug}`}>
                <a>
                  <H3
                    mb="10px"
                    title={title}
                    fontSize="14px"
                    textAlign="left"
                    fontWeight="600"
                    className="title"
                    color="text.secondary"
                  >
                    {title}
                  </H3>
                </a>
              </Link>

              <Rating value={rating || 0} outof={5} color="warn" readonly />

              <FlexBox alignItems="center" mt="10px">
                <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                  {calculateDiscount(price, off)}
                </SemiSpan>

                {!!off && (
                  <SemiSpan color="text.muted" fontWeight="600">
                    <del>{currency(price)}</del>
                  </SemiSpan>
                )}
              </FlexBox>
            </Box>

            <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent={
                !!cartItem?.productQuantity ? "space-between" : "flex-start"
              }
            >
              <Button
                size="none"
                padding="3px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={() => {
                  const item: CartItem = {
                    productId: slug,
                    productImg: imgUrl,
                    productName: title,
                    productPrice: price,
                    productQuantity: (cartItem?.productQuantity || 0) + 1,
                  };
                  handleCartAmountChange(item);
                }}
              >
                <Icon variant="small">plus</Icon>
              </Button>

              {!!cartItem?.productQuantity && (
                <Fragment>
                  <SemiSpan color="text.primary" fontWeight="600">
                    {cartItem.productQuantity}
                  </SemiSpan>

                  <Button
                    size="none"
                    padding="3px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={() => {
                      const item: CartItem = {
                        productId: slug,
                        productImg: imgUrl,
                        productName: title,
                        productPrice: price,
                        productQuantity: cartItem.productQuantity - 1,
                      };
                      handleCartAmountChange(item);
                    }}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </FlexBox>
        </div>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images, title, price, id, slug, thumbnailUrl: imgUrl }}
      />
    </>
  );
};

export default ProductCard1;
