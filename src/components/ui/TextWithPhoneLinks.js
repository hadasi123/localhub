// Utility component to detect phone-like patterns in text and convert them into tel: links
// Usage: <TextWithPhoneLinks text="call me at 054-123-4567" />

import React from 'react';

const phoneRegex = /(\+?\d[\d\s\-()]{6,}\d)/g; // at least 8 digits total, allows separators

function normalizePhone(raw) {
  if (!raw) return '';
  const trimmed = String(raw).trim();
  if (trimmed.startsWith('+')) {
    // keep leading +, strip other non-digits
    const rest = trimmed.slice(1).replace(/\D+/g, '');
    return `+${rest}`;
  }
  return trimmed.replace(/\D+/g, '');
}

const TextWithPhoneLinks = ({ text, linkClassName = 'text-primary hover:underline' }) => {
  if (text == null || text === '') return null;
  if (typeof text !== 'string') {
    // best effort: stringify
    text = String(text);
  }

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = phoneRegex.exec(text)) !== null) {
    const [full] = match;
    const start = match.index;
    const end = start + full.length;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    const normalized = normalizePhone(full);
    parts.push(
      <a key={`tel-${start}`} href={`tel:${normalized}`} className={linkClassName}>
        {full}
      </a>
    );

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
};

export default TextWithPhoneLinks;
