/* CARDÁPIO COMPLETO - EMPADÃO DA TÂNIA
  Atualizado com base no VucaFood e Anota.ai
*/

export const menuData = [
    // --- DESTAQUES (Ouro da Casa) ---
    {
        id: 1,
        category: 'destaque',
        name: 'Panelinha Goiana (2 Pessoas)',
        description: 'A joia do cerrado. Arroz, frango, linguiça caseira, pequi, guariroba, muçarela e banana da terra frita.',
        price: 115.00,
        image: '/img/panelinha-goiana.jpg',
        highlight: true
    },
    {
        id: 2,
        category: 'destaque',
        name: 'Empadão Goiano (Tigela)',
        description: 'Servido na tigela de barro. Frango, linguiça, batata, azeitona, lascas de pequi, guariroba e muçarela.',
        price: 39.00,
        image: '/img/empadao-goiano.jpg',
        highlight: true
    },

    // --- EMPADAS NA TIGELA (Grandes / Para Fome de Leão) ---
    {
        id: 3,
        category: 'tigela',
        name: 'Tradicional Grande (Na Tigela)',
        description: 'A gigante! Frango desfiado, batata em cubos, azeitona, linguiça suína e muito queijo. (Sem pequi/guariroba). Aprox. 600g.',
        price: 37.00,
        image: '/img/empadao-grande.jpg',
        highlight: false
    },
    {
        id: 4,
        category: 'tigela',
        name: 'Goiana da Tânia (Na Tigela)',
        description: 'A completa: Frango, linguiça, batata, azeitona, lascas de pequi, guariroba e muçarela. O sabor do cerrado.',
        price: 39.00,
        image: '/img/empadao-goiano.jpg',
        highlight: true
    },
    {
        id: 5,
        category: 'tigela',
        name: 'Camarão Cremoso',
        description: 'Camarões selecionados ao molho de queijos finos e catupiry.',
        price: 45.00,
        image: '/img/empadao-camarao.jpg'
    },

    // --- EMPADAS MÉDIAS (Individuais - Aprox. 300g) ---
    {
        id: 10,
        category: 'media',
        name: 'Goiana da Tânia (Média)',
        description: 'Nossa campeã de vendas. Frango, pequi, guariroba, linguiça, batata e queijo.',
        price: 29.00,
        image: '/img/empadao-medio.jpg',
        highlight: true
    },
    {
        id: 11,
        category: 'media',
        name: 'Paulista (Média)',
        description: 'Recheio cremoso de frango, palmito picado, azeitonas e requeijão.',
        price: 26.00,
        image: '/img/empadao-paulista.jpg',
        highlight: false
    },
    {
        id: 12,
        category: 'media',
        name: 'Nordestina (Média)',
        description: 'Sabor marcante de Carne Serenada (Carne Seca) desfiada cozida com mandioca.',
        price: 28.00,
        image: '/img/empadao-carne-seca.jpg',
        highlight: false
    },
    {
        id: 13,
        category: 'media',
        name: 'Frango com Bacon (Média)',
        description: 'Filé de frango desfiado, bacon picado crocante, muçarela e requeijão.',
        price: 24.00,
        image: '/img/empadao-bacon.jpg',
        highlight: false
    },
    {
        id: 14,
        category: 'media',
        name: 'Palmito com Requeijão (Média)',
        description: 'Opção vegetariana. Palmito em cubos ao molho, azeitonas e requeijão cremoso.',
        price: 19.00,
        image: '/img/empadao-palmito.jpg',
        highlight: false
    },
    {
        id: 15,
        category: 'media',
        name: '4 Queijos (Média)',
        description: 'Explosão de queijos: Muçarela, Provolone, Requeijão e Queijo Cremoso.',
        price: 26.00,
        image: '/img/empadao-queijo.jpg',
        highlight: false
    },
    {
        id: 16,
        category: 'media',
        name: 'Frango com Catupiry',
        description: 'Clássica e infalível. Massa podre amanteigada.',
        price: 24.00,
        image: '/img/empadao-frango.jpg'
    },
    {
        id: 17,
        category: 'media',
        name: 'Carne Seca com Abóbora',
        description: 'O contraste perfeito do salgado com o adocicado.',
        price: 28.00,
        image: '/img/empadao-carne-seca.jpg'
    },
    {
        id: 18,
        category: 'media',
        name: 'Palmito (Vegetariana)',
        description: 'Palmito pupunha em cubos com molho branco especial.',
        price: 22.00,
        image: '/img/empadao-palmito.jpg'
    },

    // --- PANELINHAS (Para 2 Pessoas) ---
    {
        id: 30,
        category: 'panelinha',
        name: 'Panelinha Goiana da Tânia',
        description: 'Serve 2 pessoas. Arroz, frango, linguiça caseira, pequi, guariroba, muçarela e banana da terra frita.',
        price: 115.00,
        image: '/img/panelinha-goiana.jpg',
        highlight: true
    },
    {
        id: 31,
        category: 'panelinha',
        name: 'Panelinha Mineira',
        description: 'Serve 2 pessoas. Arroz, pernil, costelinha suína, linguiça, muçarela e banana da terra.',
        price: 110.00,
        image: '/img/panelinha-mineira.jpg',
        highlight: false
    },
    {
        id: 32,
        category: 'panelinha',
        name: 'Panelinha Paulista',
        description: 'Serve 2-3 pessoas. Arroz, frango, requeijão, palmito, muçarela e azeitonas.',
        price: 105.00,
        image: '/img/panelinha-paulista.jpg',
        highlight: false
    },

    // --- TAPIOCAS E CUSCUZ ---
    {
        id: 40,
        category: 'tapioca',
        name: 'Tapioca de Frango com Catupiry',
        description: 'Massa fininha e crocante, bem recheada.',
        price: 20.00,
        image: '/img/tapioca.jpg',
        highlight: false
    },
    {
        id: 41,
        category: 'tapioca',
        name: 'Cuscuz Nordestino Completo',
        description: 'Com carne seca, queijo coalho e manteiga de garrafa.',
        price: 22.00,
        image: '/img/cuscuz.jpg',
        highlight: false
    },

    // --- SOBREMESAS ---
    {
        id: 50,
        category: 'sobremesa',
        name: 'Pudim na Caneca',
        description: 'Nosso famoso pudim servido na canequinha esmaltada rústica. (A caneca é charme da casa!)',
        price: 12.00,
        image: '/img/pudim.jpg',
        highlight: false
    },
    {
        id: 51,
        category: 'sobremesa',
        name: 'Pastelim de Nutella',
        description: 'Massa de empada com recheio generoso de Nutella.',
        price: 9.00,
        image: '/img/pastelim.jpg',
        highlight: true
    },

    // --- BEBIDAS ---
    {
        id: 60,
        category: 'bebida',
        name: 'Suco de Cajá (500ml)',
        description: 'O sabor autêntico do cerrado, bem gelado.',
        price: 16.00,
        image: '/img/suco-caja.jpg',
        highlight: false
    },
    {
        id: 61,
        category: 'bebida',
        name: 'Refrigerante Lata',
        description: 'Coca-Cola, Guaraná, Zero ou Normal.',
        price: 8.00,
        image: '/img/coca.jpg',
        highlight: false
    },
    {
        id: 62,
        category: 'bebida',
        name: 'Água Mineral',
        description: 'Com ou sem gás.',
        price: 5.00,
        image: '/img/agua.jpg',
        highlight: false
    }
];