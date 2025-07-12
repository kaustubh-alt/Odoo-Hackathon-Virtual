import { 
  USER_ROLES, 
  ITEM_CATEGORIES, 
  ITEM_TYPES, 
  ITEM_SIZES, 
  ITEM_CONDITIONS, 
  SWAP_STATUS, 
  ITEM_STATUS 
} from '../types';

// Mock Users
export const mockUsers = [
  {
    id: '1',
    email: 'priya@example.com',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    points: 150,
    role: USER_ROLES.USER,
    joinDate: '2024-01-15',
    itemsCount: 5,
    swapsCompleted: 3
  },
  {
    id: '2',
    email: 'anjali@example.com',
    name: 'Anjali Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    points: 280,
    role: USER_ROLES.USER,
    joinDate: '2024-02-01',
    itemsCount: 8,
    swapsCompleted: 6
  },
  {
    id: '3',
    email: 'admin@rewear.com',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    points: 0,
    role: USER_ROLES.ADMIN,
    joinDate: '2024-01-01',
    itemsCount: 0,
    swapsCompleted: 0
  }
];

// Mock Items
export const mockItems = [
  {
    id: '1',
    title: 'Traditional Silk Saree',
    description: 'Beautiful handcrafted silk saree with intricate zari work. Perfect for special occasions and festivals.',
    category: ITEM_CATEGORIES.DRESSES,
    type: ITEM_TYPES.FORMAL,
    size: ITEM_SIZES.M,
    condition: ITEM_CONDITIONS.LIKE_NEW,
    tags: ['saree', 'silk', 'traditional', 'zari', 'festival'],
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=right'
    ],
    pointsValue: 120,
    uploaderId: '1',
    uploaderName: 'Priya Sharma',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.AVAILABLE,
    uploadDate: '2024-03-15',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '2',
    title: 'Embroidered Anarkali Suit',
    description: 'Elegant anarkali suit with beautiful embroidery work. Perfect for weddings and celebrations.',
    category: ITEM_CATEGORIES.DRESSES,
    type: ITEM_TYPES.FORMAL,
    size: ITEM_SIZES.S,
    condition: ITEM_CONDITIONS.NEW,
    tags: ['anarkali', 'embroidery', 'wedding', 'traditional', 'celebration'],
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=left'
    ],
    pointsValue: 150,
    uploaderId: '2',
    uploaderName: 'Anjali Patel',
    uploaderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.AVAILABLE,
    uploadDate: '2024-03-10',
    location: 'Delhi, NCR'
  },
  {
    id: '3',
    title: 'Handcrafted Jutti Sandals',
    description: 'Traditional Indian jutti sandals with beautiful embroidery. Comfortable and stylish for ethnic wear.',
    category: ITEM_CATEGORIES.SHOES,
    type: ITEM_TYPES.FORMAL,
    size: ITEM_SIZES.M,
    condition: ITEM_CONDITIONS.LIKE_NEW,
    tags: ['jutti', 'traditional', 'embroidery', 'ethnic', 'sandals'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=right'
    ],
    pointsValue: 85,
    uploaderId: '1',
    uploaderName: 'Priya Sharma',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.AVAILABLE,
    uploadDate: '2024-03-12',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '4',
    title: 'Embroidered Potli Bag',
    description: 'Traditional Indian potli bag with beautiful mirror work and embroidery. Perfect for ethnic occasions.',
    category: ITEM_CATEGORIES.ACCESSORIES,
    type: ITEM_TYPES.FORMAL,
    size: 'One Size',
    condition: ITEM_CONDITIONS.LIKE_NEW,
    tags: ['potli', 'embroidery', 'mirror-work', 'traditional', 'ethnic'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=right'
    ],
    pointsValue: 65,
    uploaderId: '2',
    uploaderName: 'Anjali Patel',
    uploaderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.AVAILABLE,
    uploadDate: '2024-03-08',
    location: 'Delhi, NCR'
  },
  {
    id: '5',
    title: 'Embroidered Kurta',
    description: 'Elegant cotton kurta with beautiful hand embroidery. Perfect for casual and semi-formal occasions.',
    category: ITEM_CATEGORIES.TOPS,
    type: ITEM_TYPES.CASUAL,
    size: ITEM_SIZES.M,
    condition: ITEM_CONDITIONS.GOOD,
    tags: ['kurta', 'embroidery', 'cotton', 'ethnic', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=bottom'
    ],
    pointsValue: 75,
    uploaderId: '1',
    uploaderName: 'Priya Sharma',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.AVAILABLE,
    uploadDate: '2024-03-14',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '6',
    title: 'Embroidered Palazzo Pants',
    description: 'Stylish palazzo pants with beautiful embroidery work. Comfortable and elegant for ethnic wear.',
    category: ITEM_CATEGORIES.BOTTOMS,
    type: ITEM_TYPES.FORMAL,
    size: ITEM_SIZES.S,
    condition: ITEM_CONDITIONS.LIKE_NEW,
    tags: ['palazzo', 'embroidery', 'ethnic', 'comfortable', 'elegant'],
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=left',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=right'
    ],
    pointsValue: 95,
    uploaderId: '2',
    uploaderName: 'Anjali Patel',
    uploaderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.AVAILABLE,
    uploadDate: '2024-03-11',
    location: 'Delhi, NCR'
  },
  {
    id: '7',
    title: 'Traditional Bandhani Dupatta',
    description: 'Beautiful bandhani dupatta with traditional tie-dye patterns. Perfect for completing ethnic looks.',
    category: ITEM_CATEGORIES.ACCESSORIES,
    type: ITEM_TYPES.FORMAL,
    size: 'One Size',
    condition: ITEM_CONDITIONS.GOOD,
    tags: ['bandhani', 'dupatta', 'tie-dye', 'traditional', 'ethnic'],
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=right'
    ],
    pointsValue: 55,
    uploaderId: '1',
    uploaderName: 'Priya Sharma',
    uploaderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.PENDING_APPROVAL,
    uploadDate: '2024-03-17',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '8',
    title: 'Embroidered Choli Blouse',
    description: 'Traditional choli blouse with intricate embroidery work. Perfect for pairing with sarees.',
    category: ITEM_CATEGORIES.TOPS,
    type: ITEM_TYPES.FORMAL,
    size: ITEM_SIZES.S,
    condition: ITEM_CONDITIONS.LIKE_NEW,
    tags: ['choli', 'blouse', 'embroidery', 'traditional', 'saree'],
    images: [
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=bottom'
    ],
    pointsValue: 90,
    uploaderId: '2',
    uploaderName: 'Anjali Patel',
    uploaderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: ITEM_STATUS.PENDING_APPROVAL,
    uploadDate: '2024-03-16',
    location: 'Delhi, NCR'
  }
];

