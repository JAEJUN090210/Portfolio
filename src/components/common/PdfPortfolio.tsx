import styled from '@emotion/styled';
import { awards, experiences, projects, skills } from '../../constants/portfolio';
import { siteConfig } from '../../constants/site';

const Sheet = styled.div`
  position: fixed;
  left: -10000px;
  top: 0;
  width: 794px;
  min-height: 1123px;
  padding: 48px;
  color: #111111;
  background: #ffffff;
  font-family: Inter, Arial, sans-serif;

  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  h1 {
    margin-bottom: 10px;
    font-size: 42px;
    line-height: 1.1;
    letter-spacing: 0;
  }

  h2 {
    margin-bottom: 12px;
    border-bottom: 1px solid #dedede;
    padding-bottom: 8px;
    font-size: 19px;
  }

  p,
  li {
    color: #3d3d3d;
    line-height: 1.55;
  }
`;

const Hero = styled.div`
  margin-bottom: 34px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
`;

const Block = styled.section`
  margin-bottom: 28px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  border: 1px solid #d8d8d8;
  border-radius: 999px;
  padding: 4px 8px;
  color: #333333;
  font-size: 11px;
  font-weight: 700;
`;

export function PdfPortfolio() {
  return (
    <Sheet id="portfolio-print" aria-hidden="true">
      <Hero>
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.role} · React · TypeScript · UI 구현 · 상태 관리 · 반응형 웹</p>
        <p>
          {siteConfig.email} · {siteConfig.githubUrl}
        </p>
      </Hero>
      <Grid>
        <Block>
          <h2>프로젝트</h2>
          {projects.map((project) => (
            <article key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Tags>
                {project.tags.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </Tags>
            </article>
          ))}
        </Block>
        <div>
          <Block>
            <h2>기술 스택</h2>
            <Tags>
              {skills.map((skill) => (
                <Tag key={skill.name}>{skill.name}</Tag>
              ))}
            </Tags>
          </Block>
          <Block>
            <h2>경험</h2>
            {experiences.map((experience) => (
              <article key={experience.title}>
                <h3>{experience.title}</h3>
                <p>
                  {experience.organization} · {experience.period}
                </p>
                <p>{experience.description}</p>
              </article>
            ))}
          </Block>
          <Block>
            <h2>활동</h2>
            {awards.map((award) => (
              <p key={award.title}>
                <strong>{award.title}</strong> · {award.issuer} · {award.year}
              </p>
            ))}
          </Block>
        </div>
      </Grid>
    </Sheet>
  );
}
