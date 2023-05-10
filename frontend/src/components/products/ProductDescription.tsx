import { FC } from "react";
import Box from "@component/Box";
import { H3 } from "@component/Typography";

type Props = {
  description: string;
};

const ProductDescription: FC<Props> = ({ description }) => {
  return (
    <Box>
      <H3 mb="1rem">Description:</H3>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Box>
  );
};

export default ProductDescription;