// Mock Swaps
export const mockSwaps = [
  {
    id: '1',
    requesterId: '2',
    requesterName: 'Anjali Patel',
    requesterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    itemId: '1',
    itemTitle: 'Traditional Silk Saree',
    itemImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop',
    ownerId: '1',
    ownerName: 'Priya Sharma',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: SWAP_STATUS.PENDING,
    requestDate: '2024-03-16',
    message: 'This saree is absolutely beautiful! Would you be interested in swapping for my anarkali suit?'
  },
  {
    id: '2',
    requesterId: '1',
    requesterName: 'Priya Sharma',
    requesterAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    itemId: '2',
    itemTitle: 'Embroidered Anarkali Suit',
    itemImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop&crop=center',
    ownerId: '2',
    ownerName: 'Anjali Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: SWAP_STATUS.ACCEPTED,
    requestDate: '2024-03-15',
    message: 'I love this anarkali suit! Would you like to swap for my silk saree?'
  },
  {
    id: '3',
    requesterId: '2',
    requesterName: 'Anjali Patel',
    requesterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    itemId: '3',
    itemTitle: 'Handcrafted Jutti Sandals',
    itemImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    ownerId: '1',
    ownerName: 'Priya Sharma',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: SWAP_STATUS.COMPLETED,
    requestDate: '2024-03-10',
    message: 'These juttis are perfect for my ethnic collection!'
  }
];

// Featured Items for Landing Page
export const featuredItems = mockItems.slice(0, 4);

// Categories for filtering
export const categories = Object.values(ITEM_CATEGORIES);
export const types = Object.values(ITEM_TYPES);
export const sizes = Object.values(ITEM_SIZES);
export const conditions = Object.values(ITEM_CONDITIONS); 