import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
// Componentes do Material UI usados nesta página
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material';

// estilos partilhados pelos campos de texto
// definido fora da função para não ser recriado a cada render
const textFieldStyles = {
  // cor do texto que o utilizador escreve dentro do input
  '& .MuiInputBase-input': { color: '#ffffff' },
  // cor da label (ex: "Username") em estado normal
  '& .MuiInputLabel-root': { color: '#38bdf8' },
  // cor da label quando o campo está focado
  '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
  // cor da borda em estado normal
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(125, 211, 252, 0.4)',
  },
  // cor da borda quando passas o rato em cima
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#38bdf8',
  },
  // cor da borda quando o campo está focado
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#38bdf8',
  },
};

function Login() {
  // hook do AuthContext — funções de login e registo, e estado atual
  const { isAuthenticated, login, register } = useAuth();
  // hook do React Router para navegar programaticamente
  const navigate = useNavigate();

  // mode controla se o formulário está em modo "login" ou "register"
  const [mode, setMode] = useState('login');
  // estados para cada campo do formulário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  // mensagem de erro vinda do backend
  const [error, setError] = useState('');
  // controla o estado "a processar" para desativar o botão
  const [loading, setLoading] = useState(false);

  // se já está autenticado, redireciona para a home
  if (isAuthenticated) return <Navigate to="/" replace />;

  // função chamada quando o utilizador submete o formulário
  async function handleSubmit(e) {
    e.preventDefault();                    // impede o refresh da página
    setError('');                          // limpa erros anteriores
    setLoading(true);                      // ativa o estado de loading
    try {
      // consoante o modo, chama login ou register
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password, apiKey);
      }
      // depois de sucesso, vai para a home
      navigate('/');
    } catch (err) {
      // se o backend retornou erro, mostra a mensagem
      setError(err.message);
    } finally {
      // independentemente de sucesso ou erro, tira o loading
      setLoading(false);
    }
  }

  return (
    // Box substitui o <main> — mantém a className para os estilos do App.css
    <Box className="login-page">

      {/* Paper combinado com motion.div — permite animação Framer Motion num componente MUI */}
      <Paper
        component={motion.div}                                  // diz ao Paper para usar motion.div por baixo
        className="login-panel"
        elevation={4}                                            // intensidade da sombra (0-24)
        initial={{ scale: 0.8, opacity: 0 }}                    // estado inicial: 80% tamanho, invisível
        animate={{ scale: 1, opacity: 1 }}                      // estado final: 100% tamanho, visível
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}  // animação tipo mola (pop)
        sx={{
          background: 'rgba(8, 24, 48, 0.9)',                   // fundo azul escuro
          border: '1px solid rgba(125, 211, 252, 0.18)',        // borda azul subtil
          color: '#eaf4ff',                                      // cor base do texto
          padding: '32px',
          maxWidth: 480,
          width: '100%',
        }}
      >
        {/* Eyebrow — texto pequeno azul em cima do título */}
        <Typography sx={{ 
          color: '#38bdf8', 
          fontSize: '0.8rem', 
          fontWeight: 800, 
          textTransform: 'uppercase', 
          letterSpacing: 2 
        }}>
          FestivAll
        </Typography>

        {/* Título principal — muda dinamicamente consoante o modo */}
        <Typography variant="h1" sx={{ 
          color: '#ffffff', 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          mt: 1 
        }}>
          {mode === 'login' ? 'Entrar' : 'Criar conta'}
        </Typography>

        {/* Descrição que também muda consoante o modo */}
        <Typography sx={{ color: '#a9c4df', mt: 1, mb: 2 }}>
          {mode === 'login'
            ? 'Inicia sessão para aceder aos teus favoritos e histórico.'
            : 'Cria uma conta associando a tua API Key da Ticketmaster.'}
        </Typography>

        {/* Box com component="form" — comporta-se como <form> mas com estilos MUI */}
        <Box component="form" onSubmit={handleSubmit} sx={{ 
          display: 'grid',                  // organiza filhos em grid
          gap: 2,                            // espaço entre campos (16px)
          mt: 2                              // margin top
        }}>

          {/* Campo Username — sempre visível */}
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="O teu username"
            required
            autoComplete="username"
            sx={textFieldStyles}
          />

          {/* Campo Password — sempre visível */}
          <TextField
            fullWidth
            type="password"                                       // tipo password (esconde caracteres)
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="A tua password"
            required
            // muda autoComplete consoante o modo (current-password para login, new-password para registo)
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            sx={textFieldStyles}
          />

          {/* Campo API Key — SÓ aparece no modo de registo */}
          {mode === 'register' && (
            <TextField
              fullWidth
              label="API Key Ticketmaster"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Consumer Key da Ticketmaster"
              required
              sx={textFieldStyles}
            />
          )}

          {/* Alert do MUI mostra erro caso exista — só renderiza se houver erro */}
          {error && (
            <Alert severity="error" sx={{ 
              background: 'rgba(239, 68, 68, 0.15)',              // fundo vermelho subtil
              color: '#fca5a5',                                    // texto vermelho claro
              border: '1px solid rgba(239, 68, 68, 0.3)' 
            }}>
              {error}
            </Alert>
          )}

          {/* Botão submeter — texto muda consoante loading e modo */}
          <Button
            fullWidth
            type="submit"
            variant="contained"                                    // botão preenchido
            disabled={loading}                                     // desativa enquanto está a processar
            sx={{
              background: '#0284c7',                               // azul
              color: '#ffffff',
              fontWeight: 800,
              py: 1.5,                                             // padding vertical
              '&:hover': { background: '#0369a1' },                // azul mais escuro no hover
              '&.Mui-disabled': {                                  // estilo quando desativado
                background: 'rgba(2, 132, 199, 0.5)',
                color: 'rgba(255, 255, 255, 0.6)',
              }
            }}
          >
            {/* Texto dinâmico: prioridade ao loading, depois ao modo */}
            {loading ? 'A processar...' : mode === 'login' ? 'Entrar' : 'Registar'}
          </Button>
        </Box>

        {/* Link para alternar entre modo login e registo */}
        <Typography sx={{ mt: 3, fontSize: '0.9rem', color: '#a9c4df', textAlign: 'center' }}>
          {mode === 'login' ? 'Ainda não tens conta?' : 'Já tens conta?'}{' '}
          {/* Button "text" — botão sem fundo, parece um link */}
          <Button
            type="button"
            variant="text"
            onClick={() => { 
              // alterna o modo e limpa o erro
              setMode(mode === 'login' ? 'register' : 'login'); 
              setError(''); 
            }}
            sx={{
              color: '#38bdf8',
              textTransform: 'none',
              padding: 0,
              minWidth: 0,                                         // tira a largura mínima do MUI
              fontWeight: 700,
              '&:hover': { background: 'transparent', color: '#7dd3fc' },
            }}
          >
            {mode === 'login' ? 'Registar' : 'Entrar'}
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;