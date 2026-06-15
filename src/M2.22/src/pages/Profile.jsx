import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { username, tmApiKey, updateApiKey, logout } = useAuth();
  const [newKey, setNewKey] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleUpdateKey(e) {
    e.preventDefault();
    if (!newKey.trim()) return;
    setStatus('loading');
    setError('');
    try {
      await updateApiKey(newKey.trim());
      setNewKey('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Conta</p>
          <h1>Perfil</h1>
        </div>
      </section>

      <section style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <article>
          <p className="eyebrow">Utilizador</p>
          <strong style={{ fontSize: '1.25rem' }}>{username}</strong>
        </article>

        <article>
          <p className="eyebrow">API Key Ticketmaster atual</p>
          <code style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
            {tmApiKey ? `${tmApiKey.slice(0, 8)}${'•'.repeat(16)}` : 'Não definida'}
          </code>
        </article>

        <form onSubmit={handleUpdateKey} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label>
            Nova API Key Ticketmaster
            <input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Nova Consumer Key"
            />
          </label>
          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          {status === 'success' && <p style={{ color: 'green', margin: 0 }}>API Key atualizada com sucesso.</p>}
          <button className="button" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'A guardar...' : 'Atualizar API Key'}
          </button>
        </form>

        <button className="button button-secondary" type="button" onClick={logout}>
          Terminar sessão
        </button>
      </section>
    </main>
  );
}

export default Profile;
