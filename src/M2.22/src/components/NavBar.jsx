import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import './NavBar.css';

// estilos partilhados pelos links de navegação
// definido fora da função para não recriar a cada render
const linkStyles = {
  // cor base do texto — branco suave
  color: '#eaf4ff',
  // position relative permite posicionar o ::after relativo ao botão
  position: 'relative',
  // tira o uppercase automático do MUI Button
  textTransform: 'none',

  // pseudo-elemento ::after cria a "barrinha" do sublinhado animado
  '&::after': {
    content: '""',                       // obrigatório nos pseudo-elementos
    position: 'absolute',                // posicionado dentro do botão
    bottom: 8,                           // 8px do fundo do botão
    left: '50%',                         // começa no meio
    width: 0,                            // largura inicial 0 (invisível)
    height: '2px',                       // espessura
    background: '#38bdf8',               // cor azul
    transition: 'all 0.3s ease',         // animação de 0.3s
    transform: 'translateX(-50%)',       // centra horizontalmente
  },

  // hover — texto fica azul e fundo fica transparente
  '&:hover': {
    background: 'transparent',
    color: '#38bdf8',
  },

  // no hover, o ::after cresce para 70% da largura
  '&:hover::after': {
    width: '70%',
  },

  // quando esta é a página ativa (NavLink adiciona class "active")
  '&.active': {
    background: 'transparent',
    color: '#38bdf8',
  },
};

function NavBar() {
  // hook do AuthContext — dá-nos se está autenticado e a função de logout
  const { isAuthenticated, logout } = useAuth();

  return (
    // AppBar — barra superior do MUI
    <AppBar 
      position="static"
      sx={{
        background: 'rgba(8, 24, 48, 0.9)',  // azul escuro semi-transparente
        borderBottom: '20px solid rgba(125, 211, 252, 0.18)',            
        boxShadow: 'none',                     // sem sombra
      }}
    >
      {/* Toolbar — alinha o conteúdo horizontalmente */}
      {/* space-between empurra "FestivAll" para a esquerda e os links para a direita */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* Brand "FestivAll" — botão que funciona como link para a home */}
        <Button
          component={NavLink}    // comporta-se como NavLink do React Router
          to="/"
          disableRipple          // tira a animação de "pingo" roxa
          sx={{
            color: '#ffffff',
            fontSize: '1.4rem',
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': { background: 'transparent' },
          }}
        >
          FestivAll
        </Button>

        {/* Box agrupa todos os links do lado direito */}
        <Box sx={{ 
          display: 'flex',         // alinha horizontalmente
          gap: 0.5,                // espaço entre links (compacto para caberem todos)
          alignItems: 'center',    // alinha verticalmente
        }}>

          <Button component={NavLink} to="/" end disableRipple sx={linkStyles}>
            Dashboard
          </Button>
          <Button component={NavLink} to="/events" disableRipple sx={linkStyles}>
            Eventos
          </Button>
          <Button component={NavLink} to="/artists" disableRipple sx={linkStyles}>
            Artistas
          </Button>
          <Button component={NavLink} to="/favorites" disableRipple sx={linkStyles}>
            Favoritos
          </Button>
          <Button component={NavLink} to="/history" disableRipple sx={linkStyles}>
            Histórico
          </Button>
          <Button component={NavLink} to="/lists" disableRipple sx={linkStyles}>
            Listas
          </Button>
          <Button component={NavLink} to="/ratings" disableRipple sx={linkStyles}>
            Avaliações
          </Button>

          {/* Perfil só aparece se o utilizador estiver autenticado */}
          {isAuthenticated && (
            <Button component={NavLink} to="/profile" disableRipple sx={linkStyles}>
              Perfil
            </Button>
          )}

          {/* Botão condicional: Sair (se autenticado) ou Login (se não) */}
          {isAuthenticated ? (
            // Sair tem estilo diferente — botão outlined em vez de simples
            <Button 
              onClick={logout}                    // chama função de logout do context
              variant="outlined"                   // botão com borda
              sx={{ 
                color: '#38bdf8',
                borderColor: '#38bdf8',
                ml: 1,                            // margin-left para separar dos outros
                '&:hover': {
                  background: 'rgba(56, 189, 248, 0.1)',
                  borderColor: '#38bdf8',
                }
              }}
            >
              Sair
            </Button>
          ) : (
            <Button component={NavLink} to="/login" disableRipple sx={linkStyles}>
              Login
            </Button>
          )}

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;