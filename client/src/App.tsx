import React from "react";
import { RecoilRoot } from "recoil";

import { GlobalStyle, Container } from "./styles";
import Header from "./components/Header";
import ToolsList from "./components/ToolsList";
import AddTool from "./components/AddToolButton";
import AddToolModal from "./components/AddToolModal";

export default function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />

      <Container>
        <Header />
        <AddTool />
        <ToolsList />
      </Container>

      <AddToolModal />
    </RecoilRoot>
  );
}
