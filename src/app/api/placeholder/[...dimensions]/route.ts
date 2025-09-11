import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { dimensions: string[] } }
) {
  try {
    const dimensions = params.dimensions;
    
    if (!dimensions || dimensions.length < 2) {
      return NextResponse.json({ error: 'Invalid dimensions format' }, { status: 400 });
    }

    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return NextResponse.json({ error: 'Invalid dimensions' }, { status: 400 });
    }

    // Limit maximum dimensions for performance
    const maxWidth = Math.min(width, 2000);
    const maxHeight = Math.min(height, 2000);

    // Create a simple SVG placeholder
    const svg = `
      <svg width="${maxWidth}" height="${maxHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" 
              text-anchor="middle" 
              dominant-baseline="middle" 
              font-family="Arial, sans-serif" 
              font-size="24" 
              fill="#999999">
          ${maxWidth} × ${maxHeight}
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}