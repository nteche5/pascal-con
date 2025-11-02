// Project data - in a real app, this would come from an API or database
export const projectsData = [
  {
    id: 1,
    title: 'Commercial Complex',
    category: 'Commercial',
    description: 'A state-of-the-art commercial complex featuring modern architecture and sustainable design principles.',
    fullDescription: 'This impressive commercial complex represents the pinnacle of modern construction and design. Spanning over 50,000 square meters, the project features cutting-edge architectural elements, energy-efficient systems, and sustainable building practices. The complex includes retail spaces, offices, and parking facilities, all designed to provide optimal functionality and aesthetic appeal.',
    location: 'Accra, Ghana',
    year: '2023',
    size: '50,000 sqm',
    status: 'Completed',
    image: '/placeholder-project.jpg',
    features: [
      'Modern architectural design',
      'Energy-efficient systems',
      'Sustainable building materials',
      'Smart building technology',
      'Accessible design standards'
    ]
  },
  {
    id: 2,
    title: 'Residential Development',
    category: 'Residential',
    description: 'A luxury residential development with premium amenities and innovative design solutions.',
    fullDescription: 'This luxury residential development offers an unparalleled living experience with meticulously designed homes that blend modern aesthetics with functional living spaces. The development features state-of-the-art amenities including recreational facilities, landscaped gardens, and comprehensive security systems.',
    location: 'Kumasi, Ghana',
    year: '2023',
    size: '120 Units',
    status: 'Completed',
    image: '/placeholder-project.jpg',
    features: [
      'Luxury finishes',
      'Premium amenities',
      'Landscaped gardens',
      '24/7 security',
      'Recreational facilities'
    ]
  },
  {
    id: 3,
    title: 'Infrastructure Project',
    category: 'Infrastructure',
    description: 'Large-scale infrastructure development project showcasing our engineering expertise.',
    fullDescription: 'This large-scale infrastructure project demonstrates our expertise in complex engineering challenges. The project involved extensive planning, coordination, and execution of critical infrastructure components that serve the community while maintaining the highest standards of safety and durability.',
    location: 'Tema, Ghana',
    year: '2022',
    size: '15 km',
    status: 'Completed',
    image: '/placeholder-project.jpg',
    features: [
      'Advanced engineering solutions',
      'Durable materials',
      'Community-focused design',
      'Safety-first approach',
      'Long-term sustainability'
    ]
  },
  {
    id: 4,
    title: 'Office Building',
    category: 'Commercial',
    description: 'Modern office building designed for efficiency and sustainability.',
    fullDescription: 'A contemporary office building designed to maximize productivity and minimize environmental impact. The building features flexible workspaces, advanced HVAC systems, and sustainable design elements that create an optimal working environment.',
    location: 'Accra, Ghana',
    year: '2024',
    size: '25,000 sqm',
    status: 'In Progress',
    image: '/placeholder-project.jpg',
    features: [
      'Flexible workspace design',
      'Energy-efficient systems',
      'Sustainable materials',
      'Modern amenities',
      'Premium location'
    ]
  },
  {
    id: 5,
    title: 'Mixed-Use Development',
    category: 'Mixed-Use',
    description: 'Comprehensive mixed-use development combining residential, commercial, and retail spaces.',
    fullDescription: 'This comprehensive mixed-use development seamlessly integrates residential, commercial, and retail spaces in a single, cohesive design. The project creates a vibrant community hub that serves residents and visitors alike.',
    location: 'Tamale, Ghana',
    year: '2024',
    size: '80,000 sqm',
    status: 'In Progress',
    image: '/placeholder-project.jpg',
    features: [
      'Integrated design',
      'Multiple use zones',
      'Community spaces',
      'Sustainable planning',
      'Modern infrastructure'
    ]
  },
  {
    id: 6,
    title: 'Industrial Facility',
    category: 'Industrial',
    description: 'State-of-the-art industrial facility built to the highest standards of quality and safety.',
    fullDescription: 'A cutting-edge industrial facility designed to meet the demands of modern manufacturing and logistics. The facility incorporates advanced safety systems, efficient workflow design, and sustainable operational practices.',
    location: 'Tema, Ghana',
    year: '2023',
    size: '30,000 sqm',
    status: 'Completed',
    image: '/placeholder-project.jpg',
    features: [
      'Advanced safety systems',
      'Efficient workflow design',
      'Sustainable operations',
      'Modern equipment',
      'Regulatory compliance'
    ]
  }
]

export function getProjectById(id: number | string) {
  const projectId = typeof id === 'string' ? parseInt(id, 10) : id
  return projectsData.find(project => project.id === projectId)
}

export function getAllProjects() {
  return projectsData
}

