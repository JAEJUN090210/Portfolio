import { Copy, Download } from 'lucide-react';
import { Button, LinkButton } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { contactLinks } from '../constants/portfolio';
import { siteConfig } from '../constants/site';
import { downloadPortfolioPdf } from '../services/pdfService';
import { usePushToast } from '../stores/settingStore';

export function ContactPage() {
  const pushToast = usePushToast();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    pushToast('이메일을 복사했습니다.', 'success');
  };

  return (
    <Section id="contact" title="Contact">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        <Button type="button" icon={<Copy />} onClick={copyEmail}>
          이메일 복사
        </Button>
        <Button
          type="button"
          variant="secondary"
          icon={<Download />}
          onClick={() => downloadPortfolioPdf('portfolio-print', 'Jaejun-Jeon-Portfolio.pdf')}
        >
          PDF
        </Button>
      </div>
      {contactLinks.map((link) => (
        <p key={link.label}>
          <LinkButton
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            variant="ghost"
          >
            {link.label}: {link.value}
          </LinkButton>
        </p>
      ))}
    </Section>
  );
}
