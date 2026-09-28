/**
 * Drags a slider/toggle knob horizontally by the specified offset.
 *
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('@playwright/test').Locator} knobLocator - Locator for the slider knob element
 * @param {number} [offset=190] - Distance in pixels to drag horizontally
 * @param {number} [steps=10] - Number of intermediate mouse movement steps
 */
async function dragSlider(page, knobLocator, offset = 190, steps = 10) {
  await knobLocator.waitFor({ state: "visible" });
  const box = await knobLocator.boundingBox();
  if (!box) {
    throw new Error("Slider knob bounding box could not be determined.");
  }

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + offset, startY, { steps });
  await page.mouse.up();
}

module.exports = { dragSlider };
