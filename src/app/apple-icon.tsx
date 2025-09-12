import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // Use your logo colors for Apple icon
      <div
        style={{
          fontSize: 48,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simplified version of your logo for Apple icon */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified version using your actual colors */}
          <circle cx="256" cy="256" r="220" fill="#4CA4A8" />
          <circle cx="256" cy="200" r="80" fill="#F79087" />
          <ellipse cx="190" cy="300" rx="40" ry="25" fill="#323c6b" />
          <ellipse cx="322" cy="300" rx="40" ry="25" fill="#323c6b" />
          <path d="M160 400 Q256 470 352 400" stroke="#957d61" strokeWidth="12" fill="none" />
          <circle cx="200" cy="180" r="15" fill="#fac95c" />
          <circle cx="312" cy="180" r="15" fill="#fac95c" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}