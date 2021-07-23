let selector = null
let count = 0
let qtsRings = 3
let divMsg = document.createElement('div')
divMsg.id = 'winMsg'
let divInfos = document.createElement('div')
divInfos.id = 'divInfos'

const title = () => {
    let h1 = document.createElement('h1')
    let span = document.createElement('span')
    let texto = document.createTextNode('Torre de Hanoi')
    span.appendChild(texto)
    h1.appendChild(span)
    document.body.appendChild(h1)
}

const tower = () => {
    let tower = document.createElement('div')
    tower.id = 'tower'
    document.body.appendChild(tower)
}

const genBase = () => {
    let tower = document.getElementById('tower')
    let base = document.createElement('div')
    base.id = 'base'
    tower.appendChild(base)
}

const genPillars = () => {
    let tower = document.getElementById('tower')
    let pillars = document.createElement('div')
    pillars.id = 'pillars'
    tower.appendChild(pillars)
    for (let i = 1; i <= 3; i++) {
        let div = document.createElement('div')
        div.id = `pillar${i}`
        pillars.appendChild(div)
    }
}

const genRings = (qtsRings) => {
    let padrao1 = document.getElementById('pillar1')
    let padrao2 = document.getElementById('pillar2')
    let padrao3 = document.getElementById('pillar3')
    padrao1.innerHTML = ''
    padrao2.innerHTML = ''
    padrao3.innerHTML = ''
    

    for (let i = 0; i < qtsRings; i++) {
        let pillar = document.getElementById('pillar1')
        let ring = document.createElement('div')
        let subWidth = i * 10
        ring.id = `ring${qtsRings-i}`
        ring.style.width = `${90 - subWidth}px`
        ring.className = `${90 - subWidth}`
        ring.style.height = '10px'
        pillar.appendChild(ring)
    }
}

const genButtons = (num) => {
    let form = document.createElement('form')
    let h2 = document.createElement('h2')
    let texto = document.createTextNode('Quantidade de Aneis')
    h2.appendChild(texto)
    form.appendChild(h2)
    for (let i = 0; i < 5; i++) {
        let input = document.createElement('input')
        input.type = 'button'
        input.id = `qntRings${i+3}`
        input.value = i+3
        input.onclick = qntRings
        form.appendChild(input)
    }
    document.body.appendChild(form)
}

const infos = (num) => {
    let div = document.getElementById('divInfos')
    let h3 = document.createElement('h3')
    if (num === 3){
        let texto = document.createTextNode('São necessários no mínimo 7 movimentos para vencer.')
        h3.appendChild(texto)
    } else if (num === 4) {
        let texto = document.createTextNode('São necessários no mínimo 15 movimentos para vencer.')
        h3.appendChild(texto)
    } else if (num === 5) {
        let texto = document.createTextNode('São necessários no mínimo 31 movimentos para vencer.')
        h3.appendChild(texto)
    } else if (num === 6) {
        let texto = document.createTextNode('São necessários no mínimo 63 movimentos para vencer.')
        h3.appendChild(texto)
    } else if (num === 7) {
        let texto = document.createTextNode('São necessários no mínimo 127 movimentos para vencer.')
        h3.appendChild(texto)
    }
    div.appendChild(h3)
}

const qntRings = (event) => {
    qtsRings = Number(event.currentTarget.value)
    genRings(qtsRings)
    count = 0
    let padraoWinMsg = document.getElementById('winMsg')
    padraoWinMsg.innerHTML = ''
    let padraoInfos = document.getElementById('divInfos')
    padraoInfos.innerHTML = ''
    infos(qtsRings)
}

const selectRing = (event) => {
    let currentPillar = event.currentTarget
    let currentRing = currentPillar.lastElementChild
    
    if (selector == null) {
        selector = currentRing
        currentRing.style.marginBottom = '5px'
    } else if (currentPillar.children.length === 0) {
        currentPillar.appendChild(selector)
        selector.style.marginBottom = '0'
        selector = null
        count++
    } else if (selector.className < currentRing.className) {
        currentPillar.appendChild(selector)
        selector.style.marginBottom = '0'
        selector = null
        count++
    } else {
        selector.style.marginBottom = '0'
        selector = null
    }
    condWin()
}

const transferRing = () => {
    const pillar1 = document.getElementById('pillar1')
    const pillar2 = document.getElementById('pillar2')
    const pillar3 = document.getElementById('pillar3')

    pillar1.addEventListener('click', selectRing)
    pillar2.addEventListener('click', selectRing)
    pillar3.addEventListener('click', selectRing)
}

const condWin = () => {
    if (pillar2.children.length === qtsRings || pillar3.children.length === qtsRings) {
        let div = document.getElementById('winMsg')
        let h2 = document.createElement('h2')
        let texto = document.createTextNode(
            `Você venceu, parabéns! Você usou ${count} movimentos!`
            )
        let img = document.createElement('img')
        img.src = 'festa.png'
        img.alt = 'Emoji de festa'
        img.width = '40'
        h2.appendChild(texto)
        h2.style.textAlign = 'center'
        div.appendChild(h2)
        div.appendChild(img)
        document.body.appendChild(div)
        count = 0
    }
}

title()
tower()
genPillars()
genBase()
transferRing()
genButtons()
document.body.appendChild(divInfos)
document.body.appendChild(divMsg)
