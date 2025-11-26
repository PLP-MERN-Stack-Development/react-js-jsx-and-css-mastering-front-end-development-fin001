import { useEffect, useRef } from 'react';

// Simple hook that returns a ref to attach to a sentinel element.
// When the sentinel is visible, the `onIntersect` callback is called.
export default function useInfiniteScroll(onIntersect, options = {}) {
  const sentinelRef = useRef(null);
  const cbRef = useRef(onIntersect);

  useEffect(() => {
    cbRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) cbRef.current();
      });
    }, options);

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [options.root, options.rootMargin, options.threshold]);

  return sentinelRef;
}
