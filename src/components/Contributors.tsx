import React, { useState, useEffect } from 'react';

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  lastContributionDate?: string | null;
}

const CONTRIBUTORS_CACHE_KEY = 'inav-contributors-cache';
const CONTRIBUTORS_CACHE_TS_KEY = 'inav-contributors-cache-ts';
const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7;
const CONTRIBUTORS_DATA_URL = 'https://github.com/inavflight/inav/graphs/contributors-data';
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

const getCache = (): { contributors: Contributor[]; timestamp: number } | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(CONTRIBUTORS_CACHE_KEY);
    const ts = localStorage.getItem(CONTRIBUTORS_CACHE_TS_KEY);

    if (!raw || !ts) {
      return null;
    }

    const contributors = JSON.parse(raw) as Contributor[];
    const timestamp = Number(ts);

    if (!Array.isArray(contributors) || Number.isNaN(timestamp)) {
      return null;
    }

    return { contributors, timestamp };
  } catch {
    return null;
  }
};

const setCache = (contributors: Contributor[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CONTRIBUTORS_CACHE_KEY, JSON.stringify(contributors));
    localStorage.setItem(CONTRIBUTORS_CACHE_TS_KEY, Date.now().toString());
  } catch {
    // Ignore storage failures.
  }
};

const isStale = (timestamp: number) => Date.now() - timestamp > ONE_WEEK_MS;

const hashStringToId = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getLastContributionDate = (weeks: any[]): string | null => {
  if (!Array.isArray(weeks)) {
    return null;
  }

  for (let i = weeks.length - 1; i >= 0; i -= 1) {
    const week = weeks[i];
    const contributions = (week.a || 0) + (week.d || 0) + (week.c || 0);
    if (contributions > 0 && typeof week.w === 'number') {
      return new Date(week.w * 1000).toISOString();
    }
  }

  return null;
};

const parseContributor = (entry: any): Contributor | null => {
  if (!entry || typeof entry !== 'object' || !entry.author) {
    return null;
  }

  const { author, total, weeks } = entry;
  const login = author.login || (typeof author.path === 'string' ? author.path.replace(/^\//, '') : '');

  if (!login) {
    return null;
  }

  return {
    login,
    id: typeof author.id === 'number' ? author.id : hashStringToId(login),
    avatar_url: author.avatar || `https://avatars.githubusercontent.com/${login}`,
    html_url: typeof author.path === 'string' ? `https://github.com${author.path}` : `https://github.com/${login}`,
    contributions: typeof total === 'number' ? total : 0,
    lastContributionDate: getLastContributionDate(weeks),
  };
};

const sortContributors = (contributors: Contributor[]) =>
  [...contributors].sort((a, b) => {
    if (a.lastContributionDate && b.lastContributionDate) {
      return b.lastContributionDate.localeCompare(a.lastContributionDate);
    }
    if (a.lastContributionDate) {
      return -1;
    }
    if (b.lastContributionDate) {
      return 1;
    }
    return b.contributions - a.contributions;
  });

const fetchStaticCache = async (): Promise<{ contributors: Contributor[]; timestamp: number } | null> => {
  try {
    const response = await fetch('/contributors-cache.json');
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (!data.contributors || !Array.isArray(data.contributors) || !data.generatedAt) {
      return null;
    }
    const timestamp = new Date(data.generatedAt).getTime();
    return { contributors: data.contributors, timestamp };
  } catch {
    return null;
  }
};

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContributors = async () => {
      try {
        const proxyUrl = `${CORS_PROXY}${encodeURIComponent(CONTRIBUTORS_DATA_URL)}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch contributor data via proxy');
        }

        const proxyData = await response.json();
        const rawData = JSON.parse(proxyData.contents);

        if (!Array.isArray(rawData)) {
          throw new Error('Unexpected contributor data format');
        }

        const parsed = rawData
          .map(parseContributor)
          .filter((item): item is Contributor => item !== null);

        const sorted = sortContributors(parsed);

        if (isMounted) {
          setContributors(sorted);
          setError(null);
        }

        setCache(sorted);
      } catch (err) {
        // If fetch fails, keep current data or set error if no data
        if (contributors.length === 0) {
          setError(err instanceof Error ? err.message : 'Unable to load contributors');
        }
      }
    };

    const loadData = async () => {
      // First, try static cache
      const staticData = await fetchStaticCache();
      if (staticData && isMounted) {
        setContributors(sortContributors(staticData.contributors));
        setLoading(false);
        // If static is stale, try to update with dynamic
        if (isStale(staticData.timestamp)) {
          fetchContributors();
        }
      } else {
        // Fallback to localStorage
        const cached = getCache();
        if (cached && isMounted) {
          setContributors(sortContributors(cached.contributors));
          setLoading(false);
          // If stale, fetch
          if (isStale(cached.timestamp)) {
            fetchContributors();
          }
        } else {
          // No cache, fetch dynamic
          await fetchContributors();
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading contributors...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Top 100 Recent Contributors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {contributors.map((contributor) => (
          <div key={contributor.login} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
            <img src={contributor.avatar_url} alt={contributor.login} width="50" height="50" style={{ borderRadius: '50%' }} />
            <br />
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
              {contributor.login}
            </a>
            <br />
            {contributor.contributions} contributions
            <br />
            {contributor.lastContributionDate ? (
              <small>Last: {new Date(contributor.lastContributionDate).toLocaleDateString()}</small>
            ) : (
              <small>No recent date</small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
