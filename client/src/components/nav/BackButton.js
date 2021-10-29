import React from "react";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  let history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="back-button" onClick={goBack}>
      <LeftOutlined />
    </div>
  );
};

export default BackButton;
