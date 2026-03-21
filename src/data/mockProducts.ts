import { Product } from '../types';
import dalagImage from 'figma:asset/979dbcf1badbb17f9f08b7fd762393deb5663711.png';
import hitoImage from 'figma:asset/c30b9127d3503e31400f572a80c7d61c8a878c27.png';
import bangusImage from 'figma:asset/c30b67ef21eb2eb4d9d1a6a70a0bda478dccf7bb.png';
import crabImage from 'figma:asset/6d8fe1edd9e062a82bbda5c044864b440a2d4269.png';
import prawnImage from 'figma:asset/6cd84de54dcd0bb436a7fd299811a2785cbd81cb.png';
import tilapiaImage from 'figma:asset/b9574a18e29ebf91f446c028d0bffce000eaed41.png';
import tulyaImage from 'figma:asset/6d5a2a889370468fbfed2579264178e2e4a7dc6d.png';
import tilapiaFilletImage from 'figma:asset/390f34ddc5ff3481ac8ce5742ccd2490fe1fe0fc.png';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tilapia',
    description: 'Farm-raised tilapia, freshly harvested. Perfect for grilling or frying.',
    price: 100,
    unit: 'per kg (5pcs good size)',
    image: tilapiaImage,
    farmName: 'San Fernando Aquafarm',
    location: 'San Fernando, Pampanga',
    stock: 150,
    category: 'Fish'
  },
  {
    id: '2',
    name: 'Giant Freshwater Prawns',
    description: 'Large, succulent prawns perfect for grilling or sinigang.',
    price: 800,
    unit: 'per kg',
    image: prawnImage,
    farmName: 'Masantol Prawn Farm',
    location: 'Masantol, Pampanga',
    stock: 80,
    category: 'Shellfish'
  },
  {
    id: '3',
    name: 'Mudfish (Dalag)',
    description: 'Wild-caught mudfish, known for its tender meat and rich flavor.',
    price: 130,
    unit: 'per kg',
    image: dalagImage,
    farmName: 'Candaba Swamp Fishery',
    location: 'Candaba, Pampanga',
    stock: 60,
    category: 'Fish'
  },
  {
    id: '4',
    name: 'Milkfish (Bangus)',
    description: 'Fresh bangus, deboned options available. A Filipino favorite!',
    price: 100,
    unit: 'per kg',
    image: bangusImage,
    farmName: 'Apalit Fish Farm',
    location: 'Apalit, Pampanga',
    stock: 120,
    category: 'Fish'
  },
  {
    id: '5',
    name: 'Freshwater Crabs (Medium)',
    description: 'Locally harvested crabs with sweet, delicate meat.',
    price: 700,
    unit: 'per kg',
    image: crabImage,
    farmName: 'Masantol Crab Farm',
    location: 'Masantol, Pampanga',
    stock: 45,
    category: 'Shellfish'
  },
  {
    id: '9',
    name: 'Freshwater Crabs (Large)',
    description: 'Premium large-sized crabs with abundant sweet meat. Perfect for special occasions.',
    price: 850,
    unit: 'per kg',
    image: crabImage,
    farmName: 'Masantol Crab Farm',
    location: 'Masantol, Pampanga',
    stock: 30,
    category: 'Shellfish'
  },
  {
    id: '6',
    name: 'Catfish (Hito)',
    description: 'Farm-raised catfish, ideal for sinigang or grilled dishes.',
    price: 150,
    unit: 'per kg',
    image: hitoImage,
    farmName: 'Mabalacat Aquaculture',
    location: 'Mabalacat, Pampanga',
    stock: 90,
    category: 'Fish'
  },
  {
    id: '7',
    name: 'Freshwater Clams (Tulya)',
    description: 'Sweet and tender clams, perfect for soups and stews.',
    price: 140,
    unit: 'per kg',
    image: tulyaImage,
    farmName: 'Sasmuan Shellfish Farm',
    location: 'Sasmuan, Pampanga',
    stock: 75,
    category: 'Shellfish'
  },
  {
    id: '8',
    name: 'Premium Tilapia Fillets',
    description: 'Cleaned and filleted tilapia, ready to cook.',
    price: 180,
    unit: 'per kg',
    image: tilapiaFilletImage,
    farmName: 'San Fernando Aquafarm',
    location: 'San Fernando, Pampanga',
    stock: 55,
    category: 'Fish'
  }
];