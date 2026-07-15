import { ImageResponse } from 'next/og';
import { site } from '@/data/content';

export const alt = `${site.legalName} — Creator Partnership Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(145deg, #070B14 0%, #0C1322 45%, #1A1A4A 100%)',
          color: '#F4F7FC',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '0.08em',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #22D3EE, #818CF8, #C084FC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070B14',
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            E
          </div>
          <span>EKKA MEDIA</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            Influence that moves your brand forward.
          </div>
          <div style={{ fontSize: 28, color: '#94A3B8', maxWidth: 780, lineHeight: 1.4 }}>
            Creator partnerships, UGC campaigns & culture-led storytelling
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#A78BFA',
          }}
        >
          <span>An Ottobaan Technologies Company</span>
          <span style={{ color: '#22D3EE' }}>ekkamedia.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
