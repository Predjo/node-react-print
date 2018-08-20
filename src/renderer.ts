
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import PDFApp, { IPDFAppProps } from "./components/PDFApp";

const insertInPage = (content) => `<!DOCTYPE html><html><body>${ content }</body></html>`;

export default class Renderer {

  public renderMessage(message: string): string {
    const props: IPDFAppProps = { message };
    const component = React.createElement(PDFApp, props, null);
    const appContent: string = renderToStaticMarkup(component);

    return insertInPage(appContent);
  }
}
