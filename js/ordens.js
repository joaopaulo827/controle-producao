const resumo = document.querySelector("#resumo") 
const botaoTv= document.querySelector("#modo-tv")
const botoes= document.querySelectorAll(".filtro")
const formOp = document.querySelector("#form-op")
const busca = document.querySelector("#busca") 
const vazia = document.querySelector("#vazia")
const CampoUrgente= document.querySelector("#urgente")
let filtros = "todas"
let aguardando=0, concluida=0, producao=0
let ordens = [
  { numero: 101, produto: "Eixo de transmissão", quantidade: 200, maquina: "Torno CNC", status: "aguardando" },
  { numero: 102, produto: "Suporte de motor", quantidade: 500, maquina: "Prensa", status: "producao" },
  { numero: 103, produto: "Tampa plástica", quantidade: 1200, maquina: "Injetora", status: "concluida" },
  { numero: 104, produto: "Flange de aço", quantidade: 80, maquina: "Torno CNC", status: "aguardando" }
]
const NOMES = { aguardando: "Aguardando", producao: "Em produção", concluida: "Concluída" }

botaoTv.addEventListener("click", ()=>{
    const body = document.querySelector("body")
    body.classList.toggle("modo-tv")
    botaoTv.textContent= body.classList.contains("modo-tv")?
    "Sair do Modo TV"
    :
    "MODO TV"
})

botoes.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    filtros = event.target.dataset.filtro;
    botoes.forEach((b) => b.classList.remove("selecionado"));
    btn.classList.add("selecionado");
    desenhar();
  });
});

function criarOP(op) {
const item = document.createElement("li")
item.classList.add("op", "status-" + op.status)
const titulo = document.createElement("h3")
titulo.textContent = "OP-" + op.numero + " · " + op.produto
item.append(titulo)
lista.append(item)
if(op.urgente===true){
  const erro=document.createElement("span")
  erro=classList.toggle("erro")
  op.textContent="URGENTE"
}
if (op.status !== "concluida") {
  const avancar = document.createElement("button")

  if (op.status === "aguardando") {
    avancar.textContent = "Iniciar produção"
  } else {
    avancar.textContent = "Concluir"
  }

avancar.addEventListener("click", () => {
  if (op.status === "aguardando") {
    op.status = "producao"
  } else {
    op.status = "concluida"
  }
  desenhar()
})
if (op.status === "aguardando") {
  const cancelar = document.createElement("button")
  cancelar.textContent = "Cancelar"

  cancelar.addEventListener("click", () => {
    if (confirm("Cancelar a OP-" + op.numero + "?")) {
      ordens = ordens.filter((o) => o !== op)  
      desenhar()
    }
  })

  item.append(cancelar)
}
  item.append(avancar)
}
return item
}

function desenhar() {
lista.textContent = ""
aguardando=0
concluida=0
producao=0
ordensSelecionadas = filtros === "todas"? ordens : ordens.filter((ordem) => ordem.status === filtros);
ordensSelecionadas.forEach((op) => {
criarOP(op)
  if (op.status === "aguardando") {
    aguardando++
  }
  if (op.status === "concluida") {
    concluida++
  }
  if (op.status === "producao") {
    producao++
  }
  const texto=
    "Mostrando "+ordensSelecionadas.length+
    " de "+ordens.length+ " ordens no painel\n" +
    "Aguardando: " + aguardando +
    " - Em Produção: " + producao +
    " - Concluido: " +concluida;
  resumo.textContent = texto  
})
let visiveis = ordens
if (filtros !== "todas") {
  visiveis = ordens.filter((op) => op.status === filtros)
}
const texto = busca.value.trim().toLowerCase()
visiveis = visiveis.filter((op) => op.produto.toLowerCase().includes(texto))

lista.textContent = ""
visiveis.forEach((op) => {
  lista.append(criarOP(op))
})
vazia.hidden = visiveis.length > 0
atualizarResumo(visiveis.length)
}

formOp.addEventListener("submit", (event) => {
    event.preventDefault();
    const produto = document.querySelector("#produto").value.trim();
    const qtd = Number(document.querySelector("#quantidade").value);
    const maquina = document.querySelector("#maquina");
    const mensagem = document.querySelector("#mensagem");
    if( produto === "" || qtd <= 0) {
        const texto = "Informe o produto e uma quantidade maior que zero."
        mensagem.hidden = false;
        mensagem.innerHTML = texto;
    } else {
        mensagem.hidden = true;
        mensagem.textContent = "";
        ordens.push({
            numero: ordens[ordens.length-1].numero + 1,
            produto,
            quantidade: qtd,
            status: "aguardando",
            maquina: maquina.value,
            urgente:CampoUrgente.checked
        });
        desenhar();
    }

});
function atualizarResumo(){
  
}
busca.addEventListener("input", desenhar)
  desenhar()