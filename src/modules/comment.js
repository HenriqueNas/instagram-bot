module.exports = async (page, comment) => {
  // find textarea
  await page.waitForSelector('textarea[class="Ypffh"]');
  await page.click('textarea[class="Ypffh"]');

  // write comment
  await page.keyboard.type(comment);

  // submit comment
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
}
