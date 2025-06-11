import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Github, GitPullRequest, GitBranch, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GitHubPR {
  id: number;
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  state: string;
  merged_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  base: {
    repo: {
      name: string;
      full_name: string;
      language: string | null;
    };
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
}

interface GitHubStats {
  totalPRs: number;
  totalRepos: number;
  totalCommits: number;
}

const OpenSource = () => {
  const [prs, setPrs] = useState<GitHubPR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<GitHubStats>({
    totalPRs: 0,
    totalRepos: 0,
    totalCommits: 1250, // Static value for 1200+ commits
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Optional: Add GitHub Personal Access Token to avoid rate limits
        // const headers = { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` };
        const prResponse = await fetch(
          'https://api.github.com/search/issues?q=author:ankush1oo8+type:pr+is:merged&sort=updated&per_page=6'
          // { headers } // Uncomment and set VITE_GITHUB_TOKEN in .env if using a token
        );
        if (!prResponse.ok) {
          if (prResponse.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
          }
          throw new Error(`GitHub PR API error: ${prResponse.status}`);
        }
        const prData = await prResponse.json();
        console.log('PR Data:', prData.items); // Debug log to inspect html_url

        // Fetch repositories
        let allRepos: any[] = [];
        let page = 1;
        const perPage = 100;

        while (true) {
          const reposResponse = await fetch(
            `https://api.github.com/users/ankush1oo8/repos?per_page=${perPage}&page=${page}`
            // { headers } // Uncomment if using a token
          );
          if (!reposResponse.ok) {
            if (prResponse.status === 403) {
              throw new Error('GitHub API rate limit exceeded. Please try again later.');
            }
            throw new Error(`GitHub Repos API error: ${reposResponse.status}`);
          }
          const reposData = await reposResponse.json();
          allRepos = [...allRepos, ...reposData];
          if (reposData.length < perPage) break;
          page++;
        }

        if (prData.items && Array.isArray(prData.items)) {
          setPrs(prData.items);
          setStats((prevStats) => ({
            ...prevStats,
            totalPRs: prData.total_count || 0,
            totalRepos: allRepos.length || 0,
          }));
        } else {
          throw new Error('Invalid PR data received');
        }
      } catch (error: any) {
        console.error('Error fetching GitHub data:', error);
        setError(error.message || 'Failed to fetch GitHub data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Function to validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle button click
  const handleRedirect = (url: string, prNumber: number) => {
    console.log(`Button clicked for PR #${prNumber}, URL: ${url}`); // Debug log
    const validUrl = isValidUrl(url) ? url : 'https://github.com/ankush1oo8';
    window.location.href = validUrl; // Direct redirect
  };

  if (loading) {
    return (
      <section className="py-32 bg-charcoal/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 bg-charcoal/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-charcoal/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-playfair font-bold mb-6">
            Open Source <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contributing to the developer community through merged pull requests
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="premium-border p-6 text-center hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">{stats.totalPRs}</div>
            <p className="text-muted-foreground">Merged PRs</p>
          </div>
          <div className="premium-border p-6 text-center hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">{stats.totalRepos}</div>
            <p className="text-muted-foreground">Total Repositories</p>
          </div>
          <div className="premium-border p-6 text-center hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">{stats.totalCommits}</div>
            <p className="text-muted-foreground">Total Commits</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prs.map((pr, index) => (
            <motion.div
              key={pr.id}
              className="premium-border p-6 hover-lift glow-effect group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`pr-card-${pr.number}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <GitPullRequest className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-muted-foreground">#{pr.number}</span>
                  </div>
                 
                </div>

                <h3 className="text-lg font-bold group-hover:text-gradient transition-colors line-clamp-2">
                  {pr.title || 'Untitled PR'}
                </h3>

                <p className="text-sm text-muted-foreground">
                  <GitBranch className="h-4 w-4 inline mr-1" />
                  {pr.base?.repo?.full_name || 'Unknown Repository'}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem] line-clamp-3">
                  {pr.body || 'No description available'}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <img
                      src={pr.user?.avatar_url || 'https://github.com/identicons/anonymous.png'}
                      alt={pr.user?.login || 'Anonymous'}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{pr.user?.login || 'Unknown'}</span>
                  </div>
                  {pr.base?.repo?.language && (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>{pr.base.repo.language}</span>
                    </div>
                  )}
                </div>

                {pr.labels && pr.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {pr.labels.slice(0, 2).map((label) => (
                      <span
                        key={label.name}
                        className="px-2 py-1 text-xs bg-accent rounded text-accent-foreground"
                        style={{ backgroundColor: `#${label.color}20` }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="group glow-effect"
            onClick={() => {
              console.log('View More button clicked');
              window.location.href = 'https://github.com/ankush1oo8';
            }}
            data-testid="view-more-button"
          >
            <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;