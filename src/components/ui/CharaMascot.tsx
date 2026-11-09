import { useEffect, useState, type CSSProperties } from 'react';

export type CharaName = 'awan' | 'bola' | 'kapsul' | 'kotak' | 'puncak';

const svgCache = new Map<CharaName, string>();

function transformCharaSvg(raw: string): string {
  return raw
    .replace(/width="400"\s+height="472"/g, 'width="100%" height="100%"')
    .replace(/#(9ADE7B|FFB84D|7C83FD|5BC0BE|FF6B8B)/gi, 'var(--chara-color)')
    .replace(/#(FFB3C1|7BD17B)/gi, 'color-mix(in srgb, var(--chara-color) 55%, white)');
}

interface CharaMascotProps {
  name: CharaName;
  color: string;
  className?: string;
}

export default function CharaMascot({ name, color, className = '' }: CharaMascotProps) {
  const [fetchedMarkup, setFetchedMarkup] = useState<string>('');
  const svgMarkup = svgCache.get(name) ?? fetchedMarkup;

  useEffect(() => {
    if (svgCache.has(name)) return;

    let cancelled = false;
    fetch(`/chara/${name}.svg`)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        const processed = transformCharaSvg(text);
        svgCache.set(name, processed);
        setFetchedMarkup(processed);
      })
      .catch(() => {
        // Ignore fetch errors gracefully
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  return (
    <div
      aria-hidden="true"
      style={{ '--chara-color': color } as CSSProperties}
      className={`select-none pointer-events-none [&_svg]:w-full [&_svg]:h-full [&_svg_*]:transition-[fill] [&_svg_*]:duration-500 ${className}`}
      dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
    />
  );
}
