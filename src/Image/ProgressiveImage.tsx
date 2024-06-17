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
    const handleImageLoad = () => setIsLoaded(true);

    const img = imgRef.current;
    if (img) {
      img.addEventListener('load', handleImageLoad);
      if (img.complete) handleImageLoad();
    }

    return () => {
      if (img) img.removeEventListener('load', handleImageLoad);
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
        className="h-full w-full absolute top-0 left-0 object-cover"
        style={{
          filter: isLoaded ? 'none' : 'blur(20px)',
          transition: 'filter 0.5s ease-out',
        }}
      />
      <img
        src={image.full.source_url}
        alt={image.alt_text}
        className="h-full w-full absolute top-0 left-0 object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      />
    </div>
  )
}

export default ProgressiveImage;