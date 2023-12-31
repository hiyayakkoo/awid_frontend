export type Game = {
  name: string
  image: string
  contract: string
  descriptions?: string
  url?: string
}

export const games: Game[] = [
  {
    name: 'Sushi Master VS',
    image: 'sushi-master-vs.png',
    contract: '0xf23c27e808657b93adf5de2368de0f601bafc6e0',
    url: 'https://main--funny-piroshki-655759.netlify.app/'
  },
  {
    name: 'dark forest',
    image: 'dark-forest.png',
    contract: ''
  },
  {
    name: 'OPCraft',
    image: 'opcraft.png',
    contract: ''
  },
  {
    name: 'Influence',
    image: 'influence.jpg',
    contract: ''
  },
  {
    name: 'MuMu',
    image: 'mumu.png',
    contract: ''
  },
  {
    name: 'PFP WAR',
    image: 'pfp-war.png',
    contract: ''
  },
  {
    name: 'Autonomous Game of Life',
    image: 'autonomous-game-of-life.png',
    contract: ''
  },
  {
    name: 'Trade Wars',
    image: 'trade-wars.png',
    contract: ''
  },
  {
    name: 'Coin Race',
    image: 'coin-race.jpeg',
    contract: ''
  },
  {
    name: 'Garnet',
    image: 'garnet.png',
    contract: ''
  },
  {
    name: 'Isle of Colors',
    image: 'isle.png',
    contract: ''
  },
  {
    name: 'Realm of Pepe',
    image: 'realm-of-pepe.png',
    contract: ''
  }
]
