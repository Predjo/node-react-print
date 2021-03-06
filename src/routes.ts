import { Request, Response } from "express";
import * as puppeteer from "puppeteer";

import Renderer from "./renderer";

const imageList = [
  "https://images.unsplash.com/photo-1534759846116-5799c33ce22a",
  "https://images.unsplash.com/photo-1534782337394-475a9937243a",
  "https://images.unsplash.com/photo-1534681636152-036b7342da0e",
];

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

      // tslint:disable-next-line
      console.log("PDF creation started");

      const message = req.query.message || "Hello World";
      const name: string = req.query.name || "ReactPDF";
      const renderer: Renderer = new Renderer();

      (
        async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const pageHtml = renderer.renderPage(message, imageList);

        await page.setContent(pageHtml);

        await page.evaluate(waitForImagesToLoad);

        // Hacky way to wait for all the images
        // await page.goto(`data:text/html,${pageHtml}`, { waitUntil: "networkidle0" });

        const file = await page.pdf({ format: "A4", displayHeaderFooter: false, landscape: true });

        await browser.close();

        res.writeHead(200, {
          "Content-Disposition": `attachment; filename=${ name }.pdf`,
          "Content-Length": file.length,
          "Content-Type": "application/pdf",
        });

        res.end(file);

        // tslint:disable-next-line
        console.log("PDF creation ended");
       })();
     });
  }
}

async function waitForImagesToLoad() {
  const selectors = Array.from(document.querySelectorAll("img"));

  await Promise.all(selectors.map((img) => {
    if (img.complete) { return true; }

    return new Promise((resolve, reject) => {
      img.addEventListener("load", resolve);
      img.addEventListener("error", reject);
    });
  }));
}
