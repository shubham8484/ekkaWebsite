type LogoMarkProps = {
  size?: number;
  gradientId?: string;
};

export default function LogoMark({ size = 40, gradientId = 'brandGrad' }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22D3EE" />
          <stop offset="0.55" stopColor="#818CF8" />
          <stop offset="1" stopColor="#C084FC" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="12"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        fill="rgba(15,22,40,0.85)"
      />
      <path
        d="M14 16c0-3.5 2.8-6.5 7-6.5 3.2 0 5.6 1.4 6.8 3.6"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M13.5 24c0 7.2 5.2 12.5 12.8 12.5 4.6 0 8.2-1.8 10.2-4.8"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M24.5 13.2c.2-1.6 1.4-2.7 2.9-2.7 1.7 0 2.9 1.2 2.9 2.9 0 2.4-2.8 4.2-2.9 4.2s-2.9-1.8-2.9-4.2c0-.07 0-.13.02-.2Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
