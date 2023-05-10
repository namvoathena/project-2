import { useState } from "react";
import { FC } from "react";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import {
  ProductColorOption,
  ProductFilterOptions,
  GetQueryProductList,
} from "@models/product.model";

interface Props {
  productFilter: ProductFilterOptions;
  productQuery: GetQueryProductList;
  handleCategoryChange: (categoryId: string) => void;
  handlePriceChange: (priceRange: {
    minPrice: number;
    maxPrice: number;
  }) => void;
  handleBrandChange: (brands: string) => void;
  handleSellerChange: (sellers: string) => void;
  handleColorChange: (colors: string) => void;
}

const ProductFilterCard: FC<Props> = ({
  productFilter,
  productQuery,
  handleCategoryChange,
  handlePriceChange,
  handleBrandChange,
  handleSellerChange,
  handleColorChange,
}) => {
  const [priceRange, setPriceRange] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({
    minPrice: productQuery.price
      ? parseInt(productQuery.price.split(",")[0])
      : 0,
    maxPrice: productQuery.price
      ? parseInt(productQuery.price.split(",")[1])
      : 9999999,
  });
  const [brands, setBrands] = useState<Array<string>>(
    productQuery.brand ? productQuery.brand.split(",") : []
  );
  const [sellers, setSellers] = useState<Array<string>>(
    productQuery.seller ? productQuery.seller.split(",") : []
  );
  const [colors, setColors] = useState<Array<string>>(
    productQuery.color ? productQuery.color.split(",") : []
  );
  const [showMoreSellers, setShowMoreSellers] = useState(false);
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

  const handleClickShowMoreSellers = () => {
    setShowMoreSellers(!showMoreSellers);
  };
  const handleClickShowMoreBrands = () => {
    setShowMoreBrands(!showMoreBrands);
  };
  const handleClickShowMoreColors = () => {
    setShowMoreColors(!showMoreColors);
  };
  const handleCheckBrandOption = (e) => {
    const newBrands = brands.slice();
    newBrands.push(e.target.value);
    setBrands(newBrands);
    handleBrandChange(
      newBrands
        .reduce((prevValue: string, currValue: string) => {
          prevValue += `,${currValue}`;
          return prevValue;
        }, "")
        .substring(1)
    );
  };
  const handleUncheckBrandOption = (e) => {
    const newBrands = brands
      .slice()
      .filter((brand) => brand !== e.target.value);
    setBrands(newBrands);
    handleBrandChange(
      newBrands
        .reduce((prevValue: string, currValue: string) => {
          prevValue += `,${currValue}`;
          return prevValue;
        }, "")
        .substring(1)
    );
  };
  const handleCheckSellerOption = (e) => {
    const newSellers = sellers.slice();
    newSellers.push(e.target.value);
    setSellers(newSellers);
    handleSellerChange(
      newSellers
        .reduce((prevValue: string, currValue: string) => {
          prevValue += `,${currValue}`;
          return prevValue;
        }, "")
        .substring(1)
    );
  };
  const handleUncheckSellerOption = (e) => {
    const newSellers = sellers
      .slice()
      .filter((brand) => brand !== e.target.value);
    setSellers(newSellers);
    handleSellerChange(
      newSellers
        .reduce((prevValue: string, currValue: string) => {
          prevValue += `,${currValue}`;
          return prevValue;
        }, "")
        .substring(1)
    );
  };
  const handleCheckColorOption = (e) => {
    const newColors = colors.slice();
    newColors.push(e.target.value);
    setColors(newColors);
    handleColorChange(
      newColors
        .reduce((prevValue: string, currValue: string) => {
          prevValue += `,${currValue}`;
          return prevValue;
        }, "")
        .substring(1)
    );
  };
  const handleUncheckColorOption = (e) => {
    const newColors = colors
      .slice()
      .filter((color) => color !== e.target.value);
    setColors(newColors);
    handleColorChange(
      newColors
        .reduce((prevValue: string, currValue: string) => {
          prevValue += `,${currValue}`;
          return prevValue;
        }, "")
        .substring(1)
    );
  };
  const handleClickCategory = (categoryId: string) => {
    handleCategoryChange(categoryId);
    // Reset filtered state:
    setPriceRange({ minPrice: 0, maxPrice: 9999999 });
    setBrands([]);
    setSellers([]);
    setColors([]);
  };

  const colorOptions = productFilter.color_options.reduce((unique, o) => {
    if (!unique.some((obj) => obj.name === o.name)) {
      unique.push(o);
    }
    return unique;
  }, []);

  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Categories</H6>
      <Paragraph
        py="6px"
        fontSize="14px"
        key={0}
        color="text.muted"
        className="cursor-pointer"
        onClick={() => handleClickCategory("")}
      >
        {"All Categories"}
      </Paragraph>
      {productFilter.category_options.map((category) => (
        <Paragraph
          py="6px"
          fontSize="14px"
          key={category.category_id}
          color="text.muted"
          className="cursor-pointer"
          onClick={() => handleClickCategory(category.category_id)}
        >
          {category.name}
        </Paragraph>
      ))}
      <Divider mt="18px" mb="24px" />
      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField
          placeholder="0"
          type="number"
          fullwidth
          value={priceRange.minPrice}
          onChange={(e) => {
            if (parseInt(e.target.value) > priceRange.maxPrice) return;
            setPriceRange({
              ...priceRange,
              minPrice: parseInt(e.target.value),
            });
          }}
          min={0}
        />

        <H5 color="text.muted" px="0.5rem">
          -
        </H5>

        <TextField
          placeholder="250"
          type="number"
          fullwidth
          value={priceRange.maxPrice}
          onChange={(e) => {
            if (parseInt(e.target.value) < priceRange.minPrice) return;
            setPriceRange({
              ...priceRange,
              maxPrice: parseInt(e.target.value),
            });
          }}
          min={1000}
        />
      </FlexBox>

      <Button
        variant="contained"
        size="small"
        color="secondary"
        marginTop="10px"
        fullwidth={true}
        onClick={() => handlePriceChange(priceRange)}
      >
        Apply
      </Button>
      <Divider my="24px" />
      {/* BRANDS FILTER */}
      <H6 mb="16px">Brands</H6>
      {productFilter.brand_options
        .filter((brand) => {
          if (
            productQuery.category &&
            productQuery.category != brand.category_id
          )
            return false;
          return true;
        })
        .slice(0, showMoreBrands ? productFilter.brand_options.length : 5)
        .map((brand, idx) => {
          return (
            <CheckBox
              my="10px"
              key={idx}
              name={brand.name}
              value={brand.brand_id}
              color="secondary"
              label={<SemiSpan color="inherit">{brand.name}</SemiSpan>}
              onChange={(e) => {
                if (e.target.checked) {
                  handleCheckBrandOption(e);
                } else {
                  handleUncheckBrandOption(e);
                }
              }}
            />
          );
        })}
      <Button
        onClick={handleClickShowMoreBrands}
        variant="text"
        size="small"
        color="secondary"
        paddingLeft="5px"
      >
        {showMoreBrands ? "Collapse" : "Show more"}
      </Button>
      <Divider my="24px" />
      {/* SELLERS FILTER */}
      <H6 mb="16px">Sellers</H6>
      {productFilter.seller_options
        .filter((seller) => {
          if (
            productQuery.category &&
            productQuery.category != seller.category_id
          )
            return false;
          return true;
        })
        .slice(0, showMoreSellers ? productFilter.seller_options.length : 5)
        .map((seller, idx) => {
          return (
            <CheckBox
              my="10px"
              key={idx}
              name={seller.name}
              value={seller.seller_id}
              color="secondary"
              label={<SemiSpan color="inherit">{seller.name}</SemiSpan>}
              onChange={(e) => {
                if (e.target.checked) {
                  handleCheckSellerOption(e);
                } else {
                  handleUncheckSellerOption(e);
                }
              }}
            />
          );
        })}
      <Button
        onClick={handleClickShowMoreSellers}
        variant="text"
        size="small"
        color="secondary"
        paddingLeft="5px"
      >
        {showMoreSellers ? "Collapse" : "Show more"}
      </Button>
      <Divider my="24px" />
      {/* COLORS FILTER */}
      <H6 mb="16px">Colors</H6>
      {colorOptions
        .filter((color: ProductColorOption) => {
          if (
            productQuery.category &&
            productQuery.category != color.category_id
          )
            return false;
          return true;
        })
        .slice(0, showMoreColors ? colorOptions.length : 5)
        .map((color, idx) => {
          return (
            <CheckBox
              my="10px"
              key={idx}
              name={color.name}
              value={color.name}
              color="secondary"
              label={<SemiSpan color="inherit">{color.name}</SemiSpan>}
              onChange={(e) => {
                if (e.target.checked) {
                  handleCheckColorOption(e);
                } else {
                  handleUncheckColorOption(e);
                }
              }}
            />
          );
        })}
      <Button
        onClick={handleClickShowMoreColors}
        variant="text"
        size="small"
        color="secondary"
        paddingLeft="5px"
      >
        {showMoreColors ? "Collapse" : "Show more"}
      </Button>
    </Card>
  );
};

export default ProductFilterCard;
