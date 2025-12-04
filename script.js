/*******************************
 * MovieHub — main script
 *******************************/

/* ---------- SAMPLE MOVIES (more included) ----------
 Each movie has:
 {
  id, title, year, rating, duration, poster, backdrop, genre:[], description, director, cast:[], youtubeId, featured
 }
 --------------------------------------------------*/
let movies = [
  { id:1, title:"The Dark Knight", year:2008, rating:9.0, duration:"2h 32m",
    poster:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1600&h=900&fit=crop",
    genre:["Action","Crime","Drama"], description:"Batman faces the Joker in Gotham City.",
    director:"Christopher Nolan", cast:["Christian Bale","Heath Ledger","Aaron Eckhart"], youtubeId:"EXeTwQWrcwY", featured:true },

  { id:2, title:"Inception", year:2010, rating:8.8, duration:"2h 28m",
    poster:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop",
    genre:["Action","Sci-Fi","Thriller"], description:"Thieves steal secrets via shared dreaming.",
    director:"Christopher Nolan", cast:["Leonardo DiCaprio","Joseph Gordon-Levitt"], youtubeId:"YoHD9XEInc0", featured:false },

  { id:3, title:"Interstellar", year:2014, rating:8.6, duration:"2h 49m",
    poster:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&h=900&fit=crop",
    genre:["Adventure","Drama","Sci-Fi"], description:"A team travels through a wormhole to save humanity.",
    director:"Christopher Nolan", cast:["Matthew McConaughey","Anne Hathaway"], youtubeId:"zSWdZVtXT7E", featured:false },

  { id:4, title:"The Shawshank Redemption", year:1994, rating:9.3, duration:"2h 22m",
    poster:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&h=900&fit=crop",
    genre:["Drama"], description:"Two prisoners forge a friendship over years.",
    director:"Frank Darabont", cast:["Tim Robbins","Morgan Freeman"], youtubeId:"6hB3S9bIaco", featured:false },

  { id:5, title:"Pulp Fiction", year:1994, rating:8.9, duration:"2h 34m",
    poster:"https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&h=900&fit=crop",
    genre:["Crime","Drama"], description:"Interlocking crime stories in LA.",
    director:"Quentin Tarantino", cast:["John Travolta","Uma Thurman"], youtubeId:"s7EdQ4FqbhY", featured:false },

  { id:6, title:"The Matrix", year:1999, rating:8.7, duration:"2h 16m",
    poster:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&h=900&fit=crop",
    genre:["Action","Sci-Fi"], description:"A hacker discovers the true simulated reality.",
    director:"The Wachowskis", cast:["Keanu Reeves","Laurence Fishburne"], youtubeId:"vKQi3bBA1y8", featured:false },

  { id:7, title:"Forrest Gump", year:1994, rating:8.8, duration:"2h 22m",
    poster:"https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&h=900&fit=crop",
    genre:["Drama","Romance"], description:"Life story of an extraordinary man.",
    director:"Robert Zemeckis", cast:["Tom Hanks","Robin Wright"], youtubeId:"bLvqoHBptjg", featured:false },

  { id:8, title:"Gladiator", year:2000, rating:8.5, duration:"2h 35m",
    poster:"https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1600&h=900&fit=crop",
    genre:["Action","Adventure","Drama"], description:"A general becomes a gladiator to avenge his family.",
    director:"Ridley Scott", cast:["Russell Crowe"], youtubeId:"owK1qxDselE", featured:false },

  { id:9, title:"The Avengers", year:2012, rating:8.0, duration:"2h 23m",
    poster:"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=1600&h=900&fit=crop",
    genre:["Action","Adventure","Sci-Fi"], description:"Earth's heroes unite to stop Loki.",
    director:"Joss Whedon", cast:["Robert Downey Jr.","Chris Evans"], youtubeId:"eOrNdBpGMv8", featured:false },

  { id:10, title:"The Hangover", year:2009, rating:7.7, duration:"1h 40m",
    poster:"https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&h=900&fit=crop",
    genre:["Comedy"], description:"Friends lose the groom after a wild night.",
    director:"Todd Phillips", cast:["Bradley Cooper"], youtubeId:"tcdUhdOlz9M", featured:false }
];

/* ---------- State ---------- */
let watchlistIds = JSON.parse(localStorage.getItem('watchlist')) || [];
let currentUser = null; // for Firebase auth (optional)
let isAdminLocal = false; // can toggle admin local mode if signed in as admin@example.com

