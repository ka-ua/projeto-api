const buttonPlay = document.getElementById("play");
const buttonPause = document.getElementById("pause");
const buttonNext = document.getElementById("avancar");
const buttonBack = document.getElementById("voltar");
const progressBar = document.getElementById("progressBar");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");

const capa = document.getElementById('capa');
const musica = document.getElementById('musica');
const autor = document.getElementById('autor');

const arrayMusicas = [
 {
    nome: 'ASTROTHUNDER',
    artista: 'Travis Scott',
    capaMusic: 'assets/music-1/capa1.jpg',
    musicaPlayer: 'assets/music-1/Travis Scott - ASTROTHUNDER.mp3'
 },
 {
    nome: 'See You Again (feat. Kali Uchis)',
    artista: 'Tyler, The Creator',
    capaMusic: 'assets/music-2/capa2.jpg',
    musicaPlayer: 'assets/music-2/SEE YOU AGAIN featuring Kali Uchi.mp3'
 },
 {
    nome: 'God\'s plan',
    artista: 'Drake',
    capaMusic: 'assets/music-3/capa3.jpg',
    musicaPlayer: 'assets/music-3/Gods Plan.mp3'
 }
]

let musicaAtual = 0;
let music;

function setMusic(i) {
    if (i < 0) {
        musicaAtual = arrayMusicas.length - 1;
    } else if (i >= arrayMusicas.length) {
        musicaAtual = 0;
    } else {
        musicaAtual = i;
}

    autor.textContent = arrayMusicas[musicaAtual].artista;
    musica.textContent = arrayMusicas[musicaAtual].nome;
    capa.setAttribute('src', arrayMusicas[musicaAtual].capaMusic);

    if (music) {
        music.pause();
    }
    music = new Audio(arrayMusicas[musicaAtual].musicaPlayer);

    music.addEventListener('loadedmetadata', function () {
        tempoTotal.textContent = formatarTempo(music.duration);
    });

    music.addEventListener('timeupdate', updateMusicTime);
}

function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function updateMusicTime() {
    const progresso = (music.currentTime / music.duration) * 100;
    progressBar.value = progresso;
    tempoAtual.textContent = formatarTempo(music.currentTime);
}

function play() {
    buttonPlay.classList.add('hide');
    buttonPause.classList.remove('hide');
    music.play();
}

function pause() {
    buttonPlay.classList.remove('hide');
    buttonPause.classList.add('hide');
    music.pause();
}

buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);

buttonNext.addEventListener('click', () => {
    pause();
    setMusic(++musicaAtual); 
    play();
  });
 
  buttonBack.addEventListener('click', () => {
    pause();
    setMusic(--musicaAtual); 
    play();
  });

setMusic(musicaAtual);
