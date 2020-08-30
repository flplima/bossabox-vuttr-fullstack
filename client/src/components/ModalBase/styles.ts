import styled from "styled-components";
import OverlayModal from "react-overlays/Modal";

export const Backdrop = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

export const Modal = styled(OverlayModal)`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  background: white;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 20px 25px #0000001a;
  border-radius: 5px;
  opacity: 1;
`;
