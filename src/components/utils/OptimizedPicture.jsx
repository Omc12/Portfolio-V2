import React from 'react';

// Non-visual enhancement wrapper: provides modern formats when available.
// Usage: <OptimizedPicture sources={[{srcSet: avifImg, type: 'image/avif'}, {srcSet: webpImg, type: 'image/webp'}]} src={pngImg} alt="..." className="..." />
// Guarantees identical layout (img tag fallback always present).
const OptimizedPicture = ({ sources = [], src, alt = '', loading = 'lazy', className = '', width, height, style }) => {
  return (
    <picture className={className} style={style}>
      {sources.map(s => (
        <source key={s.type + s.srcSet} srcSet={s.srcSet} type={s.type} />
      ))}
      <img src={src} alt={alt} loading={loading} width={width} height={height} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </picture>
  );
};

export default OptimizedPicture;