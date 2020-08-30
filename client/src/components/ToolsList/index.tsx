import React from "react";
import { Card } from "../../styles";

const ToolsList: React.FC = () => {
  return (
    <>
      <Card>
        <a>json-server</a>
        <p>fake rest api based</p>
        <span>#api #json #schema #node</span>
      </Card>
      <Card>
        <a>npm</a>
        <p>node package manager</p>
        <span>#node #json</span>
      </Card>
    </>
  );
};

export default ToolsList;
