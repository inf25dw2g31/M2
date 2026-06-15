import { sampleEvents } from '../data/sampleEvents';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

function getStoredApiKey() {
  return localStorage.getItem('festivall_api_key') || import.meta.env.VITE_TM_API_KEY || '';
}


async function request(path, params = {}) {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const url = new URL(`${BASE_URL}${path}`);
  Object.entries({ ...params, apikey: apiKey }).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ticketmaster respondeu com erro ${response.status}`);
  }

  return response.json();
}

export async function searchEvents(filters = {}) {
  const data = await request('/events.json', {
    city: filters.city,
    keyword: filters.keyword,
    classificationName: filters.genre,
    startDateTime: filters.date ? `${filters.date}T00:00:00Z` : undefined,
    sort: 'date,asc',
    size: filters.size || 12,
  });

  return data?._embedded?.events || [];
}

export async function getFeaturedEvents() {
  try {
    return await searchEvents({ city: 'Madrid', genre: 'Music', size: 8 });
  } catch (error) {
    if (error.message === 'API_KEY_MISSING') {
      return sampleEvents;
    }
    throw error;
  }
}

export async function getEventById(id) {
  if (id?.startsWith('sample-')) {
    return sampleEvents.find((event) => event.id === id);
  }

  return request(`/events/${id}.json`);
}

export async function searchAttractions(keyword) {
  const data = await request('/attractions.json', {
    keyword,
    classificationName: 'Music',
    size: 12,
  });

  return data?._embedded?.attractions || [];
}
