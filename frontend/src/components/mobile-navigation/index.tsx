import { FC } from "react";
import styled from "styled-components";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import NavLink from "@component/nav-link";
import useWindowSize from "@hook/useWindowSize";
import { layoutConstant } from "@utils/constants";
import { getTheme } from "@utils/utils";
import { CartState } from "store/cart";
import { useSelector } from "react-redux";
import { RootState } from "store";

// styled component
const Wrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  position: fixed;
  justify-content: space-around;
  height: ${layoutConstant.mobileNavHeight};
  background: ${getTheme("colors.body.paper")};
  box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
  z-index: 999;

  .link {
    flex: 1 1 0;
    display: flex;
    font-size: 13px;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .icon {
      display: flex;
      margin-bottom: 4px;
      align-items: center;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 900px) {
    display: flex;
    width: 100vw;
  }
`;

const MobileNavigationBar: FC = () => {
  const width = useWindowSize();
  const cartState: CartState = useSelector((state: RootState) => state.cart);

  return (
    width <= 900 && (
      <Wrapper>
        {list.map((item) => (
          <NavLink className="link" href={item.href} key={item.title}>
            <Icon className="icon" variant="small">
              {item.icon}
            </Icon>

            {item.title}

            {item.title === "Cart" && !!Object.keys(cartState.items).length && (
              <Chip
                top="4px"
                px="0.25rem"
                fontWeight="600"
                bg="primary.main"
                position="absolute"
                color="primary.text"
                left="calc(50% + 8px)"
              >
                {Object.keys(cartState.items).length}
              </Chip>
            )}
          </NavLink>
        ))}
      </Wrapper>
    )
  );
};

const list = [
  { title: "Home", icon: "home", href: "/" },
  { title: "Category", icon: "category", href: "/mobile-category-nav" },
  { title: "Cart", icon: "bag", href: "/cart" },
  { title: "Account", icon: "user-2", href: "/profile" },
];

export default MobileNavigationBar;
