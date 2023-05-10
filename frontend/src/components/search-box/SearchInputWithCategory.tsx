import { FC, useState } from "react";
import Box from "../Box";
import Menu from "../Menu";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import MenuItem from "../MenuItem";
import TextField from "../text-field";
import StyledSearchBox from "./styled";
import { ProductCategoryOption } from "@models/product.model";

type Props = {
  categories: Array<ProductCategoryOption>;
  chosen_category_id: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (queryString: string) => void;
};

const SearchInputWithCategory: FC<Props> = ({
  categories,
  chosen_category_id,
  onCategoryChange,
  onSearchChange,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleCategoryChange = (categoryId: string) => {
    onCategoryChange(categoryId);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchChange(searchValue);
    }
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-field"
          placeholder="Search and hit enter..."
          onKeyDown={handleKeyPress}
        />

        <Menu
          direction="right"
          className="category-dropdown"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>
                {chosen_category_id
                  ? categories.find(
                      (category) => category.category_id == chosen_category_id
                    ).name
                  : "All Categories"}
              </span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }
        >
          <MenuItem
            key={0}
            onClick={() => {
              handleCategoryChange("");
            }}
          >
            {"All Categories"}
          </MenuItem>
          {categories.map((item: ProductCategoryOption) => (
            <MenuItem
              key={item.category_id}
              onClick={() => {
                handleCategoryChange(item.category_id);
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </StyledSearchBox>
    </Box>
  );
};

export default SearchInputWithCategory;
