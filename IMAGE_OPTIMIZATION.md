# Image Optimization Guide

This document provides recommendations for optimizing images in the McLainders wedding website.

## Current Status

✅ **Implemented:**
- Lazy loading on accommodation page images using `loading="lazy"` attribute
- OptimizedImage component with error handling and fallback images
- Proper error boundaries for broken images

## Recommendations for Further Optimization

### 1. Compress Existing Images

The `/public/gallery/` folder contains 24 images that should be compressed:

**Tools to use:**
- [TinyPNG](https://tinypng.com/) - Web-based compression
- [ImageOptim](https://imageoptim.com/) (Mac) - Desktop app
- [Squoosh](https://squoosh.app/) - Google's web-based tool

**Target:**
- Reduce file sizes by 50-70% without visible quality loss
- Aim for < 200KB per image

### 2. Convert to WebP Format

WebP provides 25-35% better compression than JPEG:

**Implementation:**
```bash
# Install cwebp (WebP converter)
# Mac: brew install webp
# Linux: sudo apt-get install webp

# Convert all JPEGs to WebP
cd public/gallery
for file in *.{jpg,jpeg,png}; do
  cwebp -q 85 "$file" -o "${file%.*}.webp"
done
```

**Update OptimizedImage component to support WebP:**
```jsx
<picture>
  <source srcset={`${src.replace(/\.(jpg|jpeg|png)$/, '.webp')}`} type="image/webp" />
  <img src={src} alt={alt} loading="lazy" />
</picture>
```

### 3. Responsive Images

Create multiple sizes for different screen resolutions:

**Sizes needed:**
- Small: 400px wide (mobile)
- Medium: 800px wide (tablet)
- Large: 1200px wide (desktop)
- Original: Full size

**Implementation with Vite plugin:**
```javascript
// vite.config.js
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      webp: { quality: 85 }
    })
  ]
});
```

### 4. Hero Image Optimization

Hero images (`header_mariage.jpg`, `baniere_sorlet.png`, `dobby_van.jpeg`) are loaded on every page:

**Recommendations:**
- Compress hero images aggressively (they're large background images)
- Consider using CSS `background-size: cover` with properly sized images
- Add `fetchpriority="high"` for above-the-fold images

### 5. Use Netlify Image CDN (Optional)

Netlify offers automatic image optimization:

**Setup:**
```html
<!-- Before -->
<img src="/gallery/image.jpg" />

<!-- After (Netlify Image CDN) -->
<img src="/.netlify/images?url=/gallery/image.jpg&w=800&fit=cover" />
```

**Benefits:**
- Automatic WebP conversion
- On-the-fly resizing
- Edge caching
- No build step required

### 6. Lazy Load Background Images

Currently, background images in inline styles are not lazy-loaded:

**Current:**
```jsx
<div style={{ backgroundImage: "url('/gallery/header_mariage.jpg')" }}>
```

**Better approach:**
```jsx
import { useEffect, useRef, useState } from 'react';

const LazyBackgroundImage = ({ src, children, className }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundImage: loaded ? `url('${src}')` : 'none',
        backgroundColor: loaded ? 'transparent' : '#f3f4f6'
      }}
    >
      {children}
    </div>
  );
};
```

## Priority Actions

### High Priority (Do Now):
1. ✅ Add `loading="lazy"` to all `<img>` tags (DONE for AccommodationPage)
2. ⏳ Compress all 24 images in `/public/gallery/` (Use TinyPNG or ImageOptim)
3. ⏳ Convert hero images to WebP format

### Medium Priority (Next Sprint):
4. Implement responsive images with `srcset`
5. Add lazy loading for background images
6. Consider Netlify Image CDN

### Low Priority (Future Enhancement):
7. Add vite-plugin-imagemin for automatic optimization
8. Implement blur-up placeholder technique
9. Add image dimension attributes to prevent layout shift

## Estimated Performance Improvements

With full implementation:
- **Bundle size reduction:** 60-70% for images
- **Page load time:** 2-3 seconds faster
- **Lighthouse performance score:** +15-20 points
- **Data usage:** 2-3MB → 600KB-1MB per page

## Resources

- [WebP Converter](https://developers.google.com/speed/webp)
- [Netlify Image CDN Docs](https://docs.netlify.com/image-cdn/overview/)
- [MDN: Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [web.dev: Optimize Images](https://web.dev/fast/#optimize-your-images)
