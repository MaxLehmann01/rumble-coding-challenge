import { useState } from "react";
import { tImage } from "../types/tImage";

type tProgressiveImageProps = {
  image: tImage,
}

const ProgressiveImage = ({ image }: tProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const aspectRatio = (image.full.height / image.full.width) * 100;

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
        src={image.thumbnail.source_url}
        alt={image.alt_text}
        className="object-cover"
        style={{
          filter: isLoaded ? 'none' : 'blur(20px)',
          transition: 'filter 0.5s ease-out',
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
        onLoad={() => setIsLoaded(true)}
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