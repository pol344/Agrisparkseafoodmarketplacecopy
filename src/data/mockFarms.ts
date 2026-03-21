import { Farm } from '../types';
import apalitLogo from 'figma:asset/1a9fc49fc4bbde46bb933f0d9bb0cb69fe9da6ab.png';
import masantolLogo from 'figma:asset/4e0c0a6b8e70fc2d40c5a9e8e96e3a46ec39d0e9.png';
import pampangaFreshLogo from 'figma:asset/4d3e4edcfd7df3eecd5b1b9e0c47aca3afc1be7d.png';
import communityCatchLogo from 'figma:asset/3a0eb4fd8bb8784a8f3b8b8d54821ffbb45d8d9a.png';
import apalitHero from 'figma:asset/c21dea52f53f80ce30e9add8413768101dc4e24a.png';
import mabalacatHero from 'figma:asset/384f8905bdf6eef819af0a371e37f32c98c615c9.png';
import candabaHero from 'figma:asset/eec157ea2e5768ddec7a7ad0347d73a0613bd72d.png';
import sasmuanHero from 'figma:asset/78de643f104c06574649f4e72e0d5ad07d4e9dcf.png';
import sanFernandoHero from 'figma:asset/7d61305eccf369422796f1eaa7918a104a463e38.png';

export const mockFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'San Fernando Aquafarm',
    logo: pampangaFreshLogo,
    heroImage: sanFernandoHero,
    location: 'San Fernando, Pampanga',
    rating: 4.5,
    harvestInfo: 'Harvest: Today',
    deliveryFee: 50,
    description: 'Fair trade tilapia and premium fillets.',
    specialties: ['Tilapia', 'Premium Fillets'],
    established: '2018',
    certifications: ['Organic', 'Fair Trade']
  },
  {
    id: 'farm-2',
    name: 'Apalit Fish Farm',
    logo: apalitLogo,
    heroImage: apalitHero,
    location: 'Apalit, Pampanga',
    rating: 4.8,
    harvestInfo: 'Harvest: Yesterday',
    deliveryFee: 40,
    description: 'Empowering bangus farmers with sustainable practices.',
    specialties: ['Bangus', 'Milkfish'],
    established: '2015',
    certifications: ['Sustainable', 'Community-based']
  },
  {
    id: 'farm-3',
    name: 'Masantol Crab Farm',
    logo: masantolLogo,
    heroImage: 'https://images.unsplash.com/photo-1657586115627-34474292300a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaHdhdGVyJTIwY3JhYnN8ZW58MXx8fHwxNzc0MDg5NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Masantol, Pampanga',
    rating: 4.7,
    harvestInfo: 'Harvest: Today',
    deliveryFee: 55,
    description: 'Premium crabs and prawns from pristine waters.',
    specialties: ['Freshwater Crabs', 'Alimango'],
    established: '2016',
    certifications: ['Premium Quality', 'Fresh Catch']
  },
  {
    id: 'farm-4',
    name: 'Masantol Prawn Farm',
    logo: communityCatchLogo,
    heroImage: 'https://images.unsplash.com/photo-1707056706448-41c4e78f1dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaHdhdGVyJTIwcHJhd25zfGVufDF8fHx8MTc3NDA4OTkxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Masantol, Pampanga',
    rating: 4.6,
    harvestInfo: 'Harvest: Today',
    deliveryFee: 45,
    description: 'Giant freshwater prawns raised in clean ponds.',
    specialties: ['Giant Prawns', 'Freshwater Prawns'],
    established: '2017',
    certifications: ['Clean Water', 'Quality Assured']
  },
  {
    id: 'farm-5',
    name: 'Candaba Swamp Fishery',
    logo: pampangaFreshLogo,
    heroImage: candabaHero,
    location: 'Candaba, Pampanga',
    rating: 4.4,
    harvestInfo: 'Harvest: Yesterday',
    deliveryFee: 60,
    description: 'Wild-caught mudfish from natural swamps.',
    specialties: ['Dalag', 'Mudfish'],
    established: '2010',
    certifications: ['Wild Caught', 'Natural']
  },
  {
    id: 'farm-6',
    name: 'Mabalacat Aquaculture',
    logo: communityCatchLogo,
    heroImage: mabalacatHero,
    location: 'Mabalacat, Pampanga',
    rating: 4.5,
    harvestInfo: 'Harvest: Today',
    deliveryFee: 50,
    description: 'Farm-raised catfish for authentic Filipino dishes.',
    specialties: ['Hito', 'Catfish'],
    established: '2019',
    certifications: ['Farm Fresh', 'Quality Standards']
  },
  {
    id: 'farm-7',
    name: 'Sasmuan Shellfish Farm',
    logo: masantolLogo,
    heroImage: sasmuanHero,
    location: 'Sasmuan, Pampanga',
    rating: 4.3,
    harvestInfo: 'Harvest: Today',
    deliveryFee: 45,
    description: 'Sweet and tender freshwater clams.',
    specialties: ['Tulya', 'Freshwater Clams'],
    established: '2014',
    certifications: ['Shellfish Safe', 'Fresh Daily']
  }
];