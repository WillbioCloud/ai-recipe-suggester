/* SCRIPT.JS - EMPADÃO DA TÂNIA
   Versão Final: Integração Completa (Menu, GPS, Múltiplas Lojas, WhatsApp)
*/

// Importa os dados do arquivo separado (Certifique-se que menu.js está na mesma pasta)
import { menuData } from './menu.js';

/* --- ESTADO GLOBAL --- */
let cart = [];
let userLocationLink = null; // Armazena o link do Google Maps se o GPS for usado

/* --- ELEMENTOS DO DOM --- */
const menuGrid = document.getElementById('menu-grid');           // Grid da página Cardápio
const highlightsGrid = document.getElementById('highlights-grid'); // Grid da página Home
const tabs = document.querySelectorAll('.tab-btn');              // Botões de filtro

/* --- 1. FUNÇÕES DE RENDERIZAÇÃO --- */

// Cria o HTML de um cartão de produto
function createCardHTML(item) {
    return `
        <div class="menu-item fade-in">
            <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='https://via.placeholder.com/300?text=Foto+do+Prato'">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-desc">${item.description}</p>
                <div class="item-footer">
                    <span class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    <button onclick="window.addToCart(${item.id})" class="add-btn" aria-label="Adicionar ao Carrinho">+</button>
                </div>
            </div>
        </div>
    `;
}

// Renderiza os Destaques (Apenas na Home)
function renderHighlights() {
    if (!highlightsGrid) return;
    // Filtra apenas itens marcados como highlight: true no menu.js
    const highlights = menuData.filter(item => item.highlight);
    highlightsGrid.innerHTML = highlights.map(item => createCardHTML(item)).join('');
}

// Renderiza o Cardápio Completo (Apenas na página Cardápio)
function renderFullMenu(filterCategory = 'media') {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    const items = menuData.filter(item => item.category === filterCategory);
    
    if (items.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">Em breve novidades nesta categoria!</p>';
    } else {
        menuGrid.innerHTML = items.map(item => createCardHTML(item)).join('');
    }
}

/* --- 2. INICIALIZAÇÃO E EVENTOS --- */
document.addEventListener('DOMContentLoaded', () => {
    // Se estiver na Home
    if (highlightsGrid) renderHighlights();
    
    // Se estiver na página de Cardápio
    if (menuGrid) {
        renderFullMenu('media'); // Categoria inicial padrão
        
        // Lógica de troca de abas
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderFullMenu(tab.dataset.category);
            });
        });
    }
});

/* --- 3. LÓGICA DO CARRINHO (WINDOW GLOBAL) --- */
// Funções anexadas ao window para funcionarem no onclick do HTML

window.addToCart = (id) => {
    const item = menuData.find(i => i.id === id);
    if (!item) return;

    const existingItem = cart.find(i => i.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    
    // Efeito visual no botão flutuante
    const btn = document.getElementById('cart-btn');
    if(btn) {
        btn.classList.remove('hidden');
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }
};

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartBtn = document.getElementById('cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartCount) return;

    // Atualiza contador
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalQty;

    // Mostra/Oculta botão flutuante
    if (totalQty > 0) cartBtn.classList.remove('hidden');
    else cartBtn.classList.add('hidden');

    // Atualiza lista no modal
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Seu carrinho está vazio 😢</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item-row">
                <div style="flex:1;">
                    <strong>${item.name}</strong>
                    <div style="font-size:0.85rem; color:#666">
                        ${item.quantity}x R$ ${item.price.toFixed(2).replace('.', ',')}
                    </div>
                </div>
                <div style="font-weight:bold; margin-right:15px;">
                    R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </div>
                <button onclick="window.removeFromCart(${item.id})" style="color:red; border:none; background:none; cursor:pointer; font-size:1.2rem;">&times;</button>
            </div>
        `).join('');
    }

    // Atualiza Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/* --- 4. MODAL E NAVEGAÇÃO --- */
const modal = document.getElementById('cart-modal');
const closeBtn = document.getElementById('close-cart');
const cartBtn = document.getElementById('cart-btn');

if (cartBtn && modal) {
    cartBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    
    // Fechar ao clicar fora do modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
}

/* --- 5. CHECKOUT PREMIUM (LÓGICA FINAL) --- */

// Alternar campos baseados na escolha (Entrega / Retirada / Mesa)
window.toggleAddressField = () => {
    const type = document.getElementById('order-type').value;
    
    // Esconde todas as seções primeiro
    document.querySelectorAll('.order-section').forEach(el => el.classList.add('hidden'));

    // Mostra a seção correspondente
    if (type === 'delivery') document.getElementById('section-delivery').classList.remove('hidden');
    if (type === 'retirada') document.getElementById('section-pickup').classList.remove('hidden');
    if (type === 'mesa') document.getElementById('section-table').classList.remove('hidden');
};

// Geolocalização (GPS)
window.getLocation = () => {
    const status = document.getElementById('location-status');
    const btn = document.getElementById('btn-location');

    if (!navigator.geolocation) {
        status.innerText = "Seu navegador não suporta geolocalização.";
        return;
    }

    status.innerText = "📍 Localizando...";
    btn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // Cria link oficial do Google Maps
            userLocationLink = `https://www.google.com/maps?q=${lat},${lng}`;
            
            status.innerText = "✅ Localização capturada com sucesso!";
            status.style.color = "green";
            btn.classList.add('success');
            btn.innerText = "📍 Localização Definida";
            btn.disabled = false;
        },
        (error) => {
            status.innerText = "❌ Erro ao obter localização. Por favor, digite o endereço.";
            status.style.color = "red";
            console.error(error);
            btn.disabled = false;
        }
    );
};

