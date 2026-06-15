function Home() {
  return (
    <main className="page-container">
      <h2>Bem-vindo ao projeto Web 2º Ano</h2>
      <p>Este projeto usa React e React Router para criar uma aplicação multi-página simples.</p>
      <section className="feature-grid">
        <article className="feature-card">
          <h3>Aprenda componentes</h3>
          <p>Use componentes para dividir a interface em partes reutilizáveis e fáceis de manter.</p>
        </article>
        <article className="feature-card">
          <h3>Crie páginas</h3>
          <p>Adicione novas rotas para navegar entre páginas de forma dinâmica.</p>
        </article>
        <article className="feature-card">
          <h3>Interaja com formulários</h3>
          <p>Monte um formulário de contato para capturar dados do usuário.</p>
        </article>
      </section>
    </main>
  );
}

export default Home;
