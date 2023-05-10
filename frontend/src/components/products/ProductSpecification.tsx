import { FC } from "react";
import Box from "@component/Box";
import Typography, { H3 } from "@component/Typography";
import { ProductSpecification } from "@models/product.model";

type Props = {
  specification: ProductSpecification;
};

const ProductSpecification: FC<Props> = ({ specification }) => {
  return (
    <Box>
      <H3 mb="1rem">Specification:</H3>
      {specification.attributes.map((attribute) => {
        return (
          <Box key={attribute.code}>
            <Typography>{`${attribute.name}: ${attribute.value}`}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProductSpecification;
