
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import PDFApp, { IPDFAppProps } from "./components/PDFApp";

const insertInPage = (head: string, body: string): string =>
  `<!DOCTYPE html><html><head>${ head }</head><body>${ body }</body></html>`;

export default class Renderer {

  public renderPage(message: string, imageList: Array<string>): string {
    const props: IPDFAppProps = { message, imageList };
    const sheet = new ServerStyleSheet();
    const component = React.createElement(PDFApp, props, null);

    const body: string = renderToStaticMarkup(component);
    const styles: string = sheet.getStyleTags();

    return insertInPage(styles, body);
  }
}
