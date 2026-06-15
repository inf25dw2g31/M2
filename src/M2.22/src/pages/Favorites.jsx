import EventCard from '../components/EventCard';
import { useFavorites } from '../context/FavoritesContext';

function Favorites() {
  const { favorites, total, page, pages, loadPage } = useFavorites();

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Guardados</p>
          <h1>Favoritos</h1>
        </div>
        {total > 0 && <span className="eyebrow">{total} favoritos</span>}
      </section>

      {favorites.length === 0 ? (
        <p className="state-message">Ainda não guardaste eventos favoritos.</p>
      ) : (
        <>
          <section className="event-grid">
            {favorites.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
          {pages > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="button button-ghost" disabled={page === 1} onClick={() => loadPage(page - 1)}>
                ← Anterior
              </button>
              <span style={{ alignSelf: 'center' }}>{page} / {pages}</span>
              <button className="button button-ghost" disabled={page === pages} onClick={() => loadPage(page + 1)}>
                Seguinte →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Favorites;
