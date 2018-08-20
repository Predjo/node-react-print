
import * as React from "react";
import styled from "styled-components";

const BlueHeader = styled.h1`
  color: blue
`;

export interface IPDFAppProps { message?: string; }

export default class PDFApp extends React.Component<IPDFAppProps, {}> {
  public render() {

    const { message } = this.props;

    return (
      <div>
        <BlueHeader>Hello from PDF Service!</BlueHeader>
        <h3>{ message }</h3>
      </div>
    );
  }
}
