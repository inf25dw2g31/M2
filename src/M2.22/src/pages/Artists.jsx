import { useState } from 'react';
import { searchAttractions } from '../api/ticketmaster';

function Artists() {
  const [keyword, setKeyword] = useState('');
  const [artists, setArtists] = useState([]);
  const [status, setStatus] = useState('idle');

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    searchAttractions(keyword)
      .then((items) => {
        setArtists(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }

  return (
    <main className="page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Artistas</p>
          <h1>Agenda musical</h1>
        </div>
      </section>
      <form className="artist-search" onSubmit={handleSubmit}>
        <label>
          Nome do artista
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Coldplay, Muse, Dua Lipa..." required />
        </label>
        <button className="button" type="submit">
          Procurar
        </button>
      </form>

      {status === 'idle' && <p className="state-message">Pesquisa artistas e bandas presentes na Ticketmaster.</p>}
      {status === 'loading' && <p className="state-message">A procurar artistas...</p>}
      {status === 'error' && <p className="state-message error">Nao foi possivel carregar artistas. Confirma a API Key.</p>}
      {status === 'ready' && (
        <section className="artist-grid">
          {artists.map((artist) => (
            <article className="artist-card" key={artist.id}>
              <img src={artist.images?.[0]?.url || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80'} alt={artist.name} />
              <h3>{artist.name}</h3>
              <a href={artist.url} target="_blank" rel="noreferrer">
                Ver na Ticketmaster
              </a>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Artists;
