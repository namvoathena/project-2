// Next:
import Link from "next/link";
import { useRouter } from "next/router";

import { FC, useState } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import Typography, { Tiny } from "@component/Typography";
import Login from "@component/sessions/Login";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import StyledHeader from "./styles";
import UserLoginDialog from "./LoginDialog";

// Redux:
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ProductListState } from "store/product-list";
import { CartState } from "store/cart";
import { SearchInput } from "@component/search-box";
import { useAuth } from "@hook/useAuth";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

const Header: FC<HeaderProps> = ({ isFixed, className }) => {
  const router = useRouter();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const productListSlice: ProductListState = useSelector(
    (state: RootState) => state.productList
  );

  const cartSlice: CartState = useSelector((state: RootState) => state.cart);

  const handleSearchChange = (queryString: string) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (queryString) {
      queryParams.search = queryString;
    } else {
      delete queryParams.search;
    }
    router.replace({
      pathname: "/",
      query: {
        ...queryParams,
        page: 1,
      },
    });
  };

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!Object.keys(cartSlice.items).length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {Object.keys(cartSlice.items).length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  const LOGIN_HANDLE = (
    <IconButton ml="1rem" bg="gray.200" p="8px">
      <Icon size="28px">user</Icon>
    </IconButton>
  );

  if (router.pathname == "/" && !productListSlice.data) {
    return <div></div>;
  }

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={200}
                height={50}
              />
            </a>
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInput onSearchChange={handleSearchChange} />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {auth.user ? (
            <Typography>{`Hello, ${auth.user.name}!`}</Typography>
          ) : (
            <UserLoginDialog handle={LOGIN_HANDLE}>
              <Login />
            </UserLoginDialog>
          )}
          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
