export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'empadao' | 'combo' | 'bebida';
  image: string; // URL or path to image
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface MenuCategory {
  key: 'empadao' | 'combo' | 'bebida';
  name: string;
  description: string;
  items: MenuItem[];
}