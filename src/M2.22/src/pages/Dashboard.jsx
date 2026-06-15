import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { getFeaturedEvents } from '../api/ticketmaster';
import { useFavorites } from '../context/FavoritesContext';
import { eventCity, eventType } from '../utils/events';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading');
  const { favorites } = useFavorites();
  const cities = new Set(events.map(eventCity));
  const categories = new Set(events.map(eventType));

  useEffect(() => {
    getFeaturedEvents()
      .then((items) => {
        setEvents(items);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Descoberta cultural</p>
          <h1>FestivAll</h1>
          <p>Eventos, concertos, festivais e teatro num so lugar, com pesquisa direta na Ticketmaster.</p>
          <div className="hero-actions">
            <Link className="button" to="/events">Pesquisar eventos</Link>
            <Link className="button button-ghost hero-ghost" to="/favorites">Ver favoritos</Link>
          </div>
        </div>
        <div className="hero-stats" aria-label="Resumo da aplicacao">
          <div>
            <strong>{events.length}</strong>
            <span>eventos carregados</span>
          </div>
          <div>
            <strong>{favorites.length}</strong>
            <span>favoritos</span>
          </div>
        </div>
      </section>

      <section className="insight-grid" aria-label="Resumo de descoberta">
        <article>
          <span>Fonte</span>
          <strong>Ticketmaster API</strong>
          <p>Dados reais de eventos, artistas, locais, datas e links de bilheteira.</p>
        </article>
        <article>
          <span>Cidades</span>
          <strong>{cities.size || 0}</strong>
          <p>Cidades diferentes encontradas nos destaques carregados.</p>
        </article>
        <article>
          <span>Categorias</span>
          <strong>{categories.size || 0}</strong>
          <p>Generos e segmentos culturais presentes nos resultados.</p>
        </article>
      </section>

      <section className="section-header">
        <div>
          <p className="eyebrow">Madrid e arredores</p>
          <h2>Eventos em destaque</h2>
        </div>
        <Link className="text-link" to="/events">Pesquisa avancada</Link>
      </section>

      {status === 'loading' && <p className="state-message">A carregar eventos...</p>}
      {status === 'error' && <p className="state-message error">Nao foi possivel carregar os eventos. Confirma a API Key.</p>}
      {status === 'ready' && (
        <section className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Dashboard;
