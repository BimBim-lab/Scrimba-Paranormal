const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

export const API_BASE = isLocal
  ? 'http://localhost:8000/api'                // saat dev lokal
  : 'https://scrimba-paranormal-production.up.railway.app/api'; // saat di Vercel (production)