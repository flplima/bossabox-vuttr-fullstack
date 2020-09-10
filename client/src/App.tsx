import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { GlobalStyle, Container } from "./styles";
import Header from "./components/Header";
import ToolsList from "./components/ToolsList";
import ActionsBar from "./components/ActionsBar";
import ModalAddTool from "./components/ModalAddTool";
import ModalConfirmRemove from "./components/ModalConfirmRemove";
import FabButtonAdd from "./components/FabButtonAdd";
import Login from "./components/Login";
import { loggedInSelector } from "./store/selectors";

const App: React.FC = () => {
  const loggedIn = useSelector(loggedInSelector);
  return (
    <>
      <GlobalStyle />

      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={String(loggedIn)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {loggedIn ? (
            <Container>
              <Header />
              <ActionsBar />
              <ToolsList />

              <ModalAddTool />
              <ModalConfirmRemove />
              <FabButtonAdd />
            </Container>
          ) : (
            <Login />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;
