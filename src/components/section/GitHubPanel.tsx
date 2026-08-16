import styled from '@emotion/styled';
import { GitCommitHorizontal, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteConfig } from '../../constants/site';
import { getRecentGithubActivity } from '../../services/githubService';
import type { GithubActivitySummary } from '../../types/portfolio';
import { formatDate } from '../../utils/format';
import { Skeleton } from '../ui/Skeleton';

const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ActivityOverview = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const ActivitySummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Dots = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 9px);
  grid-auto-columns: 9px;
  gap: 3px;
`;

const Dot = styled.span<{ level: number }>`
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: ${({ level, theme }) =>
    [
      'rgba(128,128,128,0.16)',
      'rgba(3,105,161,0.24)',
      'rgba(3,105,161,0.42)',
      'rgba(3,105,161,0.68)',
      theme.colors.accent,
    ][level]};
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
    min-width: 0;
    color: ${({ theme }) => theme.colors.text};
    transition: color 160ms ease;
    overflow-wrap: anywhere;
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

const LoadState = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;

  a {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
  }
`;

const formatActivityLabels = (labels: string[]) => {
  const visibleLabels = labels.slice(0, 4);
  const remainingCount = labels.length - visibleLabels.length;
  return `${visibleLabels.join(' · ')}${remainingCount > 0 ? ` 외 ${remainingCount}종` : ''}`;
};

const RECENT_REPOSITORY_LIMIT = 3;

export function GitHubPanel() {
  const [activity, setActivity] = useState<GithubActivitySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const recentWork = activity?.recentWork.slice(0, RECENT_REPOSITORY_LIMIT) ?? [];

  useEffect(() => {
    let isMounted = true;
    getRecentGithubActivity()
      .then((summary) => {
        if (isMounted) {
          setActivity(summary);
          setHasError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
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
      <ActivityOverview>
        <ActivitySummary>
          <Github size={17} aria-hidden="true" />
          <span>최근 공개 활동</span>
          {activity && (
            <strong>
              {activity.totalActivityCount}건 · {activity.recentWork.length}개 저장소
            </strong>
          )}
        </ActivitySummary>
        {activity && (
          <Dots
            aria-label={`최근 ${activity.contributionDays.length}일 동안 ${activity.totalActivityCount}건의 공개 활동`}
          >
            {activity.contributionDays.map((day) => (
              <Dot
                key={day.date}
                level={day.level}
                title={`${day.date}: 공개 활동 ${day.count}건`}
              />
            ))}
          </Dots>
        )}
      </ActivityOverview>
      <RepoList aria-live="polite">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} height="4.4rem" />)
        ) : hasError ? (
          <LoadState role="status">
            최근 공개 활동을 불러오지 못했습니다.{' '}
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
              GitHub 프로필에서 확인하기
            </a>
          </LoadState>
        ) : recentWork.length > 0 ? (
          recentWork.map((work) => (
            <Repo
              key={work.repositoryId}
              href={work.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              <RepoHeader>
                <strong>{work.repositoryName}</strong>
                <span aria-label={`공개 활동 ${work.activityCount}건`}>
                  <GitCommitHorizontal size={14} aria-hidden="true" /> {work.activityCount}
                </span>
              </RepoHeader>
              <Muted>{formatActivityLabels(work.activityLabels)}</Muted>
              <Muted>마지막 공개 활동 · {formatDate(work.latestActivityAt)}</Muted>
            </Repo>
          ))
        ) : (
          <LoadState role="status">최근 공개 활동이 없습니다.</LoadState>
        )}
      </RepoList>
    </Panel>
  );
}
