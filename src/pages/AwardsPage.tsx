import { Section } from '../components/ui/Section';
import { awards } from '../constants/portfolio';

export function AwardsPage() {
  return (
    <Section id="awards" title="수상 및 발표">
      {awards.map((award) => (
        <article key={award.title}>
          <h3>{award.title}</h3>
          <p>
            {award.issuer} · {award.year}
          </p>
          <p>{award.description}</p>
        </article>
      ))}
    </Section>
  );
}
