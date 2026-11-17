import { useState } from "react";

export default function Photo({ src, alt, fallback, ...props }) {
  const [failed, setFailed] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setFailed(false);
  }

  if (failed) {
    return (
      <span className="geo-image-fallback" role="img" aria-label={alt}>
        {fallback}
      </span>
    );
  }

  return <img {...props} src={src} alt={alt} onError={() => setFailed(true)} />;
}
