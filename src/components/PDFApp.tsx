
import * as React from "react";

export interface IPDFAppProps { message?: string; }

export default class PDFApp extends React.Component<IPDFAppProps, {}> {
  public render() {

    const { message } = this.props;

    return (
      <div>
        <h1>Hello from PDF Service!</h1>
        <h3 style={{ color: "blue" }} >{ message }</h3>
      </div>
    );
  }
}
