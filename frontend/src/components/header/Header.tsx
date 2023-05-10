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
import { Tiny } from "@component/Typography";
import Login from "@component/sessions/Login";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/AppContext";
import StyledHeader from "./styles";
import UserLoginDialog from "./LoginDialog";

// Redux:
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ProductFilterState } from "store/product-filter";
import { ProductListState } from "store/product-list";
import { CartState } from "store/cart";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

const Header: FC<HeaderProps> = ({ isFixed, className }) => {
  const router = useRouter();
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const productFilterSlice: ProductFilterState = useSelector(
    (state: RootState) => state.productFilter
  );

  const productListSlice: ProductListState = useSelector(
    (state: RootState) => state.productList
  );

  const cartSlice: CartState = useSelector((state: RootState) => state.cart);

  const handleCategoryChange = (categoryId: string) => {
    router.replace({
      pathname: "/",
      query: {
        page: productListSlice.query.page,
        limit: productListSlice.query.limit,
        category: categoryId,
      },
    });
  };

  const handleSearchChange = (queryString: string) => {
    router.replace({
      pathname: "/",
      query: {
        ...productListSlice.query,
        search: queryString,
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

  if (
    (router.pathname == "/" && !productFilterSlice.data) ||
    !productListSlice.data
  ) {
    return <div>Loading...</div>;
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
          <SearchInputWithCategory
            categories={productFilterSlice.data.category_options}
            chosen_category_id={
              productListSlice.query.category
                ? productListSlice.query.category
                : ""
            }
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          <UserLoginDialog handle={LOGIN_HANDLE}>
            <Login />
          </UserLoginDialog>

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
