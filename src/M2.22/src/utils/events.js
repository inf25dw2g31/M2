export function eventImage(event) {
  return event?.images?.find((image) => image.ratio === '16_9')?.url || event?.images?.[0]?.url || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';
}

export function eventDate(event) {
  const date = event?.dates?.start?.localDate;
  const time = event?.dates?.start?.localTime;

  if (!date) {
    return 'Data a confirmar';
  }

  const formattedDate = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

  return time ? `${formattedDate}, ${time.slice(0, 5)}` : formattedDate;
}

export function eventLocation(event) {
  const venue = event?._embedded?.venues?.[0];
  const city = venue?.city?.name;
  const country = venue?.country?.name;

  return [venue?.name, city, country].filter(Boolean).join(' · ') || 'Local a confirmar';
}

export function eventType(event) {
  const classification = event?.classifications?.[0];
  return classification?.genre?.name || classification?.segment?.name || 'Evento';
}

export function eventArtists(event) {
  return event?._embedded?.attractions?.map((artist) => artist.name).join(', ') || 'Artistas a confirmar';
}

export function eventCity(event) {
  return event?._embedded?.venues?.[0]?.city?.name || 'Cidade a confirmar';
}

export function eventVenueName(event) {
  return event?._embedded?.venues?.[0]?.name || 'Local a confirmar';
}

export function eventAddress(event) {
  const venue = event?._embedded?.venues?.[0];
  return [venue?.address?.line1, venue?.postalCode, venue?.city?.name, venue?.country?.name].filter(Boolean).join(', ') || 'Morada nao disponivel';
}

export function eventPrice(event) {
  const range = event?.priceRanges?.[0];

  if (!range) {
    return 'Preco indisponivel';
  }

  const currency = range.currency || 'EUR';
  const formatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency,
  });

  if (range.min && range.max && range.min !== range.max) {
    return `${formatter.format(range.min)} - ${formatter.format(range.max)}`;
  }

  return formatter.format(range.min || range.max);
}

export function eventStatus(event) {
  const code = event?.dates?.status?.code;
  const labels = {
    onsale: 'A venda',
    offsale: 'Fora de venda',
    canceled: 'Cancelado',
    postponed: 'Adiado',
    rescheduled: 'Remarcado',
  };

  return labels[code] || 'Estado a confirmar';
}

export function salesPeriod(event) {
  const start = event?.sales?.public?.startDateTime;
  const end = event?.sales?.public?.endDateTime;

  if (!start && !end) {
    return 'Periodo de venda nao disponivel';
  }

  const format = (value) => new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

  if (start && end) {
    return `${format(start)} ate ${format(end)}`;
  }

  return start ? `Desde ${format(start)}` : `Ate ${format(end)}`;
}
