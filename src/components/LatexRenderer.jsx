import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * High-performance, robust KaTeX Math and Chemistry Formula Renderer
 * Parses plain text containing inline ($...$) and block ($$...$$) LaTeX expressions.
 */
export default function LatexRenderer({ text = '', className = '', inline = false }) {
  const renderedContent = useMemo(() => {
    if (!text || typeof text !== 'string') return null;

    // Pattern to match $$block$$ and $inline$
    // Supports multi-line blocks with $$...$$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      // Block LaTeX: $$ ... $$
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const formula = part.slice(2, -2).trim();
        try {
          const html = katex.renderToString(formula, {
            displayMode: true,
            throwOnError: false,
            strict: false,
          });
          return (
            <span
              key={index}
              className="my-3 block overflow-x-auto py-1 text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (err) {
          return <span key={index} className="text-red-500 font-mono text-sm">{part}</span>;
        }
      }

      // Inline LaTeX: $ ... $
      if (part.startsWith('$') && part.endsWith('$')) {
        const formula = part.slice(1, -1).trim();
        try {
          const html = katex.renderToString(formula, {
            displayMode: false,
            throwOnError: false,
            strict: false,
          });
          return (
            <span
              key={index}
              className="inline-block px-0.5 align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (err) {
          return <span key={index} className="text-red-500 font-mono text-sm">{part}</span>;
        }
      }

      // Plain text with line break preservation
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  }, [text]);

  return <div className={`latex-content leading-relaxed ${className}`}>{renderedContent}</div>;
}
