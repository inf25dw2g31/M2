import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/backend';

function Stars({ value }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>
      {'★'.repeat(value)}{'☆'.repeat(5 - value)}
    </span>
  );
}

function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getRatings()
      .then((r) => { setRatings(r); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  async function handleDelete(eventId) {
    await api.deleteRating(eventId);
    setRatings((prev) => prev.filter((r) => r.event_id !== eventId));
  }

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">As minhas opiniões</p>
          <h1>Avaliações</h1>
        </div>
        {ratings.length > 0 && <span className="eyebrow">{ratings.length} avaliações</span>}
      </section>

      {status === 'loading' && <p className="state-message">A carregar avaliações...</p>}
      {status === 'error' && <p className="state-message error">Não foi possível carregar as avaliações.</p>}
      {status === 'ready' && ratings.length === 0 && (
        <p className="state-message">Ainda não avaliaste nenhum evento. Abre um evento e dá-lhe estrelas.</p>
      )}

      {ratings.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
          {ratings.map((r) => (
            <article key={r.event_id} style={{
              border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Link to={`/events/${r.event_id}`} style={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A2E' }}>
                  {r.event_name}
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(r.event_id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                >✕</button>
              </div>
              <Stars value={r.stars} />
              {r.note && <p style={{ margin: 0, color: '#5A5A7A', fontSize: '0.9rem' }}>{r.note}</p>}
              <time style={{ fontSize: '0.8rem', color: '#999' }}>
                {new Date(r.rated_at).toLocaleDateString('pt-PT')}
              </time>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Ratings;
