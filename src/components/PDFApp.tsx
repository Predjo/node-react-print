
import * as React from "react";
import styled from "styled-components";

const BlueHeader = styled.h1`
  color: blue
`;

const ImageGallery = styled.ul`

  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;

  > li {
    width: 2in;
    height: 2in;
    position: relative;
    margin: 0.1in;

    > img {
      object-fit: cover;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
    }
  }
`;

export interface IPDFAppProps { message?: string; }

export default class PDFApp extends React.Component<IPDFAppProps, {}> {
  public render() {

    const { message } = this.props;

    return (
      <div>
        <BlueHeader>Hello from PDF Service!</BlueHeader>
        <h3>{ message }</h3>
        <ImageGallery>
          <li>
            <img src = "https://images.unsplash.com/photo-1534759846116-5799c33ce22a" />
          </li>
          <li>
            <img src = "https://images.unsplash.com/photo-1534782337394-475a9937243a" />
          </li>
          <li>
            <img src = "https://images.unsplash.com/photo-1534681636152-036b7342da0e" />
          </li>
        </ImageGallery>
      </div>
    );
  }
}
