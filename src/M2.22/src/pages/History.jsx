import { useEffect, useState } from 'react';
import { api } from '../api/backend';
import EventCard from '../components/EventCard';

function History() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('loading');

  async function load(p = 1) {
    setStatus('loading');
    try {
      const res = await api.getHistory(p);
      setData(res.data);
      setPage(res.page);
      setPages(res.pages);
      setTotal(res.total);
      setStatus('ready');
    } catch (err) {
      setStatus(err.message || 'Erro desconhecido');
    }
  }

  useEffect(() => { load(1); }, []);

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Atividade</p>
          <h1>Histórico</h1>
        </div>
        {total > 0 && <span className="eyebrow">{total} eventos visitados</span>}
      </section>

      {status === 'loading' && <p className="state-message">A carregar histórico...</p>}
      {status !== 'loading' && status !== 'ready' && (
        <p className="state-message error">Erro: {status}</p>
      )}
      {status === 'ready' && data.length === 0 && (
        <p className="state-message">Ainda não visitaste nenhum evento.</p>
      )}
      {status === 'ready' && data.length > 0 && (
        <>
          <section className="event-grid">
            {data.map((event) => (
              <EventCard key={`${event.id}-${event.viewed_at}`} event={event} />
            ))}
          </section>
          {pages > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="button button-ghost" disabled={page === 1} onClick={() => load(page - 1)}>
                ← Anterior
              </button>
              <span style={{ alignSelf: 'center' }}>{page} / {pages}</span>
              <button className="button button-ghost" disabled={page === pages} onClick={() => load(page + 1)}>
                Seguinte →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default History;
