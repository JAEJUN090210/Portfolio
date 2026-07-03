import styled from '@emotion/styled';
import { Github, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getLatestRepositories } from '../../services/githubService';
import type { GithubRepository } from '../../types/portfolio';
import { formatDate } from '../../utils/format';
import { Skeleton } from '../ui/Skeleton';

const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Activity = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const Dots = styled.div`
  display: flex;
  gap: 5px;
`;

const Dot = styled.span<{ level: number }>`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: ${({ level, theme }) =>
    ['rgba(128,128,128,0.16)', 'rgba(3,105,161,0.26)', 'rgba(3,105,161,0.46)', theme.colors.accent][
      level
    ]};
`;

const RepoList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Repo = styled.a`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[4]} 0;

  &:hover strong {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};

  strong {
    color: ${({ theme }) => theme.colors.text};
    transition: color 160ms ease;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 0.85rem;
  }
`;

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.65;
`;

export function GitHubPanel() {
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const activity = useMemo(() => [0, 1, 2, 1, 3, 2, 1, 2, 3, 1, 0, 2], []);

  useEffect(() => {
    let isMounted = true;
    getLatestRepositories()
      .then((items) => {
        if (isMounted) {
          setRepositories(items.slice(0, 3));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Panel>
      <Activity>
        <Github size={17} aria-hidden="true" />
        <span>최근 작업 흐름</span>
        <Dots aria-label="GitHub 활동 요약">
          {activity.map((level, index) => (
            <Dot key={`${level}-${index}`} level={level} />
          ))}
        </Dots>
      </Activity>
      <RepoList aria-live="polite">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} height="4.4rem" />)
          : repositories.map((repository) => (
              <Repo key={repository.id} href={repository.html_url} target="_blank" rel="noreferrer">
                <RepoHeader>
                  <strong>{repository.name}</strong>
                  <span aria-label={`${repository.stargazers_count} stars`}>
                    <Star size={14} /> {repository.stargazers_count}
                  </span>
                </RepoHeader>
                <Muted>{repository.description ?? '프로젝트 저장소입니다.'}</Muted>
                <Muted>
                  {repository.language ?? 'TypeScript'} · {formatDate(repository.updated_at)}
                </Muted>
              </Repo>
            ))}
      </RepoList>
    </Panel>
  );
}