/* ---------- UI refs ---------- */
const sections = ['home','trending','browse','watchlist'];
const genresSet = new Set();
movies.forEach(m => m.genre.forEach(g => genresSet.add(g)));
const genresList = ['All', ...Array.from(genresSet)];

const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDescription');
const heroBackdrop = document.getElementById('heroBackdrop');
const heroTrailerBtn = document.getElementById('heroTrailerBtn');
const heroInfoBtn = document.getElementById('heroInfoBtn');

const topRatedEl = document.getElementById('topRated');
const trendingEl = document.getElementById('trendingList');
const allMoviesEl = document.getElementById('allMovies');
const watchlistEl = document.getElementById('watchlistMovies');
const genreFiltersEl = document.getElementById('genreFilters');
const watchCountEl = document.getElementById('watchCount');

const searchInput = document.getElementById('searchInput');

const movieModal = document.getElementById('movieModal');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalDuration = document.getElementById('modalDuration');
const modalRating = document.getElementById('modalRating');
const modalGenres = document.getElementById('modalGenres');
const modalDescription = document.getElementById('modalDescription');
const modalDirector = document.getElementById('modalDirector');
const modalCast = document.getElementById('modalCast');
const modalTrailerBtn = document.getElementById('modalTrailerBtn');
const watchlistBtn = document.getElementById('watchlistBtn');

const addFormPanel = document.getElementById('addForm');
const openAddBtn = document.getElementById('openAddBtn');

const toastEl = document.getElementById('toast');

/* ---------- Initial render ---------- */
let featuredMovie = movies.find(m => m.featured) || movies[0];
renderHero(featuredMovie);
renderTopRated();
renderTrending();
renderGenres();
renderAllMovies(movies);
renderWatchlist();
updateWatchCount();

/* ---------- Event wiring ---------- */
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    (m.director && m.director.toLowerCase().includes(q)) ||
    (m.genre && m.genre.join(' ').toLowerCase().includes(q))
  );
  renderAllMovies(filtered);
});

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

/* modal trailer / hero actions */
heroTrailerBtn.onclick = () => openTrailer(featuredMovie.youtubeId);
heroInfoBtn.onclick = () => openModal(featuredMovie.id);

