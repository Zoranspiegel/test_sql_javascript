export async function fetcher (url: RequestInfo | URL): Promise<Response> {
  const res = await fetch(url, {
    credentials: 'include'
  });
  if (!res.ok) {
    throw new Error('Unable to fetch the data');
  }
  const data = await res.json();
  return data;
}
