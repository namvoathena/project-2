import { FC, useEffect, useState } from "react";
import Menu from "../Menu";
import Image from "../Image";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Small } from "../Typography";
import StyledTopbar from "./styles";

const Topbar: FC = () => {
  const [currency, setCurrency] = useState(currencyList[0]);
  const [language, setLanguage] = useState(languageList[0]);

  const handleCurrencyClick = (curr: typeof currency) => () =>
    setCurrency(curr);

  const handleLanguageClick = (lang: typeof language) => () =>
    setLanguage(lang);

  useEffect(() => {
    // get language from browser
    // console.log(navigator.language);
  }, []);

  return (
    <StyledTopbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <div className="logo">
            <Image src="/assets/images/logo.png" alt="logo" width={110} />
          </div>

          <FlexBox alignItems="center">
            <Icon size="14px">phone-call</Icon>
            <span>+84 337 991 449</span>
          </FlexBox>

          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>namvp@athena.studio</span>
          </FlexBox>
        </FlexBox>

        <FlexBox className="topbar-right" alignItems="center">
          <NavLink className="link" href="/">
            Need Help?
          </NavLink>

          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
                mr="1.25rem"
              >
                <Image
                  src={language.imgUrl}
                  alt={language.title}
                  width={20}
                  height={50}
                />
                <Small fontWeight="600">{language.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {languageList.map((item) => (
              <MenuItem key={item.title} onClick={handleLanguageClick(item)}>
                <Image
                  src={item.imgUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                  width={40}
                  height={30}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>

          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
              >
                <Image
                  src={currency.imgUrl}
                  alt={currency.title}
                  width={20}
                  height={50}
                />
                <Small fontWeight="600">{currency.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {currencyList.map((item) => (
              <MenuItem key={item.title} onClick={handleCurrencyClick(item)}>
                <Image
                  src={item.imgUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                  width={40}
                  height={30}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

const languageList = [{ title: "VN", imgUrl: "/assets/images/flags/vn.png" }];

const currencyList = [{ title: "VND", imgUrl: "/assets/images/flags/vn.png" }];

export default Topbar;