// Enviar Pedido para o WhatsApp
const checkoutBtn = document.getElementById('checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const name = document.getElementById('client-name').value;
        const type = document.getElementById('order-type').value;
        const obs = document.getElementById('client-obs').value;

        // Validações
        if (!name) { alert('Por favor, informe seu nome.'); return; }
        if (!type || type === "") { alert('Escolha como deseja receber o pedido.'); return; }
        if (cart.length === 0) { alert('Seu carrinho está vazio.'); return; }

        let addressInfo = "";
        
        // Lógica de Entrega
        if (type === 'delivery') {
            const street = document.getElementById('address-street').value;
            const number = document.getElementById('address-number').value;
            const bairro = document.getElementById('address-neighborhood').value;
            const ref = document.getElementById('address-ref').value;

            // Usa GPS se disponível, senão exige endereço
            if (userLocationLink) {
                addressInfo = `📍 *Localização GPS:* ${userLocationLink}`;
                if (ref) addressInfo += `%0A🏢 Ref: ${ref}`;
                if (street) addressInfo += `%0A(Rua aprox: ${street})`; 
            } else {
                if (!street || !number || !bairro) {
                    alert('Por favor, preencha o endereço completo ou use o botão de localização.'); return;
                }
                addressInfo = `🏠 *Entrega em:* ${street}, ${number} - ${bairro}`;
                if (ref) addressInfo += `%0A🏢 Ref: ${ref}`;
            }
        } 
        // Lógica de Retirada
        else if (type === 'retirada') {
            const unit = document.getElementById('pickup-unit');
            const unitName = unit.options[unit.selectedIndex].text;
            addressInfo = `🥡 *Retirada na Loja:*%0A${unitName}`;
        }
        // Lógica de Mesa
        else if (type === 'mesa') {
            const table = document.getElementById('table-number').value;
            if (!table) { alert('Informe o número da mesa.'); return; }
            addressInfo = `🍽️ *Mesa:* ${table} (Consumo no Local)`;
        }

        // Montagem da Mensagem Estilo "Ticket"
        let msg = `*NOVO PEDIDO - SITE* 🛒%0A`;
        msg += `--------------------------------%0A`;
        msg += `👤 Cliente: *${name}*%0A`;
        msg += `--------------------------------%0A`;
        
        cart.forEach(item => {
            msg += `• ${item.quantity}x ${item.name}%0A`;
        });
        
        const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        msg += `--------------------------------%0A`;
        msg += `💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*%0A`;
        msg += `--------------------------------%0A`;
        msg += `${addressInfo}%0A`;
        
        if (obs) msg += `📝 Obs: ${obs}%0A`;
        
        msg += `--------------------------------%0A`;
        msg += `Aguardo confirmação.`;

        // Substitua pelo número real da Tânia
        const phone = "5564999999999"; 
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
}

/* --- 6. EFEITOS VISUAIS (SCROLL) --- */
window.addEventListener('scroll', () => {
    // Header transparente apenas na Home e quando no topo
    const header = document.getElementById('main-header');
    if (header && !header.classList.contains('header-scrolled-fixed')) {
        // Se a página já não tiver a classe fixa (como a pg cardapio), aplica lógica
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }

    // Parallax
    const bg = document.querySelector('.hero-bg-parallax');
    if(bg) bg.style.transform = `translateY(${window.scrollY * 0.5}px)`;

    // Reveal Elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) el.classList.add('visible');
    });
});