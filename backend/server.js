// backend/server.js
const express = require('express');
const cors = require('cors');
const puppeteerExtra = require('puppeteer-extra');
const puppeteerStealth = require('puppeteer-extra-plugin-stealth');
const app = express();
const port = 5000;

// Enable CORS for the frontend
app.use(cors());

// Use the stealth plugin
puppeteerExtra.use(puppeteerStealth());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Puppeteer screen scraping API
app.get('/scrape', async (req, res) => {
  const url = req.query.url;

  // Validate URL
  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  if (!/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: 'Invalid URL. Please include the protocol (http:// or https://).' });
  }

  try {
    // Launch Puppeteer browser with stealth
    const browser = await puppeteerExtra.launch({
      headless: true, // Run in headless mode for production
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Navigate to the given URL
    await page.goto(url);

    // Wait for the checkbox element to appear
    const checkboxSelector = 'input[type="checkbox"]'; // Adjust selector to match your case
    if (await page.$(checkboxSelector)) {
      await page.click(checkboxSelector); // Toggle checkbox
      await page.waitForNavigation(); // Wait for navigation if triggered
    }

    // Wait for the table to appear
    const tableSelector = 'table.TableBase__StyledTable-sc-e983e69b-0.hloglQ';
    await page.waitForSelector(tableSelector);

    // Extract all spans inside the specified table
    const spans = await page.evaluate((selector) => {
      const table = document.querySelector(selector);
      if (!table) return []; // If the table isn't found, return an empty array

      // Find all spans within the table and extract their text
      return Array.from(table.querySelectorAll('span')).map(span => span.textContent.trim());
    }, tableSelector);

    // Close the browser
    await browser.close();

    // Return the extracted spans to the client
    console.log(spans);
    res.json({ spans });
  } catch (error) {
    console.error('Error scraping:', error.message);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});



app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});


