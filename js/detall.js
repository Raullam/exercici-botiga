function getParametre(nom) {
  const params = new URLSearchParams(window.location.search)
  return params.get(nom)
}

const id = parseInt(getParametre('id'), 10)
const cont = document.getElementById('detall-producte')

const producte = productes.find((p) => p.id === id)

if (!producte) {
  cont.innerHTML = '<p>Producte no trobat.</p>'
} else {
  cont.innerHTML = `
    <h1>${producte.nom}</h1>
    <p>${producte.descripcio}</p>
    <p><strong>${producte.preu.toFixed(2)} €</strong></p>
  `
}
