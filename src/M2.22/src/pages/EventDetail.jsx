import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEventById } from '../api/ticketmaster';
import { api } from '../api/backend';
import { useFavorites } from '../context/FavoritesContext';
import { eventAddress, eventArtists, eventDate, eventImage, eventLocation, eventPrice, eventStatus, eventType, salesPeriod } from '../utils/events';

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem',
            color: star <= (hover || value) ? '#f59e0b' : '#d1d5db', padding: '0 2px',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState('loading');
  const { isFavorite, toggleFavorite } = useFavorites();

  const [stars, setStars] = useState(0);
  const [note, setNote] = useState('');
  const [ratingStatus, setRatingStatus] = useState('idle');

  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [listStatus, setListStatus] = useState('idle');

  useEffect(() => {
    getEventById(id)
      .then((item) => {
        setEvent(item);
        setStatus('ready');
        api.addHistory(item).catch(() => {});
      })
      .catch(() => setStatus('error'));

    api.getRatings().then((ratings) => {
      const existing = ratings.find((r) => r.event_id === id);
      if (existing) { setStars(existing.stars); setNote(existing.note || ''); }
    }).catch(() => {});

    api.getLists().then((l) => { setLists(l); if (l.length > 0) setSelectedList(l[0].id); }).catch(() => {});
  }, [id]);

  async function handleRate(e) {
    e.preventDefault();
    if (!stars) return;
    setRatingStatus('loading');
    try {
      await api.rateEvent(id, event.name, stars, note);
      setRatingStatus('success');
      setTimeout(() => setRatingStatus('idle'), 3000);
    } catch { setRatingStatus('error'); }
  }

  async function handleAddToList() {
    if (!selectedList || !event) return;
    setListStatus('loading');
    try {
      await api.addToList(selectedList, event);
      setListStatus('success');
      setTimeout(() => setListStatus('idle'), 3000);
    } catch (err) {
      setListStatus(err.message === 'Evento já está na lista' ? 'duplicate' : 'error');
      setTimeout(() => setListStatus('idle'), 3000);
    }
  }

  if (status === 'loading') return <main className="page"><p className="state-message">A carregar detalhe...</p></main>;
  if (status === 'error' || !event) return <main className="page"><p className="state-message error">Evento não encontrado.</p></main>;

  const favorite = isFavorite(event.id);

  return (
    <main className="page detail-page">
      <img className="detail-image" src={eventImage(event)} alt={event.name} />
      <section className="detail-content">
        <div className="detail-kicker">
          <p className="eyebrow">{eventType(event)}</p>
          <span>{eventStatus(event)}</span>
        </div>
        <h1>{event.name}</h1>
        <dl className="detail-list">
          <div><dt>Data</dt><dd>{eventDate(event)}</dd></div>
          <div><dt>Local</dt><dd>{eventLocation(event)}</dd></div>
          <div><dt>Artistas</dt><dd>{eventArtists(event)}</dd></div>
          <div><dt>Preço</dt><dd>{eventPrice(event)}</dd></div>
          <div><dt>Venda ao público</dt><dd>{salesPeriod(event)}</dd></div>
          <div><dt>Morada</dt><dd>{eventAddress(event)}</dd></div>
        </dl>

        <div className="detail-actions">
          <a className="button" href={event.url} target="_blank" rel="noreferrer">Bilhetes</a>
          <button className="button button-secondary" type="button" onClick={() => toggleFavorite(event)}>
            {favorite ? 'Remover favorito' : 'Guardar favorito'}
          </button>
          <Link className="button button-ghost" to="/events">Voltar</Link>
        </div>

        {/* Avaliação */}
        <section style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
          <p className="eyebrow">A tua avaliação</p>
          <form onSubmit={handleRate} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px' }}>
            <StarRating value={stars} onChange={setStars} />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nota pessoal (opcional)"
              rows={2}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
            />
            {ratingStatus === 'success' && <p style={{ color: 'green', margin: 0 }}>Avaliação guardada!</p>}
            {ratingStatus === 'error' && <p style={{ color: 'red', margin: 0 }}>Erro ao guardar.</p>}
            <button className="button" type="submit" disabled={!stars || ratingStatus === 'loading'}>
              {ratingStatus === 'loading' ? 'A guardar...' : 'Guardar avaliação'}
            </button>
          </form>
        </section>

        {/* Adicionar a lista */}
        {lists.length > 0 && (
          <section style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <p className="eyebrow">Adicionar a uma lista</p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc' }}
              >
                {lists.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              <button className="button button-secondary" type="button" onClick={handleAddToList} disabled={listStatus === 'loading'}>
                {listStatus === 'loading' ? 'A adicionar...' : 'Adicionar'}
              </button>
              {listStatus === 'success' && <span style={{ color: 'green' }}>Adicionado!</span>}
              {listStatus === 'duplicate' && <span style={{ color: '#888' }}>Já está na lista.</span>}
              {listStatus === 'error' && <span style={{ color: 'red' }}>Erro.</span>}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default EventDetail;
