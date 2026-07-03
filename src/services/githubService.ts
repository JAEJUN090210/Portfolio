import { projects } from '../constants/portfolio';
import { siteConfig } from '../constants/site';
import type { GithubRepository } from '../types/portfolio';

const fallbackRepositories: GithubRepository[] = projects.map((project, index) => ({
  id: index + 1,
  name: project.id,
  html_url: project.githubUrl,
  description: project.summary,
  stargazers_count: 12 - index * 3,
  updated_at: new Date(Date.now() - index * 86400000 * 10).toISOString(),
}));

export async function getLatestRepositories(): Promise<GithubRepository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${siteConfig.githubUser}/repos?sort=updated&per_page=4`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    );

    if (!response.ok) {
      return fallbackRepositories;
    }

    const repositories = (await response.json()) as GithubRepository[];
    return repositories.length > 0 ? repositories : fallbackRepositories;
  } catch {
    return fallbackRepositories;
  }
}
