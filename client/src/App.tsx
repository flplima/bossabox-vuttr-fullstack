import React from "react";
import { useSelector } from "react-redux";

import { GlobalStyle, Container } from "./styles";
import Header from "./components/Header";
import ToolsList from "./components/ToolsList";
import Toolbar from "./components/Toolbar";
import ModalAddTool from "./components/ModalAddTool";
import ModalConfirmRemove from "./components/ModalConfirmRemove";
import FabButtonAdd from "./components/FabButtonAdd";
import Login from "./components/Login";
import { userIsLoggedSelector } from "./store/selectors";

const App: React.FC = () => {
  const userIsLogged = useSelector(userIsLoggedSelector);
  return (
    <>
      <GlobalStyle />

      {userIsLogged ? (
        <Container>
          <Header />
          <Toolbar />
          <ToolsList />
          <ModalAddTool />
          <ModalConfirmRemove />
          <FabButtonAdd />
        </Container>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
