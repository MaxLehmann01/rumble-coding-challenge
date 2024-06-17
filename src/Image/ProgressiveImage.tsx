import { useEffect, useRef, useState } from "react";
import { tImage } from "../types/tImage";

type tProgressiveImageProps = {
  image: tImage,
}

const ProgressiveImage = ({ image }: tProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const aspectRatio = (image.full.height / image.full.width) * 100;

  useEffect(() => {
    console.log(`isLoaded changed: ${isLoaded}`);
    
  }, [isLoaded])

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoaded(true);
    };

    const img = imgRef.current;
    if (img) {
      img.addEventListener('load', handleImageLoad);
      
      if (img.complete) {
        // If the image is already loaded
        handleImageLoad();
      }
    }

    return () => {
      if (img) {
        img.removeEventListener('load', handleImageLoad);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${aspectRatio}%`,
        overflow: 'hidden',
      }}
      className="h-auto w-full max-w-full rounded-md shadow-md"
    >
      <img
        ref={imgRef}
        src={image.thumbnail.source_url}
        alt={image.alt_text}
        className="object-cover"
        style={{
          filter: isLoaded ? 'none' : 'blur(20px)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <img
        src={image.full.source_url}
        alt={image.alt_text}
        className="object-cover"
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: isLoaded ? 'block' : 'none',
        }}
      />
    </div>
  )
}

export default ProgressiveImage;