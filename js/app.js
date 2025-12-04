const grid = document.getElementById('grid-productes')
const buscador = document.getElementById('buscador')

function pintarProductes(llista) {
  grid.innerHTML = ''
  
  if (llista.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search fs-1 text-muted"></i>
        <p class="text-muted mt-3">No s'han trobat productes</p>
      </div>
    `
    return
  }
  
  llista.forEach((p) => {
    const col = document.createElement('div')
    col.className = 'col'
    
    col.innerHTML = `
      <div class="card h-100 shadow-sm hover-shadow transition">
        <img src="${p.imatge || 'https://via.placeholder.com/400'}" 
             class="card-img-top" 
             alt="${p.nom}"
             style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-primary mb-2 align-self-start">${p.categoria || 'General'}</span>
          <h5 class="card-title">${p.nom}</h5>
          <p class="card-text text-muted small flex-grow-1">${p.descripcio}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="h5 mb-0 text-primary fw-bold">${p.preu.toFixed(2)} €</span>
            <div>
              <a href="producte.html?id=${p.id}" class="btn btn-outline-primary btn-sm">
                <i class="bi bi-eye"></i> Veure
              </a>
              <button class="btn btn-primary btn-sm ms-1" onclick="afegirAlCarret(${p.id})">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    
    grid.appendChild(col)
  })
}

function afegirAlCarret(productId) {
  const producte = productes.find(p => p.id === productId)
  if (!producte) return
  
  // Obtenir carret del localStorage
  let carret = JSON.parse(localStorage.getItem('carret')) || []
  
  // Comprovar si el producte ja està al carret
  const index = carret.findIndex(item => item.id === productId)
  
  if (index !== -1) {
    carret[index].quantitat++
  } else {
    carret.push({ ...producte, quantitat: 1 })
  }
  
  // Guardar al localStorage
  localStorage.setItem('carret', JSON.stringify(carret))
  
  // Actualitzar badge del carret
  actualitzarBadgeCarret()
  
  // Mostrar notificació
  mostrarNotificacio(`${producte.nom} afegit al carret!`)
}

function actualitzarBadgeCarret() {
  const carret = JSON.parse(localStorage.getItem('carret')) || []
  const total = carret.reduce((sum, item) => sum + item.quantitat, 0)
  const badge = document.getElementById('carret-badge')
  if (badge) {
    badge.textContent = total
    badge.style.display = total > 0 ? 'inline' : 'none'
  }
}

function mostrarNotificacio(missatge) {
  // Crear notificació amb Bootstrap Toast
  const toastContainer = document.getElementById('toast-container') || crearToastContainer()
  
  const toast = document.createElement('div')
  toast.className = 'toast align-items-center text-white bg-success border-0'
  toast.setAttribute('role', 'alert')
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi bi-check-circle me-2"></i>${missatge}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `
  
  toastContainer.appendChild(toast)
  const bsToast = new bootstrap.Toast(toast)
  bsToast.show()
  
  // Eliminar després d'amagar
  toast.addEventListener('hidden.bs.toast', () => toast.remove())
}

function crearToastContainer() {
  const container = document.createElement('div')
  container.id = 'toast-container'
  container.className = 'toast-container position-fixed bottom-0 end-0 p-3'
  document.body.appendChild(container)
  return container
}

pintarProductes(productes)
actualitzarBadgeCarret()

buscador.addEventListener('input', () => {
  const text = buscador.value.toLowerCase()
  const filtrats = productes.filter(
    (p) =>
      p.nom.toLowerCase().includes(text) ||
      p.descripcio.toLowerCase().includes(text),
  )
  pintarProductes(filtrats)
})
