import React, { useState } from 'react';

const ScrapeContent = () => {
  const [scrapedData, setScrapedData] = useState(null);
  const [url, setUrl] = useState('https://www.faceit.com/en/teams/2ab27083-890f-4204-88e2-501b5d4cdb0e/leagues'); // Default URL to scrape

  const scrapeContent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to scrape content');
      }
      const data = await response.json();
      setScrapedData(data);
    } catch (error) {
      console.error('Error fetching scraped data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <button onClick={scrapeContent}>Scrape Content</button>

      {scrapedData && (
        <div>
          <h3>Full HTML Content</h3>
          <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {/* Display the full HTML content */}
            <pre>{scrapedData.html}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapeContent;
