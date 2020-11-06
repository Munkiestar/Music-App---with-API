// javascript for details.html

const id = new URLSearchParams(window.location.search).get('id');
const artistsDiv = document.querySelector('#artists');
const title = document.querySelector('#title');

const renderArtists = async index => {
  let url = 'http://localhost:3004/artists';

  const res = await fetch(url);
  const artists = await res.json();

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      let artistName = data[index] != null ? data[index].title : 'Unknown';
      return artistName;
    });
};

renderArtists(id).then(data => {
  document.getElementsById('album-artist').innerHTML = data[id];
});

// render clicked artist
const renderDetails = async () => {
  const res = await fetch(`http://localhost:3004/albums/${id}`);
  const artist = await res.json();
  console.log(artist);

  // get album release Year
  let date = new Date(artist.releaseDate);
  let releaseYear = date.getFullYear();

  const template = `
    <div class='album'>
        <img src=${artist.imageUrl} alt=${artist.title}/>
        <div class='album-info'>
            <div class='album-name'>${artist.title}</div>
            <div class='album-artist' id='album-artist'></div>
        </div>
        <div>Released:${releaseYear}</div>
        <div>${artist.price}</div>
        <button id='btn' class='btn'>Mark as favorite</button>
        </div>
    `;

  title.textContent = artist.title;
  artistsDiv.innerHTML = template;

};

// load content
window.addEventListener('DOMContentLoaded', () => renderDetails());
window.addEventListener('DOMContentLoaded', () => renderArtists(id));
