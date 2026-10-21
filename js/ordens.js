const ops = document.querySelectorAll(".op")
const resumo = document.querySelector("#resumo")
const botaoTv= document.querySelector("#modo-tv")
const filtros= document.querySelectorAll("filtro")
let ordens = [
  { numero: 101, produto: "Eixo de transmissão", quantidade: 200, maquina: "Torno CNC", status: "aguardando" },
  { numero: 102, produto: "Suporte de motor", quantidade: 500, maquina: "Prensa", status: "producao" },
  { numero: 103, produto: "Tampa plástica", quantidade: 1200, maquina: "Injetora", status: "concluida" },
  { numero: 104, produto: "Flange de aço", quantidade: 80, maquina: "Torno CNC", status: "aguardando" }
]
let filtro = "todas"
const NOMES = { aguardando: "Aguardando", producao: "Em produção", concluida: "Concluída" }

function criarOP(op) {
const item = document.createElement("li")
item.classList.add("op", "status-" + op.status)
const titulo = document.createElement("h3")
titulo.textContent = "OP-" + op.numero + " · " + op.produto
item.append(titulo)
lista.append(item)
return item
}
function desenhar() {
lista.textContent = ""
ordens.forEach((op) => {
lista.append(criarOP(op))
op.status
})
}
botaoTv.addEventListener("click", ()=>{
    const body = document.querySelector("body")
    body.classList.toggle("modo-tv")
    botaoTv.textContent= body.classList.contains("modo-tv")?
    "Sair do Modo TV"
    :
    "MODO TV"
})

desenhar()