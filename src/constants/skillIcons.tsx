import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import {
  SiArgo,
  SiBun,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiKubernetes,
  SiNginx,
  SiNodedotjs,
  SiNpm,
  SiPnpm,
  SiProxmox,
  SiReact,
  SiReactquery,
  SiStorybook,
  SiSwagger,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVite,
  SiYarn,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

export type SkillIcon = {
  Icon: IconType;
  /** 브랜드 색. 비우면 현재 텍스트 색을 따릅니다(검정 로고 등 다크 모드 대응). */
  color?: string;
};

/** 기술 이름 → 로고. 없는 항목은 SkillCards에서 모노그램으로 대체합니다. */
export const skillIcons: Record<string, SkillIcon> = {
  React: { Icon: SiReact, color: '#61DAFB' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'React Query': { Icon: SiReactquery, color: '#FF4154' },
  Vite: { Icon: SiVite, color: '#646CFF' },
  Storybook: { Icon: SiStorybook, color: '#FF4785' },

  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  Express: { Icon: SiExpress },
  Swagger: { Icon: SiSwagger, color: '#85EA2D' },

  Docker: { Icon: SiDocker, color: '#2496ED' },
  Kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  Nginx: { Icon: SiNginx, color: '#009639' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
  Argo: { Icon: SiArgo, color: '#EF7B4D' },
  'Proxmox VE': { Icon: SiProxmox, color: '#E57000' },

  AWS: { Icon: FaAws, color: '#FF9900' },
  Azure: { Icon: VscAzure, color: '#0078D4' },

  TurboRepo: { Icon: SiTurborepo, color: '#EF4444' },
  Git: { Icon: SiGit, color: '#F05032' },
  GitHub: { Icon: SiGithub },

  npm: { Icon: SiNpm, color: '#CB3837' },
  pnpm: { Icon: SiPnpm, color: '#F69220' },
  'Yarn Berry': { Icon: SiYarn, color: '#2C8EBB' },
  Bun: { Icon: SiBun },
};

/** 로고가 없는 기술에 쓸 모노그램 색 */
export const skillMonogramColors: Record<string, string> = {
  Emotion: '#D36AC2',
  Zustand: '#B8793B',
};
