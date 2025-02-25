import { Section } from './Section';
import { Card } from './Card';
import ReactMarkdown from 'react-markdown';

interface IntroSectionProps {
  intro: {
    content: string;
  };
}

export function IntroSection({ intro }: IntroSectionProps) {
  return (
    <Section className="bg-gray-900">
      <Card className="max-w-3xl mx-auto p-8">
        <article className="text-white">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-8 text-white">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mt-12 mb-6 text-white">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="text-lg leading-relaxed mb-6 text-white/90">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 mb-8 ml-4">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start text-lg text-white/90">
                  <span className="mr-3 text-blue-400">•</span>
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-blue-400">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-blue-400">{children}</em>
              ),
            }}
          >
            {intro.content}
          </ReactMarkdown>
        </article>
      </Card>
    </Section>
  );
}