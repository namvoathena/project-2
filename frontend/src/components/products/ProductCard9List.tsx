import { FC, Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import { ProductListState } from "store/product-list";
import { ProductImage, ProductList } from "@models/product.model";

// ==========================================================
type Props = { props: ProductListState; onPageChange?: (page: number) => void };
// ==========================================================

const ProductCard9List: FC<Props> = ({ props, onPageChange }) => {
  return (
    <Fragment>
      {props.data.map((item: ProductList) => {
        const images = item.images.map((image: ProductImage) => {
          return image.base_url;
        });
        return (
          <ProductCard9
            mb="1.25rem"
            id={item._id}
            key={item._id}
            slug={item._id}
            price={item.price}
            title={item.name}
            off={null}
            rating={item.rating_average}
            images={images}
            imgUrl={item.thumbnail_url}
            categories={[item.category_id]}
          />
        );
      })}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>{`Showing ${
          (props.query.page - 1) * props.query.limit || 1
        }-${
          props.query.page * props.query.limit < props.pagination.total
            ? props.query.page * props.query.limit
            : props.pagination.total
        } of ${props.pagination.total} Products`}</SemiSpan>
        <Pagination
          pageCount={props.pagination.last_page}
          onChange={onPageChange}
        />
      </FlexBox>
    </Fragment>
  );
};

export default ProductCard9List;
