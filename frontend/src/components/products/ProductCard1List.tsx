import { FC } from "react";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import { ProductListState } from "store/product-list";
import { ProductImage, ProductList } from "@models/product.model";

// ==========================================================
type Props = {
  props: ProductListState;
  onPageChange?: (page: number) => void;
};
// ==========================================================

const ProductCard1List: FC<Props> = ({ props, onPageChange }) => {
  return (
    <div>
      <Grid container spacing={6}>
        {props.data.map((item: ProductList) => {
          const images = item.images.map((image: ProductImage) => {
            return image.base_url;
          });
          return (
            <Grid item lg={4} sm={6} xs={12} key={item._id}>
              <ProductCard1
                id={item._id}
                slug={item._id}
                price={item.price}
                title={item.name}
                off={null}
                images={images}
                imgUrl={item.thumbnail_url}
                rating={item.rating_average}
              />
            </Grid>
          );
        })}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>{`Showing ${
          props.pagination.total
            ? (props.query.page - 1) * props.query.limit || 1
            : 0
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
    </div>
  );
};

export default ProductCard1List;
