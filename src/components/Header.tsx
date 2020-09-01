/** @jsx jsx */
import { useContext } from "react";
import { jsx, Styled } from "theme-ui";
import { UserContext } from "~/src/modules/UserProvider";

import { rem } from "~/src/theme";
import Logo from "~/src/assets/icons/logo";

const Header = () => {
  const authed: any = useContext(UserContext);

  return (
    <header
      sx={{
        width: "100%",
      }}
    ></header>
  );
};

export default Header;
