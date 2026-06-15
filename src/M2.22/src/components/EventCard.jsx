import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { eventArtists, eventCity, eventDate, eventImage, eventPrice, eventStatus, eventType, eventVenueName } from '../utils/events';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Chip 
} from '@mui/material';

function EventCard({ event }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(event.id);

 return (
  // Card — container principal do card (vem do MUI)
  // component={motion.article} — combina o Card MUI com motion do Framer Motion
  // isto permite ter as features do Card + animações
  <Card
    component={motion.article}

    // whileHover — animação quando passas o rato em cima
    // scale: 1.04 = aumenta 4% o tamanho do card
    whileHover={{ scale: 1.04 }}

    // transition — controla COMO acontece a animação
    // type: 'spring' = efeito de mola (não é linear)
    // stiffness: 300 = rigidez da mola (mais alto = mais rápido)
    // damping: 20 = amortecimento (controla o bounce)
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}

    // sx — estilos MUI aplicados diretamente
    sx={{
      background: 'rgba(8, 24, 48, 0.9)',                  // fundo azul escuro
      border: '1px solid rgba(125, 211, 252, 0.18)',       // borda azul subtil
      borderRadius: '8px',                                  // cantos arredondados
      overflow: 'hidden',                                   // esconde o que sair do card
      display: 'flex',                                      // layout flexível
      flexDirection: 'column',                              // empilha verticalmente
      color: '#eaf4ff',                                     // cor de texto base
    }}
  >
    {/* Link que envolve a imagem — clica e vai para a página de detalhe do evento */}
    <Link 
      to={`/events/${event.id}`}                            // URL dinâmica com o id do evento
      style={{ position: 'relative', display: 'block' }}    // position relative para o Chip
      aria-label={`Ver detalhes de ${event.name}`}          // acessibilidade
    >
      {/* CardMedia — substitui a tag <img> do MUI */}
      <CardMedia
        component="img"                                     // diz para se comportar como <img>
        height="210"                                        // altura fixa
        image={eventImage(event)}                           // URL da imagem do evento
        alt={event.name}                                    // texto alternativo
        sx={{ objectFit: 'cover' }}                         // imagem preenche sem distorcer
      />
      
      {/* Chip — etiqueta pequena que mostra o status (ex: "ONSALE") */}
      <Chip
        label={eventStatus(event)}                          // texto do chip
        sx={{
          position: 'absolute',                             // posicionada sobre a imagem
          left: 12,                                         // 12px da esquerda
          bottom: 12,                                       // 12px do fundo
          background: '#67e8f9',                            // fundo ciano
          color: '#061528',                                 // texto azul escuro
          fontWeight: 800,
          fontSize: '0.78rem',
          textTransform: 'uppercase',                       // letras MAIÚSCULAS
        }}
      />
    </Link>

    {/* CardContent — wrapper para o conteúdo de texto do card */}
    <CardContent sx={{ display: 'grid', gap: 1.5, padding: '18px' }}>
      
      {/* Box com a meta info — tipo de evento e data */}
      {/* Box é como uma <div> mas com sx para estilos */}
      <Box sx={{ 
        display: 'flex',                                    // alinha em linha
        gap: 1,                                             // espaço entre items
        color: '#7dd3fc',                                   // azul claro
        fontSize: '0.82rem', 
        fontWeight: 800, 
        textTransform: 'uppercase' 
      }}>
        <span>{eventType(event)}</span>                     {/* ex: "Music" */}
        <span>{eventDate(event)}</span>                     {/* ex: "12 julho 2025" */}
      </Box>

      {/* Typography — substitui o <h3> do nome do evento */}
      {/* variant="h6" = estilo de heading nível 6 do MUI */}
      <Typography variant="h6" sx={{ 
        color: '#eaf4ff', 
        fontSize: '1.22rem', 
        fontWeight: 700, 
        lineHeight: 1.25 
      }}>
        {event.name}                                        {/* nome do evento */}
      </Typography>

      {/* Typography para o nome do venue (local do evento) */}
      <Typography sx={{ color: '#eaf4ff', fontWeight: 800 }}>
        {eventVenueName(event)}
      </Typography>

      {/* Box com dois "mini-cards" — Cidade e Preço lado a lado */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',                     // 2 colunas iguais
        gap: 1.25 
      }}>
        {/* Mini-card da Cidade */}
        <Box sx={{ 
          padding: '10px', 
          background: 'rgba(15, 43, 77, 0.92)',             // fundo mais escuro
          borderRadius: '8px' 
        }}>
          <Typography sx={{ 
            color: '#38bdf8',                               // azul claro para a label
            fontSize: '0.68rem', 
            fontWeight: 900, 
            textTransform: 'uppercase' 
          }}>
            Cidade
          </Typography>
          <Typography sx={{ 
            color: '#eaf4ff', 
            fontSize: '0.88rem', 
            fontWeight: 800, 
            mt: 0.5                                         // margin-top pequena
          }}>
            {eventCity(event)}
          </Typography>
        </Box>
        
        {/* Mini-card do Preço (mesma estrutura) */}
        <Box sx={{ padding: '10px', background: 'rgba(15, 43, 77, 0.92)', borderRadius: '8px' }}>
          <Typography sx={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase' }}>
            Preço
          </Typography>
          <Typography sx={{ color: '#eaf4ff', fontSize: '0.88rem', fontWeight: 800, mt: 0.5 }}>
            {eventPrice(event)}
          </Typography>
        </Box>
      </Box>

      {/* Typography com a lista de artistas */}
      <Typography sx={{ color: '#a9c4df', lineHeight: 1.5 }}>
        {eventArtists(event)}
      </Typography>

      {/* Box com os botões de ação no fundo do card */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1.25, 
        alignItems: 'center', 
        mt: 'auto'                                          // empurra para o fundo do card
      }}>
        {/* Button "Detalhes" — usa o Link do React Router para navegar */}
        <Button
          component={Link}                                  // comporta-se como Link
          to={`/events/${event.id}`}                        // URL dinâmica
          variant="contained"                               // botão preenchido
          sx={{
            background: '#67e8f9',                          // ciano
            color: '#061528',                               // texto azul escuro
            fontWeight: 800,
            '&:hover': { background: '#22d3ee' },           // ciano mais escuro no hover
          }}
        >
          Detalhes
        </Button>

        {/* IconButton — botão pequeno só com ícone (estrela) */}
        <IconButton
          onClick={() => toggleFavorite(event)}             // adiciona/remove dos favoritos
          aria-label={favorite ? 'Remover dos favoritos' : 'Guardar favorito'}
          sx={{
            background: '#67e8f9',
            color: '#061528',
            borderRadius: '8px',                            // cantos arredondados
            width: 44,                                      // largura fixa
            height: 44,                                     // altura fixa (quadrado)
            '&:hover': { background: '#22d3ee' },
          }}
        >
          {/* Mostra estrela cheia (★) se for favorito, vazia (☆) se não */}
          {favorite ? '★' : '☆'}
        </IconButton>
      </Box>

    </CardContent>
  </Card>
);
}
export default EventCard;
