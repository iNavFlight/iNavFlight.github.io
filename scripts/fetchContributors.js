const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const CONTRIBUTORS_DATA_URL = 'https://github.com/inavflight/inav/graphs/contributors-data';
const OUTPUT_FILE = path.join(__dirname, '../static/contributors-cache.json');

const fetchJson = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers: { Accept: 'application/json', 'User-Agent': 'node-fetch' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode !== 200) {
        return reject(new Error(`GitHub request failed: ${res.statusCode}`));
      }
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(new Error(`Unable to parse JSON: ${err.message}`));
      }
    });
  }).on('error', reject);
});

const normalizeContributor = (entry) => {
  if (!entry || typeof entry !== 'object' || !entry.author) {
    return null;
  }

  const { author, total, weeks } = entry;
  const login = author.login || (typeof author.path === 'string' ? author.path.replace(/^\//, '') : '');

  if (!login) {
    return null;
  }

  const lastContributionDate = Array.isArray(weeks)
    ? weeks.slice().reverse().find((week) => {
      const contributions = (week.a || 0) + (week.d || 0) + (week.c || 0);
      return contributions > 0 && typeof week.w === 'number';
    })
    : null;

  const lastDate = lastContributionDate ? new Date(lastContributionDate.w * 1000).toISOString() : null;

  return {
    login,
    id: typeof author.id === 'number' ? author.id : Math.abs(login.split('').reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0)),
    avatar_url: author.avatar || `https://avatars.githubusercontent.com/${login}`,
    html_url: typeof author.path === 'string' ? `https://github.com${author.path}` : `https://github.com/${login}`,
    contributions: typeof total === 'number' ? total : 0,
    lastContributionDate: lastDate,
  };
};

const run = async () => {
  console.log('Fetching contributor data from GitHub...');
  const raw = await fetchJson(CONTRIBUTORS_DATA_URL);

  if (!Array.isArray(raw)) {
    throw new Error('Unexpected contributor data format from GitHub.');
  }

  const contributors = raw
    .map(normalizeContributor)
    .filter((item) => item !== null);

  const output = {
    generatedAt: new Date().toISOString(),
    contributors,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${contributors.length} contributors to ${OUTPUT_FILE}`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
