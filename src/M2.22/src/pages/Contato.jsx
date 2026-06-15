import { useState } from 'react';

function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnviado(true);
  };

  return (
    <main className="page-container">
      <h2>Contato</h2>
      <p>Preencha o formulário para enviar uma mensagem.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
          />
        </label>

        <label>
          Mensagem
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Escreva sua mensagem"
            rows="5"
            required
          />
        </label>

        <button type="submit">Enviar</button>
      </form>

      {enviado && (
        <div className="success-message">
          Obrigado, {form.nome}! Sua mensagem foi enviada com sucesso.
        </div>
      )}
    </main>
  );
}

export default Contato;
