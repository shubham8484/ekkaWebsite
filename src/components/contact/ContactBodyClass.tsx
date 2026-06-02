'use client';

import { useEffect } from 'react';

export default function ContactBodyClass() {
  useEffect(() => {
    document.body.classList.add('contact-page');
    return () => document.body.classList.remove('contact-page');
  }, []);

  return null;
}
