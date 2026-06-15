import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import { searchEvents } from '../api/ticketmaster';
import { api } from '../api/backend';

const initialFilters = { keyword: 'Festival', city: 'Madrid', date: '2026-07-01', genre: 'Music' };

function Events() {
  const [filters, setFilters] = useState(initialFilters);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('idle');
  const [savedSearches, setSavedSearches] = useState([]);
  const [saveLabel, setSaveLabel] = useState('');
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    api.getSavedSearches().then(setSavedSearches).catch(() => {});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    searchEvents(filters)
      .then((items) => { setEvents(items); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  async function handleSaveSearch() {
    if (!saveLabel.trim()) return;
    const saved = await api.saveSearch(saveLabel.trim(), filters);
    setSavedSearches((prev) => [saved, ...prev]);
    setSaveLabel('');
    setShowSave(false);
  }

  async function handleDeleteSearch(id) {
    await api.deleteSearch(id);
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  }

  function applySearch(filters) {
    setFilters(filters);
  }

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Pesquisa</p>
          <h1>Encontrar eventos</h1>
        </div>
      </section>

      {savedSearches.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span className="eyebrow" style={{ alignSelf: 'center' }}>Pesquisas guardadas:</span>
          {savedSearches.map((s) => (
            <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <button className="button button-ghost" style={{ padding: '4px 12px', fontSize: '0.85rem' }}
                onClick={() => applySearch(s.filters)}>
                {s.label}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                onClick={() => handleDeleteSearch(s.id)}>✕</button>
            </span>
          ))}
        </div>
      )}

      <SearchBar filters={filters} onChange={setFilters} onSubmit={handleSubmit} />

      {status === 'ready' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          {!showSave ? (
            <button className="button button-ghost" style={{ fontSize: '0.85rem' }} onClick={() => setShowSave(true)}>
              Guardar pesquisa
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input value={saveLabel} onChange={(e) => setSaveLabel(e.target.value)}
                placeholder="Nome da pesquisa" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ccc' }} />
              <button className="button" style={{ padding: '6px 16px' }} onClick={handleSaveSearch}>Guardar</button>
              <button className="button button-ghost" style={{ padding: '6px 16px' }} onClick={() => setShowSave(false)}>Cancelar</button>
            </div>
          )}
        </div>
      )}

      {status === 'idle' && <p className="state-message">Escolhe filtros e pesquisa eventos reais da Ticketmaster.</p>}
      {status === 'loading' && <p className="state-message">A pesquisar...</p>}
      {status === 'error' && <p className="state-message error">Não foi possível pesquisar. Verifica a API Key.</p>}
      {status === 'ready' && events.length === 0 && <p className="state-message">Sem resultados para estes filtros.</p>}
      {status === 'ready' && events.length > 0 && (
        <div className="results-bar">
          <strong>{events.length}</strong>
          <span>resultados para {filters.city || 'qualquer cidade'} {filters.genre ? `em ${filters.genre}` : ''}</span>
        </div>
      )}
      {events.length > 0 && (
        <section className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Events;
