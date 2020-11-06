// variables

const artistsDiv = document.querySelector('#artists');
const button = document.querySelector('#btn');

// render Artists
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

// render Albums
const renderAlbums = async () => {
  let url = 'http://localhost:3004/albums';

  const res = await fetch(url);
  const albums = await res.json();

  let template = '';

  albums.forEach((album, index) => {
    // get album release Year
    let date = new Date(album.releaseDate);
    let releaseYear = date.getFullYear();

    renderArtists(index).then(data => {
      document.getElementsByClassName('album-artist')[index].innerHTML = data;
    });

    template += `
        <a href='/details.html?id=${album.id}' id='btn' class='btn'>
           <div class='album'>
            <img src=${album.imageUrl} alt=${album.title}/>
            <div class='album-info'>
                <div class='album-name'>${album.title}</div>
                <div class='album-artist'></div>
            </div>
            <div>Released:${releaseYear}</div>
            <div>${album.price}</div>
            <button id='btn' class='btn'>Mark as favorite</button>
          </div>
        </a>

      `;
  });
  artistsDiv.innerHTML = template;
};

window.addEventListener('DOMContentLoaded', () => renderAlbums());
window.addEventListener('DOMContentLoaded', () => renderArtists(index));
