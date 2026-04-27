export const products = [
  {
    id: '20-godina-premium-majica',
    name: '20 Godina Premium Majica',
    folder: '20 godina premium majica',
    colors: [
      { name: 'Bijela', file: '20 godina bijela.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: '20 godina crna.png',   swatch: '#1a1a1a' },
      { name: 'Crvena', file: '20 godina crvena.png', swatch: '#DC2626' },
    ],
  },
  {
    id: 'krstas-majica',
    name: 'Krstas Majica',
    folder: 'Krstas majica',
    colors: [
      { name: 'Bijela',         file: 'krstas png.png',          swatch: '#f5f5f5' },
      { name: 'Crna',           file: 'krstas crni png.png',     swatch: '#1a1a1a' },
      { name: 'Zelena/Bijela',  file: 'krstas zeleni png.png',   swatch: '#16A34A' },
      { name: 'Zelena/Crna',   file: 'krstas zeleni crna.png',  swatch: '#14532d' },
    ],
  },
  {
    id: 'njegos-majica',
    name: 'Njegoš Majica',
    folder: 'Njegos majica',
    colors: [
      { name: 'Crna v1', file: 'njegos crna png.png',  swatch: '#1a1a1a' },
      { name: 'Crna v2', file: 'njegos crni png.png',  swatch: '#2a2a2a' },
    ],
  },
  {
    id: 'polo-majica',
    name: 'Polo Majica',
    folder: 'Polo majica',
    colors: [
      { name: 'Bijela', file: 'Polo majica bijela.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'Polo majica crna.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'premium-majica',
    name: 'Premium Majica',
    folder: 'Premium majica',
    colors: [
      { name: 'Bijela', file: 'bijela premium.png',   swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'crna premim.png',      swatch: '#1a1a1a' },
      { name: 'Crvena', file: 'crvena premium.png',   swatch: '#DC2626' },
    ],
  },
  {
    id: 'ultras-majica',
    name: 'Ultras Majica',
    folder: 'Ultras majica',
    colors: [
      { name: 'Bijela', file: 'Ultras bijela.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'Ultras crna.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'ultras-majica-2',
    name: 'Ultras Majica 2',
    folder: 'Ultras majica 2',
    colors: [
      { name: 'Bijela', file: 'ultras bijela png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'ultras crna png.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'vijenac-majica',
    name: 'Vijenac Majica',
    folder: 'Vijenac majica',
    colors: [
      { name: 'Bijela', file: 'vijenac bijeli png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'vijenac crni png.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'crna-gora-majica',
    name: 'Crna Gora Majica',
    folder: 'crna gora majica',
    colors: [
      { name: 'Bijela', file: 'mne bijela png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'mne crna png.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'krstas-majica-2',
    name: 'Krstas Majica 2',
    folder: 'krstas majica 2',
    colors: [
      { name: 'Bijela', file: 'krstas moj 1 bijela png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'krstas moj 1 crna png.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'krstas-majica-3',
    name: 'Krstas Majica 3',
    folder: 'krstas majica 3',
    colors: [
      { name: 'Bijela', file: 'krstas moj 2 bijela png.png', swatch: '#f5f5f5' },
      { name: 'Crna',   file: 'krstas moj 2 crna png.png',   swatch: '#1a1a1a' },
    ],
  },
  {
    id: 'mne-majica',
    name: 'MNE Majica',
    folder: 'mne majica',
    colors: [
      { name: 'Crna',   file: 'Mne majica.png',       swatch: '#1a1a1a' },
      { name: 'Bijela', file: 'mne majica bijela.png', swatch: '#f5f5f5' },
    ],
  },
]

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
