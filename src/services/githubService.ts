import { siteConfig } from '../constants/site';
import type {
  GithubActivitySummary,
  GithubContributionDay,
  GithubContributionLevel,
  GithubEvent,
  GithubRecentWork,
} from '../types/portfolio';

const EVENT_PAGES = [1, 2, 3] as const;
const EVENTS_PER_PAGE = 100;
const CONTRIBUTION_DAY_COUNT = 91;
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const normalizeGithubEvent = (value: unknown): GithubEvent | null => {
  if (!isRecord(value) || !isRecord(value.repo)) {
    return null;
  }

  const { id, type, repo, payload, public: isPublic, created_at: createdAt } = value;
  if (
    (typeof id !== 'string' && typeof id !== 'number') ||
    typeof type !== 'string' ||
    typeof repo.id !== 'number' ||
    typeof repo.name !== 'string' ||
    typeof isPublic !== 'boolean' ||
    typeof createdAt !== 'string' ||
    Number.isNaN(Date.parse(createdAt))
  ) {
    return null;
  }

  const normalizedPayload = isRecord(payload)
    ? {
        action: typeof payload.action === 'string' ? payload.action : undefined,
        ref_type: typeof payload.ref_type === 'string' ? payload.ref_type : undefined,
      }
    : {};

  return {
    id: String(id),
    type,
    repo: {
      id: repo.id,
      name: repo.name,
    },
    payload: normalizedPayload,
    public: isPublic,
    created_at: createdAt,
  };
};

const getActivityLabel = (event: GithubEvent): string | null => {
  switch (event.type) {
    case 'PushEvent':
      return '코드 푸시';
    case 'PullRequestEvent':
      return (
        {
          opened: 'PR 생성',
          merged: 'PR 병합',
          closed: 'PR 종료',
          reopened: 'PR 재개',
        }[event.payload.action ?? ''] ?? 'PR 관리'
      );
    case 'PullRequestReviewEvent':
      return 'PR 리뷰';
    case 'PullRequestReviewCommentEvent':
      return 'PR 리뷰 코멘트';
    case 'IssuesEvent':
      return (
        {
          opened: '이슈 생성',
          closed: '이슈 해결',
          reopened: '이슈 재개',
        }[event.payload.action ?? ''] ?? '이슈 관리'
      );
    case 'IssueCommentEvent':
      return '이슈 코멘트';
    case 'CommitCommentEvent':
      return '커밋 코멘트';
    case 'CreateEvent':
      return event.payload.ref_type === 'tag' ? '태그 생성' : '브랜치 생성';
    case 'DeleteEvent':
      return event.payload.ref_type === 'tag' ? '태그 삭제' : '브랜치 정리';
    case 'DiscussionEvent':
      return '토론 참여';
    case 'DiscussionCommentEvent':
      return '토론 코멘트';
    case 'ReleaseEvent':
      return '릴리스';
    case 'GollumEvent':
      return '위키 편집';
    case 'ForkEvent':
      return '저장소 포크';
    default:
      return null;
  }
};

const toLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getContributionLevel = (count: number, maximum: number): GithubContributionLevel => {
  if (count === 0) {
    return 0;
  }

  return Math.min(
    4,
    Math.max(1, Math.ceil((count / Math.max(1, maximum)) * 4)),
  ) as GithubContributionLevel;
};

const buildContributionDays = (events: GithubEvent[], now: Date): GithubContributionDay[] => {
  const activityByDate = new Map<string, number>();
  events.forEach((event) => {
    const dateKey = toLocalDateKey(new Date(event.created_at));
    activityByDate.set(dateKey, (activityByDate.get(dateKey) ?? 0) + 1);
  });

  const maximum = Math.max(0, ...activityByDate.values());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return Array.from({ length: CONTRIBUTION_DAY_COUNT }, (_, index) => {
    const date = new Date(
      today.getTime() - (CONTRIBUTION_DAY_COUNT - index - 1) * DAY_IN_MILLISECONDS,
    );
    const dateKey = toLocalDateKey(date);
    const count = activityByDate.get(dateKey) ?? 0;

    return {
      date: dateKey,
      count,
      level: getContributionLevel(count, maximum),
    };
  });
};

export const summarizeGithubEvents = (
  events: GithubEvent[],
  now = new Date(),
): GithubActivitySummary => {
  const uniqueEvents = [...new Map(events.map((event) => [event.id, event])).values()];
  const activityEvents = uniqueEvents
    .filter((event) => event.public)
    .map((event) => ({ event, label: getActivityLabel(event) }))
    .filter(
      (activity): activity is { event: GithubEvent; label: string } => activity.label !== null,
    )
    .sort((a, b) => Date.parse(b.event.created_at) - Date.parse(a.event.created_at));

  const recentWorkByRepository = new Map<number, GithubRecentWork>();
  activityEvents.forEach(({ event, label }) => {
    const current = recentWorkByRepository.get(event.repo.id);
    if (!current) {
      recentWorkByRepository.set(event.repo.id, {
        repositoryId: event.repo.id,
        repositoryName: event.repo.name,
        repositoryUrl: `https://github.com/${event.repo.name}`,
        latestActivityAt: event.created_at,
        activityCount: 1,
        activityLabels: [label],
      });
      return;
    }

    current.activityCount += 1;
    if (!current.activityLabels.includes(label)) {
      current.activityLabels.push(label);
    }
  });

  return {
    contributionDays: buildContributionDays(
      activityEvents.map(({ event }) => event),
      now,
    ),
    recentWork: [...recentWorkByRepository.values()].sort(
      (a, b) => Date.parse(b.latestActivityAt) - Date.parse(a.latestActivityAt),
    ),
    totalActivityCount: activityEvents.length,
  };
};

const fetchGithubEventsPage = async (page: number): Promise<GithubEvent[]> => {
  const response = await fetch(
    `https://api.github.com/users/${siteConfig.githubUser}/events/public?per_page=${EVENTS_PER_PAGE}&page=${page}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub events request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('GitHub events response is not an array');
  }

  return data.map(normalizeGithubEvent).filter((event): event is GithubEvent => event !== null);
};

let activityRequest: Promise<GithubActivitySummary> | null = null;

export function getRecentGithubActivity(): Promise<GithubActivitySummary> {
  if (!activityRequest) {
    activityRequest = Promise.allSettled(EVENT_PAGES.map(fetchGithubEventsPage))
      .then((results) => {
        const firstPage = results[0];
        if (firstPage.status === 'rejected') {
          throw firstPage.reason;
        }

        const events = results.flatMap((result) =>
          result.status === 'fulfilled' ? result.value : [],
        );
        return summarizeGithubEvents(events);
      })
      .catch((error: unknown) => {
        activityRequest = null;
        throw error;
      });
  }

  return activityRequest;
}
