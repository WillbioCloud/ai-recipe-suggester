import type { MenuCategory } from '../types';

// Simulated menu data for "Empadão Goiano da Tânia"
export const menuData: MenuCategory[] = [
  {
    key: 'empadao',
    name: 'Empadões Artesanais',
    description: 'Nossa massa especial, fininha e crocante, recheada com os ingredientes mais frescos e saborosos da região.',
    items: [
      {
        id: 1,
        name: 'Empadão Goiano Tradicional',
        description: 'O sabor autêntico de Goiás: frango cremoso, linguiça, guariroba, queijo, azeitonas e um toque de pimenta.',
        price: 15.00,
        category: 'empadao',
        image: 'https://images.unsplash.com/photo-1627885338006-73c783babd93?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 2,
        name: 'Frango com Catupiry®',
        description: 'Um clássico absoluto. Peito de frango desfiado e temperado, com a cremosidade inconfundível do Catupiry® Original.',
        price: 12.50,
        category: 'empadao',
        image: 'https://images.unsplash.com/photo-1615807713086-bfc4975801d0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 3,
        name: 'Carne Seca com Abóbora',
        description: 'Contraste perfeito entre o sabor marcante da carne seca desfiada e a doçura suave do purê de abóbora cabotiá.',
        price: 14.00,
        category: 'empadao',
        image: 'https://images.unsplash.com/photo-1599501521946-8a9a4b86e58b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 8,
        name: 'Palmito Cremoso',
        description: 'Recheio delicado e muito cremoso de palmito nobre picado, refogado com ervas finas e um toque de requeijão.',
        price: 13.00,
        category: 'empadao',
        image: 'https://images.unsplash.com/photo-1589112813339-a9a3a1a44e66?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      }
    ]
  },
  {
    key: 'combo',
    name: 'Combos Especiais',
    description: 'Para matar a fome com economia. Combine seu empadão favorito com uma bebida geladinha.',
    items: [
      {
        id: 4,
        name: 'Combo Individual',
        description: '1 empadão à sua escolha + 1 refrigerante lata. A medida certa para a sua fome.',
        price: 18.00,
        category: 'combo',
        image: 'https://images.unsplash.com/photo-1550507992-eb134b772591?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 5,
        name: 'Combo Casal',
        description: '2 empadões à sua escolha + 2 refrigerantes lata. Perfeito para compartilhar!',
        price: 35.00,
        category: 'combo',
        image: 'https://images.unsplash.com/photo-1606411213824-2193b2e5a528?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 9,
        name: 'Combo Família',
        description: '4 empadões à sua escolha + 1 refrigerante 2L. A alegria da galera garantida!',
        price: 65.00,
        category: 'combo',
        image: 'https://images.unsplash.com/photo-1600096194534-95cf5ece1466?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      }
    ]
  },
  {
    key: 'bebida',
    name: 'Bebidas',
    description: 'Para acompanhar seu empadão, temos refrigerantes e sucos sempre gelados.',
    items: [
      {
        id: 6,
        name: 'Coca-Cola (Lata 350ml)',
        description: 'O sabor inconfundível para acompanhar sua refeição.',
        price: 5.00,
        category: 'bebida',
        image: 'https://images.unsplash.com/photo-1622483767028-3f6e924153b2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 7,
        name: 'Guaraná Antarctica (Lata 350ml)',
        description: 'O sabor original do Brasil para refrescar.',
        price: 5.00,
        category: 'bebida',
        image: 'https://images.unsplash.com/photo-1632073998834-34c9b33a7e6b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      },
      {
        id: 10,
        name: 'Água Mineral (500ml)',
        description: 'Hidratação pura e simples. Com ou sem gás.',
        price: 3.00,
        category: 'bebida',
        image: 'https://images.unsplash.com/photo-1583133694643-650a2e3585d8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
      }
    ]
  }
];