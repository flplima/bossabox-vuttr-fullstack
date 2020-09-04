import React from "react";
import { RecoilRoot } from "recoil";

import { GlobalStyle, Container } from "./styles";
import Header from "./components/Header";
import ToolsList from "./components/ToolsList";
import Toolbar from "./components/Toolbar";
import ModalAddTool from "./components/ModalAddTool";
import ModalConfirmRemove from "./components/ModalConfirmRemove";
import FabButtonAdd from "./components/FabButtonAdd";

const App: React.FC = () => (
  <RecoilRoot>
    <GlobalStyle />

    <Container>
      <Header />
      <Toolbar />
      <ToolsList />
    </Container>

    <ModalAddTool />
    <ModalConfirmRemove />
    <FabButtonAdd />
  </RecoilRoot>
);

export default App;
