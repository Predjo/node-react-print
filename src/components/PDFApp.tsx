
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

export interface IPDFAppProps { message: string; imageList: Array<string>; }

export default class PDFApp extends React.Component<IPDFAppProps, {}> {
  public render() {

    const { message, imageList } = this.props;

    return (
      <div>
        <BlueHeader>Hello from PDF Service!</BlueHeader>
        <h3>{ message }</h3>
        <ImageGallery>
          {
            imageList.map((imageSrc, index) => (
              <li key = { index }>
                <img src = { imageSrc } />
              </li>
            ))
          }
        </ImageGallery>
      </div>
    );
  }
}
