const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts({ page = 1, limit = 10, title_like = '', signal } = {}) {
  const params = new URLSearchParams();
  params.set('_limit', String(limit));
  params.set('_page', String(page));
  if (title_like) params.set('title_like', title_like);

  const url = `${BASE}/posts?${params.toString()}`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  const total = Number(res.headers.get('x-total-count') || 0);
  const data = await res.json();

  return { data, total };
}

export default { fetchPosts };
