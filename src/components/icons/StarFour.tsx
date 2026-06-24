import type { SVGProps } from "react";

/**
 * Four-pointed star (sparkle) icon. Designed to drop in wherever lucide-react's <Star /> was used.
 * Sized in em so width/height/size props work like lucide.
 */
const StarFour = ({
  size = 16,
  className,
  fill = "currentColor",
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M12 1.5c.32 0 .6.2.7.5l2 5.7a3 3 0 0 0 1.9 1.9l5.7 2c.3.1.5.38.5.7s-.2.6-.5.7l-5.7 2a3 3 0 0 0-1.9 1.9l-2 5.7c-.1.3-.38.5-.7.5s-.6-.2-.7-.5l-2-5.7a3 3 0 0 0-1.9-1.9l-5.7-2c-.3-.1-.5-.38-.5-.7s.2-.6.5-.7l5.7-2a3 3 0 0 0 1.9-1.9l2-5.7c.1-.3.38-.5.7-.5Z" />
  </svg>
);

export default StarFour;