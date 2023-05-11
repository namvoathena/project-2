import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductIntro from "@component/products/ProductIntro";
import ProductDescription from "@component/products/ProductDescription";
import { GetQueryProduct, Product } from "@models/product.model";
import { getAllProductIds, getSingleProduct } from "api/product";
import { GetStaticProps, GetStaticPaths } from "next";
import ProductSpecification from "@component/products/ProductSpecification";

// ===============================================================
type Props = {
  product: Product;
};

// ===============================================================

const ProductDetails = (props: Props) => {
  const { product } = props;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => setSelectedOption(opt);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <ProductIntro
        id={product._id}
        slug={product._id}
        thumbnailUrl={product.thumbnail_url}
        price={product.price}
        title={product.name}
        images={product.images.map((image) => {
          return image.base_url;
        })}
      />

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          mr="25px"
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
          borderBottom={selectedOption === "description" && "2px solid"}
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
        >
          Description
        </H5>

        <H5
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("specification")}
          borderBottom={selectedOption === "specification" && "2px solid"}
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
        >
          Specification
        </H5>
      </FlexBox>

      {/* DESCRIPTION AND REVIEW TAB DETAILS */}
      <Box mb="50px">
        {selectedOption === "description" && (
          <ProductDescription description={product.description} />
        )}
        {selectedOption === "specification" && (
          <ProductSpecification specification={product.specifications[0]} />
        )}
      </Box>
    </Fragment>
  );
};

ProductDetails.layout = NavbarLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAllProductIds();
  const productIds: Array<string> = result.data;
  return {
    paths: productIds.map((productId: string) => {
      return {
        params: {
          slug: productId,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const getProductParam: GetQueryProduct = {
    id: slug,
  };
  const result = await getSingleProduct(getProductParam);
  const product: Product = result.data;
  return { props: { product } };
};

export default ProductDetails;
