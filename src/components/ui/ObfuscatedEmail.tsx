// Email never appears in plain HTML — bots scraping static source get nothing.
// Decoded in the browser via ROT13 only when the component mounts.

import { useEffect, useRef } from 'react';

interface Props {
  encoded:    string; // ROT13 of the real email
  className?: string;
}

function rot13(s: string) {
  return s.replace(/[a-zA-Z]/g, c => {
    const b = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b);
  });
}

export default function ObfuscatedEmail({ encoded, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const email = rot13(encoded);
    ref.current.href = `mailto:${email}`;
    ref.current.textContent = email;
  }, [encoded]);

  return (
    <a ref={ref} href="#" className={className} aria-label="Email Emil">
      ···
    </a>
  );
}
