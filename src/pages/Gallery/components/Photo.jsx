import { useEffect, useState } from "react";

export default function Photo({ src, alt, fallback, ...props }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <span className="geo-image-fallback" role="img" aria-label={alt}>
        {fallback}
      </span>
    );
  }

  return <img {...props} src={src} alt={alt} onError={() => setFailed(true)} />;
}
