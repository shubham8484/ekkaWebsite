'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useId } from 'react';
import { site } from '@/data/content';
import LogoMark from '@/components/brand/LogoMark';

type LogoProps = {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Use full lockup image instead of icon mark */
  full?: boolean;
  onClick?: () => void;
};

export default function Logo({ href = '/', size = 'md', full = false, onClick }: LogoProps) {
  const gid = useId().replace(/:/g, '');
  const markPx = size === 'lg' ? 52 : size === 'sm' ? 32 : 40;
  const fullW = size === 'lg' ? 200 : size === 'sm' ? 120 : 160;
  const fullH = size === 'lg' ? 80 : size === 'sm' ? 48 : 64;

  const inner = full ? (
    <Image
      src="/assets/logo-full.png"
      alt={site.name}
      width={fullW}
      height={fullH}
      className="brand-logo__full"
      priority={size !== 'sm'}
    />
  ) : (
    <>
      <span className="brand-logo__mark" aria-hidden="true">
        <LogoMark size={markPx} gradientId={gid} />
      </span>
      <span className="brand-logo__text">
        <span className="brand-logo__name">
          EKKA <span className="brand-logo__media">MEDIA</span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`brand-logo brand-logo--${size}`} aria-label={`${site.name} home`} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return <span className={`brand-logo brand-logo--${size}`}>{inner}</span>;
}
