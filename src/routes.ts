import { Request, Response } from "express";
import * as puppeteer from "puppeteer";

import Renderer from "./renderer";

export class Routes {
  public routes(app): void {

    app.route("/")
    .get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Hello World",
      });
    });

    app.route("/pdf")
    .get((req: Request, res: Response) => {

      const message = req.query.message;
      const name: string = req.query.name || "ReactPDF";
      const renderer: Renderer = new Renderer();

      (async () => {
       const browser = await puppeteer.launch();
       const page = await browser.newPage();

       const pageHtml = renderer.renderMessage(message);

       await page.setContent(pageHtml);

       const file = await page.pdf({ format: "A4", displayHeaderFooter: false, landscape: true });

       await browser.close();

       res.writeHead(200, {
        "Content-Disposition": `attachment; filename=${ name }.pdf`,
        "Content-Length": file.length,
        "Content-Type": "application/pdf",
      });

       res.end(file);
     })();
   });
  }
}
