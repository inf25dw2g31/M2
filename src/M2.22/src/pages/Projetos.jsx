import { projetos } from '../data/projetos';

function Projetos() {
  return (
    <main className="page-container">
      <h2>Projetos do Curso</h2>
      <p>Confira os exemplos e ideias que você pode implementar para a disciplina.</p>
      <section className="project-grid">
        {projetos.map((item) => (
          <article key={item.id} className="project-card">
            <h3>{item.titulo}</h3>
            <p>{item.descricao}</p>
            <span className={`badge badge-${item.status.replace(/\s+/g, '-').toLowerCase()}`}>
              {item.status}
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Projetos;
