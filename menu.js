/* CARDÁPIO COMPLETO - EMPADÃO DA TÂNIA
   Imagens: Unsplash (Alta Definição)
   Categorias: Destaques, Tigela, Média, Panelinha, Tapioca, Sobremesa, Bebida
*/

export const menuData = [
    // --- DESTAQUES (Para a Home) ---
    {
        id: 1,
        category: 'destaque',
        name: 'Panelinha Goiana (2 Pessoas)',
        description: 'A joia do cerrado. Arroz, frango, linguiça caseira, pequi, guariroba, muçarela e banana da terra frita.',
        price: 115.00,
        image: 'https://cdn.vucasolution.com.br/upload/w_300,c_fit/https://gryyplgyeyqb.compat.objectstorage.sa-saopaulo-1.oraclecloud.com/vuca-cdn/empadaogoianodatania/arqs/produtos/pjiwckfzltlba0a5gxci.jpg',
        highlight: true,
        anotaAiLink: 'https://pedido.anota.ai/loja/empado-goiano-da-tnia-caldas-novas?categoria=panelinhas'
    },
    {
        id: 2,
        category: 'destaque',
        name: 'Empadão Goiano (Tigela)',
        description: 'Servido na tigela de barro. Frango, linguiça, batata, azeitona, lascas de pequi, guariroba e muçarela.',
        price: 39.00,
        image: 'https://cdn.vucasolution.com.br/upload/w_300,c_fit/https://gryyplgyeyqb.compat.objectstorage.sa-saopaulo-1.oraclecloud.com/vuca-cdn/empadaogoianodatania/arqs/produtos/myrzs9cexgwjrywcbs1m.jpg',
        highlight: true,
        anotaAiLink: 'https://pedido.anota.ai/loja/empado-goiano-da-tnia-caldas-novas'
    },
    {
        id: 3,
        category: 'destaque',
        name: 'Tradicional',
        description: 'Frango desfiado, batata em cubos, azeitona, linguiça suína e muito queijo.',
        price: 9.00,
        image: 'https://cdn.vucasolution.com.br/upload/w_800/https://gryyplgyeyqb.compat.objectstorage.sa-saopaulo-1.oraclecloud.com/vuca-cdn/empadaogoianodatania/arqs/produtos/w2ngydekiqadnvcza7yz.jpg',
        highlight: true,
        anotaAiLink: ''
    },

    // --- EMPADAS NA TIGELA (Grandes / Para Fome de Leão) ---
    {
        id: 10,
        category: 'tigela',
        name: 'Tradicional Grande (Na Tigela)',
        description: 'A gigante! Frango desfiado, batata em cubos, azeitona, linguiça suína e muito queijo. (Sem pequi/guariroba). Aprox. 600g.',
        price: 37.00,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 11,
        category: 'tigela',
        name: 'Goiana da Tânia (Na Tigela)',
        description: 'A completa: Frango, linguiça, batata, azeitona, lascas de pequi, guariroba e muçarela. O sabor do cerrado.',
        price: 39.00,
        image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 12,
        category: 'tigela',
        name: 'Camarão Cremoso (Na Tigela)',
        description: 'Camarões selecionados ao molho de queijos finos e catupiry original.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1628840045765-6853549048a1?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },

    // --- EMPADAS MÉDIAS (Individuais - Aprox. 300g) ---
    {
        id: 20,
        category: 'media',
        name: 'Goiana da Tânia (Média)',
        description: 'Nossa campeã de vendas. Frango, pequi, guariroba, linguiça, batata e queijo.',
        price: 29.00,
        image: 'https://plus.unsplash.com/premium_photo-1673549097873-c15c48d4c4e7?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 21,
        category: 'media',
        name: 'Paulista (Média)',
        description: 'Recheio cremoso de frango, palmito picado, azeitonas e requeijão.',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1604423043450-94a11ae88b39?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 22,
        category: 'media',
        name: 'Nordestina (Média)',
        description: 'Sabor marcante de Carne Serenada (Carne Seca) desfiada cozida com mandioca.',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 23,
        category: 'media',
        name: 'Frango com Bacon (Média)',
        description: 'Filé de frango desfiado, bacon picado crocante, muçarela e requeijão.',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 24,
        category: 'media',
        name: 'Palmito com Requeijão (Média)',
        description: 'Opção vegetariana. Palmito em cubos ao molho, azeitonas e requeijão cremoso.',
        price: 19.00,
        image: 'https://images.unsplash.com/photo-1604423043450-94a11ae88b39?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 25,
        category: 'media',
        name: '4 Queijos (Média)',
        description: 'Explosão de queijos: Muçarela, Provolone, Requeijão e Queijo Cremoso.',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },

    // --- PANELINHAS (Para 2 Pessoas) ---
    {
        id: 30,
        category: 'panelinha',
        name: 'Panelinha Goiana da Tânia',
        description: 'Serve 2 pessoas. Arroz, frango, linguiça caseira, pequi, guariroba, muçarela e banana da terra frita.',
        price: 115.00,
        image: 'https://images.unsplash.com/photo-1596707611833-257a3d9050d5?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 31,
        category: 'panelinha',
        name: 'Panelinha Mineira',
        description: 'Serve 2 pessoas. Arroz, pernil, costelinha suína, linguiça, muçarela e banana da terra.',
        price: 110.00,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 32,
        category: 'panelinha',
        name: 'Panelinha Paulista',
        description: 'Serve 2-3 pessoas. Arroz, frango, requeijão, palmito, muçarela e azeitonas.',
        price: 105.00,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },

    // --- TAPIOCAS E CUSCUZ ---
    {
        id: 40,
        category: 'tapioca',
        name: 'Tapioca de Frango com Catupiry',
        description: 'Massa fininha e crocante, bem recheada com frango temperado.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1596450514967-f40212002e21?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 41,
        category: 'tapioca',
        name: 'Cuscuz Nordestino Completo',
        description: 'Cuscuz amarelo fofinho com carne seca, queijo coalho e manteiga de garrafa.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1606509036577-440263c965c7?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },

    // --- SOBREMESAS ---
    {
        id: 50,
        category: 'sobremesa',
        name: 'Pudim na Caneca',
        description: 'Nosso famoso pudim servido na canequinha esmaltada rústica. (A caneca é charme da casa!)',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1594285810790-a359424c16a6?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 51,
        category: 'sobremesa',
        name: 'Pastelim de Nutella',
        description: 'Massa de empada com recheio generoso de Nutella e açúcar de confeiteiro.',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },

    // --- BEBIDAS ---
    {
        id: 60,
        category: 'bebida',
        name: 'Suco de Cajá (500ml)',
        description: 'O sabor autêntico do cerrado, bem gelado e natural.',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 61,
        category: 'bebida',
        name: 'Refrigerante Lata',
        description: 'Coca-Cola, Guaraná, Zero ou Normal.',
        price: 8.00,
        image: 'https://images.unsplash.com/photo-1622483767028-3f6e924153b2?q=80&w=800&auto=format&fit=crop',
        highlight: false
    },
    {
        id: 62,
        category: 'bebida',
        name: 'Água Mineral',
        description: 'Com ou sem gás.',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1523362628408-32d6b6d62386?q=80&w=800&auto=format&fit=crop',
        highlight: false
    }
];