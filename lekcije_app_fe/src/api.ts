export interface Lekcija {
  id?: number; // optional ker nova lekcija še nima id-ja (dodeli ga baza)
  naziv: string;
  opis: string;
  yt_url: string;
}

const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080';

export async function getLekcije(): Promise<Lekcija[]> {
  const res = await fetch(`${BASE}/api/lekcije`);
  if (!res.ok) throw new Error('Failed to fetch lekcije');
  return res.json(); // parse json v javascript objekt
}

export async function getLekcija(id: number): Promise<Lekcija> {
  const res = await fetch(`${BASE}/api/lekcije/${id}`);
  if (!res.ok) throw new Error('Failed to fetch lekcija');
  return res.json();
}

export async function createLekcija(l: Lekcija): Promise<void> {
  const res = await fetch(`${BASE}/api/lekcije`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(l), // pretvori javascript objekt v json
  });
  if (!res.ok) throw new Error('Failed to create lekcija');
}

export async function updateLekcija(id: number, l: Lekcija): Promise<void> {
  const res = await fetch(`${BASE}/api/lekcije/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(l),
  });
  if (!res.ok) throw new Error('Failed to update lekcija');
}

export async function deleteLekcija(id: number): Promise<void> {
  const res = await fetch(`${BASE}/api/lekcije/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete lekcija');
}

export async function searchLekcije(query: string): Promise<Lekcija[]> {
  const res = await fetch(`${BASE}/api/lekcije/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search lekcije');
  return res.json();
}