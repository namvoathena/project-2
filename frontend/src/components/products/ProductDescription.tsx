import { FC } from "react";
import Box from "@component/Box";
// import Typography, { H3 } from "@component/Typography";
import { H3 } from "@component/Typography";

type Props = {
  description: string;
};

const ProductDescription: FC<Props> = ({ description }) => {
  return (
    <Box>
      <H3 mb="1rem">Description:</H3>
      {/* <Typography>
        Brand: Beats <br />
        Model: S450 <br />
        Wireless Bluetooth Headset <br />
        FM Frequency Response: 87.5 – 108 MHz <br />
        Feature: FM Radio, Card Supported (Micro SD / TF) <br />
        Made in China <br />
      </Typography> */}
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Box>
  );
};

export default ProductDescription;
