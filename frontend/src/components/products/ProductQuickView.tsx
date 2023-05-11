import { FC } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import ProductIntro from "./ProductIntro";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    slug: string;
    title: string;
    price: number;
    images: string[];
    id: string | number;
    thumbnailUrl: string;
  };
};
// ===================================================

const ProductQuickView: FC<Props> = (props) => {
  const { open, onClose, product } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Card p="1rem" position="relative" maxWidth="800px" width="100%">
        <ProductIntro
          id={product.id}
          slug={product.slug}
          title={product.title}
          price={product.price}
          images={product.images}
          thumbnailUrl={product.thumbnailUrl}
        />
        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <Icon
            className="close"
            color="primary"
            variant="small"
            onClick={onClose}
          >
            close
          </Icon>
        </Box>
      </Card>
    </Modal>
  );
};

export default ProductQuickView;
