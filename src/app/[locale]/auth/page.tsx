'use client';

import { FormEvent, useState } from 'react';
import { hasSupabaseEnv, supabase } from '@/lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string>('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!supabase) {
      setStatus('Voeg eerst NEXT_PUBLIC_SUPABASE_URL en ANON_KEY toe in je .env.local.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus(`Login mislukt: ${error.message}`);
      return;
    }

    setStatus('Ingelogd ✅');
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-bold">Auth baseline</h1>
      <p className="mt-1 text-gray-600">Eerst login flow werkend, daarna registratie/reset.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Wachtwoord</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 px-4 py-2 font-medium text-white disabled:opacity-60"
          disabled={!hasSupabaseEnv}
        >
          Inloggen
        </button>

        {status ? <p className="text-sm text-gray-600">{status}</p> : null}
      </form>
    </div>
  );
}
