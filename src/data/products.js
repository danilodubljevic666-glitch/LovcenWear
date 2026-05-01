export const ORIGINAL_PRICE = 26.99

export const products = [
  { id: 'premium-majica',           name: 'Premium Majica',          price: 19.99, folder: 'Premium majica',
    colors: [
      { name: 'Crvena', file: 'crvena premium.png',  swatch: '#DC2626' },
      { name: 'Crna',   file: 'crna premim.png',     swatch: '#1a1a1a' },
      { name: 'Bijela', file: 'bijela premium.png',  swatch: '#f5f5f5' },
    ],
  },
  { id: '20-godina-premium-majica', name: '20 Godina Premium Majica', price: 19.99, folder: '20 godina premium majica',
    colors: [
      { name: 'Crvena', file: '20 godina crvena.png', swatch: '#DC2626' },
      { name: 'Crna',   file: '20 godina crna.png',   swatch: '#1a1a1a' },
      { name: 'Bijela', file: '20 godina bijela.png', swatch: '#f5f5f5' },
    ],
  },
  { id: 'polo-majica',              name: 'Polo Majica',              price: 24.99, folder: 'Polo majica',
    colors: [
      { name: 'Crna',   file: 'Polo majica crna.png',  swatch: '#1a1a1a' },
      { name: 'Bijela', file: 'Polo majica bijela 2.png', swatch: '#f5f5f5' },
    ],
  },
  { id: 'ultras-majica',            name: 'Ultras Majica',            price: 19.99, folder: 'Ultras majica',
    colors: [
      { name: 'Crna',   file: 'Ultras crna.png',   swatch: '#1a1a1a' },
      { name: 'Bijela', file: 'Ultras bijela.png',  swatch: '#f5f5f5' },
    ],
  },
  { id: 'krstas-majica',            name: 'Krstaš Majica',            price: 19.99, folder: 'Krstas majica',
    colors: [
      { name: 'Bijela',        file: 'krstas png.png',         swatch: '#f5f5f5' },
      { name: 'Crna',          file: 'krstas crni png.png',    swatch: '#1a1a1a' },
      { name: 'Zelena/Bijela', file: 'krstas zeleni png.png',  swatch: '#16A34A' },
      { name: 'Zelena/Crna',  file: 'krstas zeleni crna.png', swatch: '#14532d' },
    ],
  },
  { id: 'krstas-black-and-white',   name: 'Krstaš Black & White',     price: 20, originalPrice: 25, folder: 'krstas black and white',
    colors: [
      { name: 'Bijela', file: 'bijela.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'crna.png',   swatch: '#1a1a1a' },
    ],
  },
  { id: 'vijenac-majica',           name: 'Vijenac Majica',           price: 19.99, folder: 'Vijenac majica',
    colors: [
      { name: 'Bijela', file: 'vijenac bijeli png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'vijenac crni png.png',   swatch: '#1a1a1a' },
    ],
  },
  { id: 'njegos-majica',            name: 'Njegoš Majica',            price: 19.99, folder: 'Njegos majica',
    colors: [
      { name: 'Crna v1', file: 'njegos crna png.png', swatch: '#1a1a1a' },
      { name: 'Crna v2', file: 'njegos crni png.png', swatch: '#2a2a2a' },
    ],
  },
  { id: 'ultras-majica-2',          name: 'Ultras Majica 2',          price: 19.99, folder: 'Ultras majica 2',
    colors: [
      { name: 'Bijela', file: 'ultras bijela png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'ultras crna png.png',   swatch: '#1a1a1a' },
    ],
  },
  { id: 'crna-gora-majica',         name: 'Crna Gora Majica',         price: 19.99, folder: 'crna gora majica',
    colors: [
      { name: 'Crna',   file: 'mne crna png.png',   swatch: '#1a1a1a' },
      { name: 'Bijela', file: 'mne bijela png.png',  swatch: '#f5f5f5' },
    ],
  },
  { id: 'krstas-majica-2',          name: 'Krstaš Majica 2',          price: 19.99, folder: 'krstas majica 2',
    colors: [
      { name: 'Bijela', file: 'krstas moj 1 bijela png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'krstas moj 1 crna png.png',   swatch: '#1a1a1a' },
    ],
  },
  { id: 'krstas-majica-3',          name: 'Krstaš Majica 3',          price: 19.99, folder: 'krstas majica 3',
    colors: [
      { name: 'Crna',   file: 'krstas moj 2 crna png.png',   swatch: '#1a1a1a' },
      { name: 'Bijela', file: 'krstas moj 2 bijela png.png',  swatch: '#f5f5f5' },
    ],
  },
  { id: 'mne-majica',               name: 'MNE Majica',               price: 19.99, folder: 'mne majica',
    colors: [
      { name: 'Bijela', file: 'mne majica bijela.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'Mne majica.png',        swatch: '#1a1a1a' },
    ],
  },
]

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
