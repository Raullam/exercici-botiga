const grid = document.getElementById('grid-productes')
const buscador = document.getElementById('buscador')

function pintarProductes(llista) {
  grid.innerHTML = ''
  llista.forEach((p) => {
    const enllac = document.createElement('a')
    enllac.href = `producte.html?id=${p.id}`
    enllac.className = 'card'
    enllac.innerHTML = `
      <h2>${p.nom}</h2>
      <p>${p.descripcio}</p>
      <p><strong>${p.preu.toFixed(2)} €</strong></p>
    `
    grid.appendChild(enllac)
  })
}

pintarProductes(productes)

buscador.addEventListener('input', () => {
  const text = buscador.value.toLowerCase()
  const filtrats = productes.filter(
    (p) =>
      p.nom.toLowerCase().includes(text) ||
      p.descripcio.toLowerCase().includes(text),
  )
  pintarProductes(filtrats)
})
