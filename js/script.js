const mario = document.querySelector('.mario');
const marioGif = document.querySelector('.marioGif');
const tubo = document.querySelector('.tubo');
const nuvens = document.querySelector('.nuvens');
const contador = document.getElementById('tempo')
const cont = document.querySelector('.cont');
const container = document.querySelector('.container'); 
const chao = document.querySelector('.chao'); 
const telaGameOver = document.querySelector('.gameOver'); 
const botao = document.getElementById('iniciar');
const botaoReinicia = document.getElementById('reiniciar');
const contFinal = document.getElementById('contF2');
const titulo1 = document.getElementById('P');
const titulo2 = document.getElementById('p');
let segundos = 0; //inicializa o contador
let loop;
let audioEmExecucao;

const audioEsperando = document.getElementById('audioEsperando');
const audioGameOver = document.getElementById('audioGameOver');
const audioRodando = document.getElementById('audioRodando');
const audioPulo = document.getElementById('audioPulo');

audioEmExecucao = audioEsperando;

const jump = () => {
    marioGif.classList.add('jump');
    audioPulo.play();

    setTimeout(() => {
        marioGif.classList.remove('jump');
    }, 750);
}

function tocaAudioInicioJogo() {
    audioRodando.play();
}

const comecaJogo = () => {


    loop = setInterval(() => {

        segundos++;
        contador.textContent = segundos; //atualiza o texto do contador

        titulo1.style.display = 'none';
        titulo2.style.display = 'none';
        tubo.style.animation = 'animacao-tubo 2s infinite linear';
        nuvens.style.animation =  'animacao-nuvens 20s infinite linear';
        container.style.filter = 'none';
        chao.style.filter = 'none';
        botao.style.display = 'none';
        mario.style.display = 'none';
        marioGif.style.display = 'block';
        const posicaoTubo = tubo.offsetLeft;
        const posicaoMario = +window.getComputedStyle(marioGif).bottom.replace('px', '');
        paraAudioAtual();
        tocaAudioInicioJogo();
    
        if (posicaoTubo <= 120 && posicaoTubo > 0 && posicaoMario < 80){

            //parando o contador
            clearInterval(loop);

            telaGameOver.style.display = 'block';
            chao.style.filter = 'blur(5px)';
            container.style.filter = 'blur(5px)';

            tubo.style.animation = 'none';
            tubo.style.left = `${posicaoTubo}px`;

            //faz o mario parar em cima do tubo quando da game over
            mario .style.animation = 'none'
            mario.style.bottom = `${posicaoMario}px`;

            //troca a imagem
            marioGif.style.display = 'none';
            mario.style.display = 'block';
            mario.src = 'imagens/game-over.png';
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            //mudando a cor do cont
            cont.style.color = 'red';  

            //mostrando o time final na tela de game-over
            contFinal.textContent = segundos;

            audioRodando.pause();
            audioGameOver.currentTime = 0;
            audioGameOver.play();
            
            return;
        }
    }, 10);

    document.addEventListener('keydown', jump);
}

function paraAudioAtual() {
    if (audioEmExecucao) {
        audioEmExecucao.pause();
        audioEmExecucao.currentTime = 0;
    }
}

function reiniciarJogo () {
    paraAudioAtual();
    location.reload();
}

botao.addEventListener('click',() => {
    paraAudioAtual();
    comecaJogo();
    console.log("jogo inciado")
});