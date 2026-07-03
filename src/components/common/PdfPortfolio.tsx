import styled from '@emotion/styled';
import { awards, experiences, pdfProfile, projects, skills } from '../../constants/portfolio';
import { siteConfig } from '../../constants/site';
import type { SkillCategory } from '../../types/portfolio';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const skillCategoryOrder: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Tools',
  'PackageManager',
  'DevOps',
  'Cloud',
];

const skillGroups = skillCategoryOrder
  .map((category) => ({
    title: category,
    items: skills.filter((skill) => skill.category === category),
  }))
  .filter((group) => group.items.length > 0);

const Sheet = styled.div`
  position: fixed;
  left: -10000px;
  top: 0;
  width: ${A4_WIDTH}px;
  color: #151515;
  background: #ffffff;
  font-family:
    Inter, 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, sans-serif;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const Page = styled.section`
  position: relative;
  width: ${A4_WIDTH}px;
  height: ${A4_HEIGHT}px;
  overflow: hidden;
  padding: 52px 56px 48px;
  background: #ffffff;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 28px;
  align-items: start;
  border-bottom: 2px solid #111111;
  padding-bottom: 24px;
`;

const Name = styled.h1`
  margin: 0;
  color: #0d0d0d;
  font-size: 38px;
  font-weight: 850;
  line-height: 1.16;
  letter-spacing: 0;
`;

const Role = styled.p`
  margin: 8px 0 0;
  color: #2563eb;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.4;
`;

const Contact = styled.div`
  display: grid;
  gap: 5px;
  color: #444444;
  font-size: 10.5px;
  line-height: 1.45;
  text-align: right;
`;

const Lead = styled.p`
  margin: 22px 0 0;
  max-width: 620px;
  color: #2f2f2f;
  font-size: 13px;
  line-height: 1.8;
