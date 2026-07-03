import { Section } from '../components/ui/Section';
import { experiences } from '../constants/portfolio';

export function ExperiencePage() {
  const items = [
    ...experiences.map((experience) => ({
      title: experience.title,
      organization: experience.organization,
      period: experience.period,
      description: experience.description,
    })),
  ];

  return (
    <Section id="experience" title="활동 및 경험">
      {items.map((item) => (
        <article key={`${item.title}-${item.period}`}>
          <h3>{item.title}</h3>
          <p>
            {item.organization} · {item.period}
          </p>
          <p>{item.description}</p>
        </article>
      ))}
    </Section>
  );
}
