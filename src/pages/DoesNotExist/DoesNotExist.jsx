import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import "./doesNotExist.css";

const DoesNotExist = () => {
  const { Title } = Typography;
  return (
    <div className="page-settings">
      <Title>The Page you are trying to access does not exist.</Title>
      <Title level={4}>
        Go <Link to="/">Home</Link> instead?
      </Title>
    </div>
  );
};

export default DoesNotExist;
