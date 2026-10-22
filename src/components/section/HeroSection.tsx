import styled from '@emotion/styled';
import { Fragment } from 'react';
import { hero, siteConfig } from '../../constants/site';
import { ScrambleText } from '../common/ScrambleText';
import { Tag } from '../ui/Tag';

const Shell = styled.section`
  width: min(896px, calc(100% - 3rem));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    width: min(896px, calc(100% - 8rem));
  }
`;

const Frame = styled.div`
  display: flex;
  min-height: calc(100vh - 3.75rem);
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[12]};

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    grid-template-columns: 3fr 2fr;
    gap: ${({ theme }) => theme.spacing[16]};
  }
`;

const Primary = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const Title = styled.h1`
  margin: ${({ theme }) => theme.spacing[2]} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(1.5rem, 2.6vw, 1.875rem);
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: -0.025em;

  span {
    display: block;
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(3rem, 7vw, 4.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }
`;

const Intro = styled.div`
  display: grid;
  max-width: 28rem;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const IntroText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(1.1rem, 1.6vw, 1.25rem);
  line-height: 1.65;
  white-space: pre-line;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
`;

const Secondary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const Block = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.mono};
  font-size: 0.875rem;
`;

const Current = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: 1rem;

  .role {
    color: ${({ theme }) => theme.colors.text};
  }

  .org {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .period {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.75rem;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export function HeroSection() {
  return (
    <Shell id="home">
      <Frame>
        <Grid>
          <Primary>
            <div>
              <Title>
                <span>
                  <ScrambleText text={siteConfig.name} stagger={450} delay={500} />
                </span>
              </Title>
            </div>
            <Intro>
              <IntroText>
                {hero.intro.map((segment, index) => (
                  <Fragment key={index}>
                    {segment.strong ? <strong>{segment.text}</strong> : segment.text}
                  </Fragment>
                ))}
              </IntroText>
              <Meta>
                {hero.meta.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </Meta>
            </Intro>
          </Primary>
          <Secondary>
            <Block>
              <Label>Profile</Label>
              <Current>
                <div className="role">
                  <ScrambleText text={hero.currently.role} stagger={60} delay={700} />
                </div>
                <div className="org">{hero.currently.organization}</div>
                <div className="period">{hero.currently.period}</div>
              </Current>
            </Block>
            <Block>
              <Label>FOCUS</Label>
              <Chips>
                {hero.focus.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </Chips>
            </Block>
          </Secondary>
        </Grid>
      </Frame>
    </Shell>
  );
}
