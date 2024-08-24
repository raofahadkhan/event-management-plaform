import React from "react";

interface LabelCompPropType {
  htmlFor: string;
  value: string;
}

const Label: React.FC<LabelCompPropType> = ({ htmlFor, value }) => {
  return <label htmlFor={htmlFor}>{value}</label>;
};

export default Label;
