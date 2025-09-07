import Image from 'next/image';

interface ExternalImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function ExternalImage({ 
  src, 
  alt, 
  width = 800, 
  height = 400, 
  className = "",
  priority = false 
}: ExternalImageProps) {
  // Check if the image URL is valid
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // If URL is invalid, use placeholder
  const imageSrc = isValidUrl(src) ? src : '/placeholder-image.jpg';

  return (
    <div className={`external-image-container ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        priority={priority}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder-image.jpg';
        }}
      />
    </div>
  );
}