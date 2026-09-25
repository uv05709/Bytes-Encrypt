export function BrandLogo({ footer = false }: { footer?: boolean }) {
  const strokeColor = footer ? "#8B7CFF" : "#5B4CFF";
  const opacity = footer ? 0.15 : 0.1;

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="14" fill="#5B4CFF" opacity={opacity} />
      <path
        d="M5 15h4l2-6 4 12 2-8 2 4h6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
