import { useEffect, useState } from 'react';
import { api } from '../api/backend';
import EventCard from '../components/EventCard';

function Lists() {
  const [lists, setLists] = useState([]);
  const [openList, setOpenList] = useState(null);
  const [events, setEvents] = useState([]);
  const [newName, setNewName] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getLists()
      .then((l) => { setLists(l); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const created = await api.createList(newName.trim());
    setLists((prev) => [created, ...prev]);
    setNewName('');
  }

  async function handleOpen(list) {
    setOpenList(list);
    const evs = await api.getListEvents(list.id);
    setEvents(evs);
  }

  async function handleDelete(id) {
    await api.deleteList(id);
    setLists((prev) => prev.filter((l) => l.id !== id));
    if (openList?.id === id) { setOpenList(null); setEvents([]); }
  }

  async function handleRemoveEvent(eventId) {
    await api.removeFromList(openList.id, eventId);
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Coleções</p>
          <h1>As minhas listas</h1>
        </div>
      </section>

      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='Ex: "Quero ir", "Já fui"...'
          style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #ccc', flex: 1, maxWidth: '300px' }}
        />
        <button className="button" type="submit">Criar lista</button>
      </form>

      {status === 'loading' && <p className="state-message">A carregar listas...</p>}
      {status === 'ready' && lists.length === 0 && <p className="state-message">Ainda não tens listas. Cria uma acima.</p>}

      {lists.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {lists.map((l) => (
            <div key={l.id} style={{
              border: `2px solid ${openList?.id === l.id ? '#6C63FF' : '#e5e7eb'}`,
              borderRadius: '12px', padding: '1rem 1.25rem', cursor: 'pointer', minWidth: '160px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
            }}>
              <span onClick={() => handleOpen(l)} style={{ fontWeight: 600 }}>{l.name}</span>
              <button
                type="button"
                onClick={() => handleDelete(l.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1rem' }}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {openList && (
        <>
          <section className="section-header">
            <div>
              <p className="eyebrow">Lista</p>
              <h2>{openList.name}</h2>
            </div>
          </section>
          {events.length === 0 ? (
            <p className="state-message">Esta lista não tem eventos. Adiciona eventos a partir da página de detalhe.</p>
          ) : (
            <section className="event-grid">
              {events.map((event) => (
                <div key={event.id} style={{ position: 'relative' }}>
                  <EventCard event={event} />
                  <button
                    type="button"
                    onClick={() => handleRemoveEvent(event.id)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)',
                      border: 'none', color: '#fff', borderRadius: '50%', width: '28px', height: '28px',
                      cursor: 'pointer', fontSize: '0.85rem',
                    }}
                  >✕</button>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Lists;
