import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../../constants/site';
import { SplitTitle } from '../common/SplitTitle';
import { useReveal } from '../../hooks/useReveal';
import { usePushToast } from '../../stores/settingStore';

const Shell = styled.section`
  width: min(1280px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[20]} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    width: min(1280px, calc(100% - 4rem));
  }
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[16]};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.875rem, 3.2vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Lead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing[2]};

  .question {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
  }

  .welcome {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.25rem;
    font-weight: 600;
    transition: opacity 300ms ease;
  }
`;

const EmailButton = styled.button`
  display: block;
  width: 100%;
  margin: 0 0 ${({ theme }) => theme.spacing[12]};
  padding: 0;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  text-align: left;
`;

const Letters = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

const Letter = styled.span<{ index: number; visible: boolean }>`
  display: inline-block;
  font-size: clamp(24px, 7vw, 90px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.1;
  opacity: 0;
  transform: translateY(110%);
  animation: ${({ visible }) => (visible ? 'rise 600ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards' : 'none')};
  animation-delay: ${({ index }) => index * 40}ms;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Column = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing[6]};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1rem;
    line-height: 1.8;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const ActionLink = styled.a`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  transition: gap 200ms ease;

  &:hover {
    gap: ${({ theme }) => theme.spacing[3]};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export function ContactSection() {
  const pushToast = usePushToast();
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const letters = siteConfig.email.split('');

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    pushToast('이메일을 복사했습니다.', 'success');
  };

  return (
    <Shell id="contact">
      <Title>
        <SplitTitle text="CONTACT" />
      </Title>
      <Lead>
        <span className="question">저에 대해 궁금한 점이 있으신가요?</span>
        <span className="welcome">메일은 언제든 환영이에요 :)</span>
      </Lead>
      <EmailButton type="button" onClick={copyEmail} aria-label="이메일 주소 복사">
        <Letters ref={ref} aria-hidden="true">
          {letters.map((letter, index) => (
            <Letter key={`${letter}-${index}`} index={index} visible={isVisible}>
              {letter}
            </Letter>
          ))}
        </Letters>
        <span className="sr-only">{siteConfig.email}</span>
      </EmailButton>
      <Columns>
        <Column>
          <ActionLink href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub 보러가기
            <ArrowRight />
          </ActionLink>
          <ActionLink href={siteConfig.resumeUrl} download="전재준_포트폴리오.pdf">
            포트폴리오 PDF 다운로드
            <ArrowRight />
          </ActionLink>
        </Column>
      </Columns>
    </Shell>
  );
}
