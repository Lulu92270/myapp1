export const fetchItems = async (setArray) => {
  const INDEX_URL = "/api/v1/flats";
  const fetchFlats = await fetch(INDEX_URL)
  const flats = await fetchFlats.json();
  setArray(flats);
}

export const fetchItem = async (setFlat, id) => {
  const fetchFlat = await fetch(`/api/v1/flats/${id}`)
  const flat = await fetchFlat.json();
  setFlat(flat);
}

export const fetchDelete = async (flat) => {
  const DELETE_URL = `/api/v1/flats/${flat.id}`;
  await fetch(DELETE_URL, options('DELETE', flat));
}

export const fetchPatch = async (flat, id) => {
  const UPDATE_URL = `/api/v1/flats/${id}`;
  await fetch(UPDATE_URL, options('PATCH', flat));
}

export const fetchPost = async (flat) => {
  const CREATE_URL = "/api/v1/flats";
  await fetch(CREATE_URL, options('POST', flat));
}

const options = (crud, object) => {
  const token = document.querySelector('[name=csrf-token]').content
  return ({
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": token
      },
    method: crud,
    credentials: "same-origin",
    body: JSON.stringify(object)
  });
}