`;

const Section = styled.section`
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 13px;
  color: #111111;
  font-size: 14px;
  font-weight: 850;
  line-height: 1.3;
  text-transform: uppercase;

  &::before {
    width: 5px;
    height: 16px;
    border-radius: 2px;
    background: #2563eb;
    content: '';
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`;

const SkillBox = styled.div`
  border: 1px solid #dce2ea;
  border-radius: 8px;
  padding: 13px 14px 12px;

  h3 {
    margin: 0 0 8px;
    color: #171717;
    font-size: 11.5px;
    line-height: 1.3;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  border: 1px solid #cfd8e3;
  border-radius: 999px;
  padding: 3px 7px;
  background: #ffffff;
  color: #344054;
  font-size: 9.5px;
  font-weight: 750;
  line-height: 1.35;
`;

const ProjectList = styled.div`
  display: grid;
  gap: 13px;
`;

const ProjectItem = styled.article`
  break-inside: avoid;
  border: 1px solid #d9e1eb;
  border-radius: 8px;
  padding: 15px 16px;
  background: #ffffff;

  h3 {
    margin: 0;
    color: #111111;
    font-size: 14px;
    font-weight: 850;
    line-height: 1.35;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
  margin-bottom: 8px;
`;

const Period = styled.span`
  flex: 0 0 auto;
  color: #5d6675;
  font-size: 10px;
  font-weight: 800;
  line-height: 1.5;
`;

const Description = styled.p`
  margin: 0;
  color: #343434;
  font-size: 11px;
  line-height: 1.72;
`;

const DetailList = styled.dl`
  display: grid;
  gap: 7px;
  margin: 11px 0 0;

  div {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 8px;
  }

  dt {
    color: #1f2937;
    font-size: 10.5px;
    font-weight: 850;
    line-height: 1.65;
  }

  dd {
    margin: 0;
    color: #343434;
    font-size: 10.5px;
    line-height: 1.65;
  }
`;

const Stack = styled(Tags)`
  margin-top: 11px;
`;

const ExperienceList = styled.div`
  display: grid;
  gap: 11px;
`;

const ExperienceItem = styled.article`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 14px;
  break-inside: avoid;
  border-bottom: 1px solid #e5e9ef;
  padding-bottom: 11px;

  h3 {
    margin: 0 0 4px;
    color: #111111;
    font-size: 12.5px;
    font-weight: 850;
    line-height: 1.45;
  }

  strong {
    display: block;
    margin-bottom: 4px;
    color: #4b5563;
    font-size: 10.5px;
    line-height: 1.4;
  }
`;

const CompactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
`;

const AwardBox = styled.div`
  border: 1px solid #dce2ea;
  border-radius: 8px;
  padding: 13px 14px;
  background: #f8fafc;

  h3 {
    margin: 0 0 6px;
    color: #111111;
    font-size: 12px;
    line-height: 1.4;
  }

  p {
    margin: 0;
    color: #4b5563;
    font-size: 10.5px;
    line-height: 1.6;
  }
`;

const Footer = styled.footer`
  position: absolute;
  right: 56px;
  bottom: 28px;
  left: 56px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  padding-top: 10px;
  color: #7a7f89;
  font-size: 9.5px;
  line-height: 1.4;
`;

export function PdfPortfolio() {
  return (
    <Sheet id="portfolio-print" aria-hidden="true">
      <Page>
        <Header>
          <div>
            <Name>{siteConfig.name}</Name>
            <Role>{siteConfig.role}</Role>
            <Lead>{pdfProfile.summary}</Lead>
          </div>
          <Contact>
            <span>{siteConfig.email}</span>
            <span>{siteConfig.githubUrl}</span>
            <span>{siteConfig.canonicalUrl}</span>
          </Contact>
        </Header>

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <SkillGrid>
            {skillGroups.map((group) => (
              <SkillBox key={group.title}>
                <h3>{group.title}</h3>
                <Tags>
                  {group.items.map((skill) => (
                    <Tag key={skill.name}>{skill.name}</Tag>
                  ))}
                </Tags>
              </SkillBox>
            ))}
          </SkillGrid>
        </Section>

        <Section>
          <SectionTitle>Projects</SectionTitle>
          <ProjectList>
            {projects.slice(0, 3).map((project) => (
              <ProjectItem key={project.id}>
                <ItemHeader>
                  <h3>{project.title}</h3>
                  <Period>{project.year}</Period>
                </ItemHeader>
                <Description>{project.summary}</Description>
                <DetailList>
                  <div>
                    <dt>담당</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>성과</dt>
                    <dd>{project.problemSolving}</dd>
                  </div>
                </DetailList>
                <Stack>
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Stack>
              </ProjectItem>
            ))}
          </ProjectList>
        </Section>

        <Footer>
          <span>{siteConfig.name} Portfolio</span>
          <span>1 / 2</span>
        </Footer>
      </Page>

      <Page>
        <Section>
          <SectionTitle>Experience</SectionTitle>
          <ExperienceList>
            {experiences.map((experience) => (
              <ExperienceItem key={`${experience.title}-${experience.period}`}>
                <Period>{experience.period}</Period>
                <div>
                  <h3>{experience.title}</h3>
                  <strong>{experience.organization}</strong>
                  <Description>{experience.description}</Description>
                </div>
              </ExperienceItem>
            ))}
          </ExperienceList>
        </Section>

        <Section>
          <SectionTitle>Awards</SectionTitle>
          <CompactGrid>
            {awards.map((award) => (
              <AwardBox key={award.title}>
                <h3>{award.title}</h3>
                <p>
                  {award.issuer} · {award.year}
                </p>
                <Description>{award.description}</Description>
              </AwardBox>
            ))}
          </CompactGrid>
        </Section>

        <Footer>
          <span>{siteConfig.name} Portfolio</span>
          <span>2 / 2</span>
        </Footer>
      </Page>
    </Sheet>
  );
}
