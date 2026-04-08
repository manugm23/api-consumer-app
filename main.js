const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 10;
let allResults = [];
let totalItems = 0;

//Referències als elements del DOM

const apiSelector = document.getElementById('apiSelector');
const searchInput = document.getElementById('searchInput');
const fetchButton = document.getElementById('fetchButton');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const resultsContainer = document.getElementById('resultsContainer');
const resultsSection = document.getElementById('results');
const paginationSection = document.getElementById('pagination');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentPageSpan = document.getElementById('currentPage');

//Event listener

fetchButton.addEventListener('click', fetchData);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchData();
    }
});

prevButton.addEventListener('click', goToPreviousPage);
nextButton.addEventListener('click', goToNextPage);

// FUNCIONS DE CONTROL DE UI

function showLoading() {
    loadingElement.classList.remove('hidden');
}

function hideLoading() {
    loadingElement.classList.add('hidden');
}

//Per mostrar missatges d'error

function showError(message) {
    errorMessage.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    errorElement.classList.add('hidden');
    errorMessage.textContent = '';
}

function showResults() {
    resultsSection.classList.remove('hidden');
}

function hideResults() {
    resultsSection.classList.add('hidden');
}


function showPagination() {
    paginationSection.classList.remove('hidden');
}

function hidePagination() {
    paginationSection.classList.add('hidden');
}

//FUNCIONS PRINCIPALS

async function fetchData() {
    const searchTerm = searchInput.value.trim();
    const useAxios = apiSelector.value === 'axios';

    // Validar que hi ha un terme de cerca
    if (!searchTerm) {
        showError('Por favor ingresa un término de búsqueda.');
        return;
    }

    showLoading();
    hideError();
    hideResults();
    hidePagination();
    resultsContainer.innerHTML = '';
    currentPage = 1;
    allResults = [];
    totalItems = 0;

    try {
        if (useAxios) {
            await fetchDataWithAxios(searchTerm);
        } else {
            await fetchDataWithFetch(searchTerm);
        }

        // Si tenemos resultados, mostrarlos
        if (allResults.length > 0) {
            displayResults(allResults, totalItems);
        } else {
            showError('No es van trobar resultats per a la teva cerca.');
        }
    } catch (error) {
        showError('Error inesperado: ' + error.message);
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

async function fetchDataWithFetch(searchTerm) {
    const url = new URL(API_URL);
    url.searchParams.append('_page', currentPage);
    url.searchParams.append('_limit', itemsPerPage);
    url.searchParams.append('q', searchTerm);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const totalCount = response.headers.get('X-Total-Count');

    allResults = data;
    totalItems = parseInt(totalCount) || data.length;
}

async function fetchDataWithAxios(searchTerm) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                _page: currentPage,
                _limit: itemsPerPage,
                q: searchTerm
            }
        });

        const data = response.data;
        const totalCount = response.headers['x-total-count'];

        allResults = data;
        totalItems = parseInt(totalCount) || data.length;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error HTTP: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error(error.message);
        }
    }
}

/**
 * Muestra los resultados y configura la paginación
 * @param {array} items - Array de items a mostrar
 * @param {number} totalItems - Total de items
 */
function displayResults(items, totalItems) {
    // Limpiar contenedor
    resultsContainer.innerHTML = '';

    // Si no hay resultados
    if (items.length === 0) {
        resultsContainer.innerHTML = '<p>No se han encontrado resultados</p>';
        return;
    }

    // Crear tarjetas para cada resultado
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = item.title || 'Sin título';
        const body = item.body || 'Sin descripción';
        const id = item.id || 'N/A';

        card.innerHTML = `
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
            <small>ID: ${id}</small>
        `;

        resultsContainer.appendChild(card);
    });

    // Configurar paginación
    setupPagination(totalItems);

    // Mostrar resultados
    showResults();
}

/**
 * Configura los botones de paginación
 * @param {number} totalItems - Total de items
 */
function setupPagination(totalItems) {
    // Limpiar contenedor de paginación
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        // Crear contenedor para botones si no existe
        let buttonsContainer = paginationContainer.querySelector('.pagination-buttons');
        if (!buttonsContainer) {
            buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'pagination-buttons';
            paginationContainer.appendChild(buttonsContainer);
        }
        buttonsContainer.innerHTML = '';

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Crear botones para cada página
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = 'pagination-btn';
            button.dataset.page = i;

            // Deshabilitar botón de página actual
            if (i === currentPage) {
                button.disabled = true;
                button.classList.add('active');
            }

            // Event listener para cambio de página
            button.addEventListener('click', () => {
                currentPage = i;
                fetchData(); // Recargar datos para la nueva página
            });

            buttonsContainer.appendChild(button);
        }

        showPagination();
    }
}

/**
 * Navega a la página anterior
 */
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Navega a la página siguiente
 */
function goToNextPage() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/* =====================================================
   FUNCIONES UTILITARIAS
   ===================================================== */

/**
 * Escapa caracteres especiales HTML para evitar XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

console.log('✅ API Consumer App Inicializada');
console.log('📚 API URL:', API_URL);
console.log('🔄 Items por página:', itemsPerPage);
