import { useCallback, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Typography, { H5, Paragraph } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";

// Apis:
import { getListProduct } from "api/product";

// Redux:
import { useDispatch, useSelector } from "react-redux";
import { ProductListState, updateProductList } from "store/product-list";
import { AppDispatch, RootState } from "store";
import {
  GetQueryProductList,
  GetResultProductList,
} from "@models/product.model";
import {
  ProductFilterState,
  fetchProductFilterOptions,
} from "store/product-filter";
import { useRouter } from "next/router";

// Define a type for our props
interface Props {
  productList: GetResultProductList;
  getParams: GetQueryProductList;
}

const ProductSearchResult = ({ productList, getParams }: Props) => {
  const [initialize, setInitialize] = useState(false);

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const productListSlice: ProductListState = useSelector(
    (state: RootState) => state.productList
  );

  const productFilterSlice: ProductFilterState = useSelector(
    (state: RootState) => state.productFilter
  );

  const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");

  const isTablet = width < 1025;
  const toggleView = useCallback((v: any) => () => setView(v), []);

  useEffect(() => {
    dispatch(
      fetchProductFilterOptions(() => {
        setInitialize(true);
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      updateProductList({
        ...productList,
        query: getParams,
      })
    );
  }, [productList, getParams]);

  const handlePageChange = (page: number) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (page) {
      queryParams.page = page;
    } else {
      delete queryParams.page;
    }
    router.replace({
      pathname: "/",
      query: { ...queryParams },
    });
  };

  const handleSortChange = (sortOption: string) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (sortOption) {
      queryParams.sort = sortOption;
    } else {
      delete queryParams.sort;
    }
    router.replace({
      pathname: "/",
      query: {
        ...queryParams,
        page: 1,
      },
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    const queryParams: any = {
      page: 1,
      limit: productListSlice.query.limit,
    };
    if (categoryId) {
      queryParams.category = categoryId;
    }
    router.replace({
      pathname: "/",
      query: queryParams,
    });
  };

  const handlePriceChange = (priceRange: {
    minPrice: number;
    maxPrice: number;
  }) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (priceRange) {
      queryParams.price = `${priceRange.minPrice},${priceRange.maxPrice}`;
    } else {
      delete queryParams.price;
    }
    router.replace({
      pathname: "/",
      query: {
        ...queryParams,
        page: 1,
      },
    });
  };

  const handleBrandChange = (brands: string) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (brands) {
      queryParams.brand = brands;
    } else {
      delete queryParams.brand;
    }
    router.replace({
      pathname: "/",
      query: {
        ...queryParams,
        page: 1,
      },
    });
  };

  const handleSellerChange = (sellers: string) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (sellers) {
      queryParams.seller = sellers;
    } else {
      delete queryParams.seller;
    }
    router.replace({
      pathname: "/",
      query: {
        ...queryParams,
        page: 1,
      },
    });
  };

  const handleColorChange = (colors: string) => {
    const queryParams: any = {};
    Object.keys(productListSlice.query).forEach((key) => {
      if (productListSlice.query[key]) {
        queryParams[key] = productListSlice.query[key];
      }
    });
    if (colors) {
      queryParams.color = colors;
    } else {
      delete queryParams.color;
    }
    router.replace({
      pathname: "/",
      query: {
        ...queryParams,
        page: 1,
      },
    });
  };

  if (!initialize || !productList) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box pt="20px">
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H5>{`Searching for “ ${
            productListSlice.query.search || "all products"
          } ”`}</H5>
          <Paragraph color="text.muted">{`${productList.pagination.total} results found`}</Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Sort by:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Sort by"
              defaultValue={productFilterSlice.data.sort_options[0]}
              options={productFilterSlice.data.sort_options}
              onChange={(sortOption: { label: string; value: string }) => {
                handleSortChange(sortOption.value);
              }}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            View:
          </Paragraph>

          <IconButton size="small" onClick={toggleView("grid")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}
            >
              grid
            </Icon>
          </IconButton>

          <IconButton size="small" onClick={toggleView("list")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}
            >
              menu
            </Icon>
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard
                productFilter={productFilterSlice.data}
                productQuery={productListSlice.query}
                handleCategoryChange={handleCategoryChange}
                handlePriceChange={handlePriceChange}
                handleBrandChange={handleBrandChange}
                handleSellerChange={handleSellerChange}
                handleColorChange={handleColorChange}
              />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard
            productFilter={productFilterSlice.data}
            productQuery={productListSlice.query}
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            handleBrandChange={handleBrandChange}
            handleSellerChange={handleSellerChange}
            handleColorChange={handleColorChange}
          />
        </Hidden>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductCard1List
              props={productListSlice}
              onPageChange={handlePageChange}
            />
          ) : (
            <ProductCard9List
              props={productListSlice}
              onPageChange={handlePageChange}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getParams: any = {
    page: context.query.page ? context.query.page : 1,
    limit: context.query.limit ? context.query.limit : 9,
    search: context.query.search ? context.query.search : null,
    category: context.query.category ? context.query.category : null,
    sort: context.query.sort ? context.query.sort : null,
    brand: context.query.brand ? context.query.brand : null,
    seller: context.query.seller ? context.query.seller : null,
    price: context.query.price ? context.query.price : null,
    color: context.query.color ? context.query.color : null,
  };

  const productList = await getListProduct(getParams);

  return {
    props: { productList, getParams },
  };
};

ProductSearchResult.layout = NavbarLayout;

export default ProductSearchResult;
