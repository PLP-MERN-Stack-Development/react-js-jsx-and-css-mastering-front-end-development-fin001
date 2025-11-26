import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchPosts } from '../api/jsonPlaceholder';
import Button from '../components/Button';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const abortRef = useRef(null);

  const load = useCallback(async (opts = {}) => {
    const { nextPage = page, replace = false } = opts;
    setLoading(true);
    setError(null);

    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const { data, total } = await fetchPosts({
        page: nextPage,
        limit,
        title_like: search,
        signal: ac.signal,
      });

      // pagination with page results
      setPosts(data);
      setTotal(total || 0);
      const loadedCount = (nextPage - 1) * limit + data.length;
      setHasMore(total === 0 ? data.length === limit : loadedCount < total);
      setPage(nextPage);
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [limit, page, search]);

  // initial load and when search changes
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    load({ nextPage: 1, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // pagination handler: go to a specific page
  const goToPage = useCallback((p) => {
    if (p < 1) return;
    const totalPages = Math.max(1, Math.ceil((total || 0) / limit));
    if (p > totalPages) return;
    load({ nextPage: p, replace: true });
  }, [load, limit, total]);

  // search input locally
  const [query, setQuery] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setSearch(query.trim()), 400);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Posts (JSONPlaceholder)</h2>
        <div className="flex items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title..."
            className="px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
          <Button variant="secondary" size="sm" onClick={() => { setQuery(''); setSearch(''); }}>
            Clear
          </Button>
        </div>
      </div>

      {error && (
        <div className="text-red-500 mb-4">Error: {error}</div>
      )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((p) => (
              <div key={p.id} className="p-4 border rounded bg-gray-50 dark:bg-gray-700">
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{p.body}</p>
              </div>
            ))}
          </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <div className="text-gray-500">{posts.length} posts shown</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => goToPage(page - 1)} disabled={page === 1}>
            Prev
          </Button>

          {/* page number buttons */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.max(1, Math.ceil((total || posts.length) / limit)) }).map((_, i) => {
              const p = i + 1;
              return (
                <Button key={p} variant={p === page ? 'primary' : 'secondary'} size="sm" onClick={() => goToPage(p)}>
                  {p}
                </Button>
              );
            })}
          </div>

          <Button variant="secondary" size="sm" onClick={() => goToPage(page + 1)} disabled={!hasMore}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
