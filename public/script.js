document.addEventListener('DOMContentLoaded', () =>{

  const socket = io.connect();

  const tela = document.querySelector('#tela')
  const contexto = tela.getContext('2d')
  const pincel = {
    ativo: false,
    movendo: false,
    pos: {
      x: 0,
      y: 0
    },
    posAnterior: null
  }

  tela.width = 1920;
  tela.height = 1280;

  contexto.lineWidth = 7;
  contexto.strokeStyle = "red"

  const desenharLinha = (linha) => {
    contexto.beginPath();
    contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
    contexto.lineTo(linha.pos.x, linha.pos.y);
    contexto.stroke();
  }

  tela.onmousedown = (event) => {pincel.ativo = true};
  tela.onmouseup = (event) => {pincel.ativo = false};

  tela.onmousemove = (event) => {
    pincel.pos.x = event.clientX
    pincel.pos.y = event.clientY
    pincel.movendo = true;
  }

  socket.on('desenhar', (linha)=>{
    desenharLinha(linha);
  })


  const ciclo = ()=> {
    if(pincel.ativo && pincel.movendo && pincel.posAnterior) {
      socket.emit('desenhar', { pos: pincel.pos, posAnterior: pincel.posAnterior})
      pincel.movendo = false;
    }
    pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y}

    setTimeout(ciclo, 1);
  }

  ciclo()
})

