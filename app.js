const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/pdf", async (req, res) => {
  const url = req.query.target;

  const browser = await puppeteer
    .launch({
      headless: true,
    })
    .catch((error) => {
      console.log(error);
    });

  const webPage = await browser.newPage().catch((error) => {
    console.log(error);
  });

  await webPage
    .goto(url, {
      waitUntil: "networkidle0",
    })
    .catch((error) => {});

  const pdf = await webPage
    .pdf({
      printBackground: true,
      format: "Letter",
      margin: {
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
      },
    })
    .catch((error) => {
      console.log(error);
    });

  await browser.close().catch((error) => {
    console.log(error);
  });

  res.contentType("application/pdf");
  res.send(pdf);
});

app.listen(3000, () => {
  console.log("Server started");
});
