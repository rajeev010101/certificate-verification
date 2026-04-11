const puppeteer = require("puppeteer");

module.exports = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // 🔥 Set proper viewport (IMPORTANT)
  await page.setViewport({
    width: 1200,
    height: 800
  });

  // 🔥 Load HTML
  await page.setContent(html, {
    waitUntil: ["domcontentloaded", "networkidle0"]
  });

  // 🔥 WAIT FOR IMAGES TO LOAD (CRITICAL FIX)
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) => {
        if (img.complete) return;
        return new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        });
      })
    );
  });

  // 🔥 WAIT FOR FONTS
  await page.evaluateHandle("document.fonts.ready");

  // 🔥 EXTRA WAIT (stability for gradients + rendering)
 await new Promise((resolve) => setTimeout(resolve, 800));

  // 🔥 GENERATE PDF
  const pdf = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();

  return pdf;
};