import React, { useState, useEffect } from 'react';

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/inavflight/inav/contributors?per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }
        const data: Contributor[] = await response.json();
        setContributors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return <div>Loading contributors...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Top 100 Contributors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {contributors.map((contributor) => (
          <div key={contributor.id} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
            <img src={contributor.avatar_url} alt={contributor.login} width="50" height="50" style={{ borderRadius: '50%' }} />
            <br />
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
              {contributor.login}
            </a>
            <br />
            {contributor.contributions} contributions
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;