import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Box 
} from '@mui/material';

const searchFieldStyles = {
  '& .MuiInputBase-input': { color: '#ffffff' },
  '& .MuiInputLabel-root': { color: '#d8e9fb' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(125, 211, 252, 0.24)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#38bdf8',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#38bdf8',
  },
  '& .MuiSelect-icon': { color: '#7dd3fc' },
};

function SearchBar({ filters, onChange, onSubmit }) {
  function updateField(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr auto',
        gap: 1.5,
        alignItems: 'end',
        padding: '18px',
        background: 'rgba(8, 24, 48, 0.9)',
        border: '1px solid rgba(125, 211, 252, 0.18)',
        borderRadius: '8px',
      }}
    >
      <TextField
        label="Artista ou evento"
        value={filters.keyword}
        onChange={(event) => updateField('keyword', event.target.value)}
        placeholder="NOS Alive, Coldplay..."
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={searchFieldStyles}
      />

      <TextField
        label="Cidade"
        value={filters.city}
        onChange={(event) => updateField('city', event.target.value)}
        placeholder="Madrid"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={searchFieldStyles}
      />

      <TextField
        label="Data"
        type="date"
        value={filters.date}
        onChange={(event) => updateField('date', event.target.value)}
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={searchFieldStyles}
      />

      <FormControl fullWidth sx={searchFieldStyles}>
        <InputLabel>Categoria</InputLabel>
        <Select
          value={filters.genre}
          onChange={(event) => updateField('genre', event.target.value)}
          label="Categoria"
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Music">Musica</MenuItem>
          <MenuItem value="Rock">Rock</MenuItem>
          <MenuItem value="Pop">Pop</MenuItem>
          <MenuItem value="Theatre">Teatro</MenuItem>
          <MenuItem value="Sports">Desporto</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{
          background: '#0284c7',
          color: '#ffffff',
          fontWeight: 800,
          minHeight: 44,
          padding: '11px 18px',
          '&:hover': { background: '#0369a1' },
        }}
      >
        Pesquisar
      </Button>
    </Box>
  );
}

export default SearchBar;