/* ---------- UI RENDER FUNCTIONS ---------- */
function showSection(id){
  sections.forEach(s => document.getElementById(s).classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function renderHero(movie){
  featuredMovie = movie;
  heroTitle.innerText = movie.title;
  heroDesc.innerText = movie.description;
  heroBackdrop.style.backgroundImage = `url('${movie.backdrop || movie.poster}')`;
  heroTrailerBtn.onclick = () => openTrailer(movie.youtubeId);
  heroInfoBtn.onclick = () => openModal(movie.id);
}

/* Top Rated */
function renderTopRated(){
  const top = movies.slice().sort((a,b) => (b.rating||0)-(a.rating||0)).slice(0,8);
  topRatedEl.innerHTML = top.map(c => movieCardHtml(c)).join('');
  attachCardListeners(topRatedEl);
}

/* Trending (randomized) */
function renderTrending(){
  const pick = movies.slice().sort(()=>0.5-Math.random()).slice(0,8);
  trendingEl.innerHTML = pick.map(c => movieCardHtml(c)).join('');
  attachCardListeners(trendingEl);
}

/* Genres */
function renderGenres(){
  genreFiltersEl.innerHTML = genresList.map(g=>{
    return `<button class="tag" onclick="filterGenre('${g}')">${g}</button>`;
  }).join('');
}

function filterGenre(genre){
  if(genre==='All') renderAllMovies(movies);
  else renderAllMovies(movies.filter(m=> (m.genre||[]).includes(genre)));
  showSection('browse');
}

/* All movies grid */
function renderAllMovies(list){
  allMoviesEl.innerHTML = list.map(m => gridCardHtml(m)).join('');
  attachCardListeners(allMoviesEl);
}

/* Watchlist render */
function renderWatchlist(){
  const list = movies.filter(m=> watchlistIds.indexOf(m.id)!==-1);
  if(list.length===0) watchlistEl.innerHTML = '<p class="muted">Your watchlist is empty.</p>';
  else watchlistEl.innerHTML = list.map(m => gridCardHtml(m)).join('');
  attachCardListeners(watchlistEl);
}

function updateWatchCount(){
  watchCountEl.innerText = (watchlistIds.length || 0);
}

/* ---------- HTML helpers ---------- */
function movieCardHtml(m){
  return `
    <div class="card" data-id="${m.id}" onclick="openModal(${m.id})">
      <img src="${m.poster}" alt="${m.title}">
      <div class="card-body">
        <h4>${m.title}</h4>
        <p>${m.year} • ${m.genre[0]||''}</p>
      </div>
    </div>`;
}

function gridCardHtml(m){
  const inList = watchlistIds.indexOf(m.id)!==-1;
  return `
    <div class="card" data-id="${m.id}">
      <img src="${m.poster}" alt="${m.title}" onclick="openModal(${m.id})">
      <div class="card-body">
        <h4>${m.title}</h4>
        <p>${m.year} • ${m.genre.join(', ')}</p>
        <div style="margin-top:8px; display:flex; gap:8px; align-items:center;">
          <button class="btn" onclick="openTrailer('${m.youtubeId}'); event.stopPropagation();">Trailer</button>
          <button class="btn outline" onclick="toggleWatchlist(${m.id}); event.stopPropagation();">
            ${inList? 'Remove' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---------- Card listener attach ---------- */
function attachCardListeners(root){
  // handle clicks to open modal (cards have data-id)
  root.querySelectorAll('.card').forEach(c => {
    c.onclick = function(e){
      const id = parseInt(this.getAttribute('data-id'));
      // if click inside card buttons prevented earlier
      openModal(id);
    }
  });
}

/* ---------- Modal logic ---------- */
let currentMovie = null;
function openModal(id){
  const m = movies.find(x => x.id === id);
  if(!m) return;
  currentMovie = m;
  modalPoster.src = m.poster;
  modalTitle.innerText = m.title;
  modalYear.innerText = m.year;
  modalDuration.innerText = m.duration || '';
  modalRating.innerText = m.rating || '-';
  modalGenres.innerHTML = (m.genre||[]).map(g=>`<span class="tag">${g}</span>`).join('');
  modalDescription.innerText = m.description || '';
  modalDirector.innerText = m.director || '';
  modalCast.innerText = (m.cast||[]).join(', ');
  modalTrailerBtn.onclick = () => openTrailer(m.youtubeId);
  watchlistBtn.onclick = () => { toggleWatchlist(m.id); updateWatchlistButton(); };
  updateWatchlistButton();
  movieModal.style.display = 'flex';
}

function updateWatchlistButton(){
  if(!currentMovie) return;
  const added = watchlistIds.indexOf(currentMovie.id)!==-1;
  watchlistBtn.innerHTML = added ? '<i class="fa-solid fa-check"></i> In Watchlist' : '<i class="fa-solid fa-plus"></i> Add to Watchlist';
}

function closeModal(){
  movieModal.style.display = 'none';
  currentMovie = null;
}

/* ---------- Watchlist ---------- */
function toggleWatchlist(id){
  const idx = watchlistIds.indexOf(id);
  if(idx>-1) watchlistIds.splice(idx,1);
  else watchlistIds.push(id);
  localStorage.setItem('watchlist', JSON.stringify(watchlistIds));
  renderWatchlist();
  renderAllMovies(movies);
  renderTopRated();
  updateWatchCount();
  showToast('Watchlist updated');
  if(currentMovie) updateWatchlistButton();
}

/* ---------- Trailer ---------- */
function openTrailer(youtubeId){
  if(!youtubeId) { showToast('Trailer not available'); return; }
  window.open('https://www.youtube.com/watch?v=' + youtubeId, '_blank');
}

/* ---------- Add movie form (admin) ---------- */
function toggleAddForm(){
  // only allow add if admin
  if(!isAdminLocal && (!currentUser || (currentUser && currentUser.email!=='admin@example.com'))){
    showToast('Only admin can add movies. Sign in as admin@example.com (local demo).');
    return;
  }
  addFormPanel.style.display = addFormPanel.style.display === 'block' ? 'none' : 'block';
}

function addMovieFromForm(){
  const title = document.getElementById('addTitle').value.trim();
  if(!title){ showToast('Title required'); return; }
  const newMovie = {
    id: Math.max(...movies.map(m=>m.id))+1,
    title,
    year: parseInt(document.getElementById('addYear').value)||'',
    duration: document.getElementById('addDuration').value||'',
    rating: parseFloat(document.getElementById('addRating').value) || '',
    poster: document.getElementById('addPoster').value || 'https://via.placeholder.com/400x600?text=Poster',
    backdrop: document.getElementById('addBackdrop').value || '',
    youtubeId: document.getElementById('addYoutube').value || '',
    genre: (document.getElementById('addGenres').value || '').split(',').map(s=>s.trim()).filter(Boolean) || ['Drama'],
    director: document.getElementById('addDirector').value || '',
    cast: (document.getElementById('addCast').value || '').split(',').map(s=>s.trim()).filter(Boolean),
    description: document.getElementById('addDescription').value || ''
  };
  movies.unshift(newMovie);
  // update UI
  renderAllMovies(movies);
  renderTrending();
  renderTopRated();
  renderGenres();
  addFormPanel.style.display = 'none';
  showToast('Movie added (local). If Firebase enabled, movie will also be saved to Firestore (see console).');

  // optional: save to Firestore if configured
  if(window.firebaseApp && window.firebase && window.firebase.firestore){
    try{
      const db = firebase.firestore();
      db.collection('movies').add(newMovie).then(()=> console.log('Saved movie to Firestore')).catch(e=> console.warn('Firestore save failed', e));
    }catch(e){ console.warn(e) }
  }
}

/* ---------- Search helper handled earlier ---------- */

/* ---------- Theme toggle ---------- */
function toggleTheme(){
  const root = document.documentElement;
  if(root.classList.contains('light')) { root.classList.remove('light'); localStorage.removeItem('theme'); }
  else { root.classList.add('light'); localStorage.setItem('theme','light'); }
}
(function applySavedTheme(){ if(localStorage.getItem('theme')==='light') document.documentElement.classList.add('light'); })();

/* ---------- Login / Firebase optional ---------- */
function openLogin(){
  document.getElementById('loginModal').style.display = 'flex';
}
function closeLogin(){ document.getElementById('loginModal').style.display = 'none'; }

async function emailSignUp(){
  const email = document.getElementById('emailField').value;
  const pass = document.getElementById('passwordField').value;
  if(!email || !pass) return showToast('Fill email and password');
  if(!window.firebase || !firebase.auth) {
    showToast('Firebase not configured. Fill firebase-config.js to enable auth.');
    return;
  }
  try{
    const userCred = await firebase.auth().createUserWithEmailAndPassword(email,pass);
    currentUser = userCred.user;
    showToast('Signed up: '+currentUser.email);
    closeLogin();
    checkAdminLocal();
  }catch(e){ showToast('Signup failed: '+e.message) }
}

async function emailSignIn(){
  const email = document.getElementById('emailField').value;
  const pass = document.getElementById('passwordField').value;
  if(!email || !pass) return showToast('Fill email and password');
  if(!window.firebase || !firebase.auth) { showToast('Firebase not configured.'); return; }
  try{
    const userCred = await firebase.auth().signInWithEmailAndPassword(email,pass);
    currentUser = userCred.user;
    showToast('Signed in: '+currentUser.email);
    closeLogin();
    checkAdminLocal();
  }catch(e){ showToast('Sign in failed: '+e.message) }
}

function checkAdminLocal(){
  // local demo: treat admin@example.com as admin
  if(currentUser && currentUser.email==='admin@example.com') isAdminLocal = true;
  else isAdminLocal = false;
}

/* ---------- Simple toast ---------- */
let toastTimer = null;
function showToast(msg, timeout=2200){
  toastEl.innerText = msg;
  toastEl.style.display = 'block';
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toastEl.style.display = 'none', timeout);
}

/* ---------- Utility: show section on initial load ---------- */
showSection('home');

/* ---------- Optional Firestore load: if movies stored remotely ---------- */
if(window.firebase && firebase.firestore){
  // Try to load remote movies into UI (merge with local)
  try{
    const db = firebase.firestore();
    db.collection('movies').get().then(snap=>{
      const remote = snap.docs.map(d=> ({ id: d.id, ...d.data() }) );
      if(remote && remote.length>0){
        // if remote has items, prefer remote (you can change merge logic)
        // For safety we won't override local movies here but you can modify:
        console.log('Remote movies loaded', remote.length);
      }
    }).catch(e=> console.warn('Could not fetch remote movies', e));
  }catch(e){ console.warn('firestore error', e) }
}
