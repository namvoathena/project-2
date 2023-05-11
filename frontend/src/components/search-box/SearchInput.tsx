import { FC, useState } from "react";
import Box from "../Box";
import Icon from "../icon/Icon";
import { Button } from "../buttons";
import TextField from "../text-field";
import SearchBoxStyle from "./styled";

type Props = {
  onSearchChange: (queryString: string) => void;
};

const CustomSearchInput: FC<Props> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchChange(searchValue);
    }
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
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

        <Button
          className="search-button"
          variant="contained"
          color="primary"
          onClick={() => onSearchChange(searchValue)}
        >
          Search
        </Button>
      </SearchBoxStyle>
    </Box>
  );
};

export default CustomSearchInput;
