import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import { currency } from "@utils/utils";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { CartState, updateCartItem } from "store/cart";
import { CartItem } from "@models/cart.model";

// ========================================
type ProductIntroProps = {
  price: number;
  title: string;
  images: string[];
  id: string | number;
  slug: string;
  thumbnailUrl: string;
};
// ========================================

const ProductIntro: FC<ProductIntroProps> = ({
  images,
  title,
  price,
  id,
  slug,
  thumbnailUrl,
}) => {
  const router = useRouter();
  const cartState: CartState = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);

  const routerId = router.query.id as string;
  const cartItem: CartItem = cartState.items[id || routerId];

  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  const handleCartAmountChange = (cartItem: CartItem) => {
    dispatch(updateCartItem(cartItem));
  };

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <Image
                width={300}
                height={300}
                src={images[selectedImage]}
                style={{ objectFit: "contain" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 && "auto"}
                  mr={ind === images.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={40} />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Brand:</SemiSpan>
            <H6 ml="8px">Ziaomi</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Rated:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox>

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              {currency(price)}
            </H2>

            <SemiSpan color="inherit">Stock Available</SemiSpan>
          </Box>

          {!cartItem?.productQuantity ? (
            <Button
              mb="36px"
              size="small"
              color="primary"
              variant="contained"
              onClick={() => {
                const item: CartItem = {
                  productId: slug || routerId,
                  productImg: thumbnailUrl,
                  productName: title,
                  productPrice: price,
                  productQuantity: 1,
                };
                handleCartAmountChange(item);
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => {
                  const item: CartItem = {
                    productId: slug || routerId,
                    productImg: thumbnailUrl,
                    productName: title,
                    productPrice: price,
                    productQuantity: cartItem?.productQuantity - 1,
                  };
                  handleCartAmountChange(item);
                }}
              >
                <Icon variant="small">minus</Icon>
              </Button>

              <H3 fontWeight="600" mx="20px">
                {cartItem?.productQuantity.toString().padStart(2, "0")}
              </H3>

              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => {
                  const item: CartItem = {
                    productId: slug || routerId,
                    productImg: thumbnailUrl,
                    productName: title,
                    productPrice: price,
                    productQuantity: cartItem?.productQuantity + 1,
                  };
                  handleCartAmountChange(item);
                }}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Sold By:</SemiSpan>
            <Link href="/shops/scarlett-beauty">
              <a>
                <H6 lineHeight="1" ml="8px">
                  Mobile Store
                </H6>
              </a>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
