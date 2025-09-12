import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Use your logo SVG as a React component
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4CA4A8',
        }}
      >
        {/* Simple fallback - you can replace this with an SVG component */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified version of your logo for favicon */}
          <circle cx="256" cy="256" r="200" fill="#4CA4A8" />
          <circle cx="256" cy="220" r="60" fill="#F79087" />
          <ellipse cx="200" cy="320" rx="30" ry="20" fill="#323c6b" />
          <ellipse cx="312" cy="320" rx="30" ry="20" fill="#323c6b" />
          <path d="M180 400 Q256 450 332 400" stroke="#957d61" strokeWidth="8" fill="none" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}