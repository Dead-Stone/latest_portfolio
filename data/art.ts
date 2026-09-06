export interface ArtPiece {
  id: number
  title: string
  description: string
  image: string
  negativeImage?: string
  category: string
  year: string
  imgW: number
  imgH: number
  hasNegative?: boolean
  movie?: string
  sequence?: string[]
  sequenceIntervalMs?: number
}

export const artPieces: ArtPiece[] = [
  {
    id: 0,
    title: 'Jim Carrey',
    description: 'Jim Carrey as The Mask is pure chaos in the best way possible. That green face, those wild expressions, the way he could stretch reality itself with just a look. But honestly, what really got me was The Truman Show. That movie hit me in a way I still can\'t fully explain. Watching Truman discover his entire life was a lie, seeing him break free from that perfect little world, it made me think about my own reality in ways no other movie has.',
    image: '/art/c1.png',
    category: 'Animation',
    year: '2024',
    imgW: 280, imgH: 280,
    hasNegative: false,
    sequence: ['/art/c1.png','/art/c2.png','/art/c3.png','/art/c4.png','/art/c5.png','/art/c6.png','/art/c7.png','/art/c8.png','/art/c9.png'],
    sequenceIntervalMs: 250,
  },
  {
    id: 1,
    title: 'Jack Nicholson',
    description: 'Nicholson\'s Joker was the first I saw: that manic laugh and theatrical chaos made him both terrifying and oddly charming. There\'s a theatricality to him that feels almost Shakespearean. He owns every room he walks into, and the way he delivers chaos with a grin is unlike anything else in the franchise. He set the tone for every Joker that followed.',
    image: '/art/negative-1.png',
    negativeImage: '/art/negative-1.png',
    category: 'Portrait',
    year: '2024',
    imgW: 537, imgH: 816,
    hasNegative: true,
    movie: 'Batman (1989)',
  },
  {
    id: 2,
    title: 'Heath Ledger',
    description: 'Heath Ledger completely redefined what the character could be. His performance was so raw and unsettling that it earned him a well-deserved Oscar, and honestly, it changed how I think about villainy in cinema. The way he made chaos feel like a philosophy rather than just evil: that\'s something no one else has pulled off.',
    image: '/art/negative-2.png',
    negativeImage: '/art/negative-2.png',
    category: 'Portrait',
    year: '2024',
    imgW: 502, imgH: 748,
    hasNegative: true,
    movie: 'The Dark Knight (2008)',
  },
  {
    id: 3,
    title: 'Joaquin Phoenix',
    description: 'Joaquin Phoenix\'s take hit different. Watching Arthur Fleck\'s descent into madness felt uncomfortably real, like we were witnessing a person break rather than just a villain being born. His heartbreaking vulnerability is what sets him apart: you almost feel sorry for him, which is the most terrifying thing of all.',
    image: '/art/negative-3.png',
    negativeImage: '/art/negative-3.png',
    category: 'Portrait',
    year: '2024',
    imgW: 516, imgH: 740,
    hasNegative: true,
    movie: 'Joker (2019)',
  },
  {
    id: 5,
    title: 'Hisoka',
    description: 'Hisoka from Hunter x Hunter is one of those characters that just gets under your skin in the best way. His twisted charisma, that unsettling smile, the way he treats every fight like a game: he\'s dangerous, unpredictable, and completely unapologetic about who he is.',
    image: '/art/anime-1.png',
    category: 'Anime',
    year: '2024',
    imgW: 475, imgH: 790,
  },
  {
    id: 6,
    title: 'Roronoa Zoro',
    description: 'Zoro from One Piece is the definition of loyalty and determination. This guy will literally die before he breaks a promise. His three-sword style is iconic, but it\'s his unwavering commitment to becoming the world\'s greatest swordsman that really gets me.',
    image: '/art/anime-2.png',
    category: 'Anime',
    year: '2024',
    imgW: 682, imgH: 777,
  },
  {
    id: 7,
    title: 'God Usopp',
    description: 'Usopp is the most relatable character in One Piece. He\'s scared, he lies constantly, he runs away from fights, but when it really matters, he always finds the courage to stand up. His lies becoming reality: that\'s one of the most satisfying arcs in the series.',
    image: '/art/anime-3.png',
    category: 'Anime',
    year: '2024',
    imgW: 553, imgH: 682,
  },
  {
    id: 8,
    title: 'Sheldon Cooper',
    description:
      'Sheldon Cooper dropped into Edvard Munch’s The Scream: graphite portrait on the iconic bridge-and-sky composition, Flash tee and all. Sitcom precision meets expressionist panic.',
    image: '/art/image-1.png',
    category: 'TV · parody',
    year: '2024',
    imgW: 677, imgH: 847,
  },
  {
    id: 10,
    title: 'Phoebe Buffay',
    description: 'Phoebe Buffay with her guitar: soft smile, fringe coat, Smelly Cat energy without saying a word. Charcoal and texture on a quiet ground.',
    image: '/art/image-3.png',
    category: 'TV',
    year: '2024',
    imgW: 512, imgH: 773,
    movie: 'Friends',
  },
  {
    id: 11,
    title: 'Giannis Antetokounmpo',
    description:
      '2021 Finals: #34, the Larry O’Brien and Finals MVP trophies, Champions cap, full grin. Pencil study of one of the most electric celebrations in the league.',
    image: '/art/bb-1.png',
    category: 'Sports',
    year: '2024',
    imgW: 640, imgH: 820,
  },
  {
    id: 12,
    title: 'Air Jordan 1',
    description:
      'Side-profile study of the high-top that defined sneaker culture: Swoosh, wings logo, perforations, and sole shadow grounded on the page. Graphite shading and contrast.',
    image: '/art/image-2.png',
    category: 'Still life',
    year: '2024',
    imgW: 880, imgH: 600,
  },
  {
    id: 13,
    title: 'Joey Tribbiani',
    description:
      'That wide-eyed, mouth-open Friends reaction: charcoal portrait with heavy shadows and sitcom energy frozen in graphite.',
    image: '/art/image-5.png',
    category: 'TV',
    year: '2024',
    imgW: 560, imgH: 700,
    movie: 'Friends',
  },
  {
    id: 14,
    title: 'Sanji: wanted poster',
    description:
      'One Piece “ONLY ALIVE” bounty sheet: lovestruck expression, Beli bounty block, and Marine stamp in ink-wash greyscale.',
    image: '/art/anime-4.png',
    category: 'Anime',
    year: '2024',
    imgW: 720, imgH: 960,
  },
  {
    id: 15,
    title: 'Naruto: four chapters',
    description:
      'Four panels across one life: the swing, the village together, the wedding, and the Seventh Hokage cloak walking into the distance.',
    image: '/art/anime-5.png',
    category: 'Anime',
    year: '2024',
    imgW: 2000, imgH: 560,
  },
  {
    id: 16,
    title: 'Itachi Uchiha',
    description:
      'Akatsuki cloak, straw kasa, and Sharingan picked out in red on charcoal: hand reaching forward, high-contrast Naruto fan piece.',
    image: '/art/anime-6.png',
    category: 'Anime',
    year: '2024',
    imgW: 640, imgH: 880,
  },
  {
    id: 17,
    title: 'Kakashi’s team',
    description:
      'Team 7 plus Sai, Yamato, and a tiny Pakkun: a crowded “family photo” pencil piece with Kakashi center and arms crossed.',
    image: '/art/anime-7.png',
    category: 'Anime',
    year: '2024',
    imgW: 900, imgH: 700,
  },
  {
    id: 18,
    title: 'Team 7, then & now',
    description:
      'Stacked panels: grown Team 7 laughing with Kakashi above, then kid Sasuke, Sakura, and Naruto below the same dynamic.',
    image: '/art/anime-8.png',
    category: 'Anime',
    year: '2024',
    imgW: 720, imgH: 980,
  },
  {
    id: 19,
    title: 'Harley Quinn',
    description:
      'Suicide Squad energy: pigtails, “PUDDIN” choker, bat on the shoulder, piece held together with graphite grit and attitude.',
    image: '/art/image-4.png',
    category: 'Film',
    year: '2024',
    imgW: 700, imgH: 880,
    movie: 'Suicide Squad',
  },
  {
    id: 20,
    title: 'Matthew Perry',
    description:
      'Big laugh, 90s hair, soft sweatshirt folds: charcoal portrait with the pencil still in frame like the drawing just happened.',
    image: '/art/image-6.png',
    category: 'TV',
    year: '2024',
    imgW: 640, imgH: 820,
    movie: 'Friends',
  },
  {
    id: 21,
    title: 'Irrfan Khan',
    description:
      'Open smile and easy posture in pencil: a portrait study of one of the most expressive actors, light on the face and collar.',
    image: '/art/image-7.png',
    category: 'Portrait',
    year: '2024',
    imgW: 640, imgH: 780,
  },
  {
    id: 22,
    title: 'White cat study',
    description:
      'Long-haired cat in profile on black: brushy fur, whiskers, and tail; minimal palette, lots of negative space.',
    image: '/art/negative-4.png',
    negativeImage: '/art/negative-4.png',
    category: 'Animals',
    year: '2024',
    imgW: 720, imgH: 900,
    hasNegative: true,
  },
]

/** Editorial titles based on the visible expressions, not claimed film-scene identifications. */
const jimExpressions = [
  {title:'The Crooked Smirk',description:'One brow drops while the other eye stays wide, and a small smile pulls sideways across the face. The towering sweep of hair amplifies the asymmetry. It is a compact expression: the joke seems to arrive before the mouth has quite admitted it.'},
  {title:'The Open-Mouthed Grin',description:'The mouth opens into a broad, toothy grin and the cheeks lift into deep smile lines. Compared with the tighter faces in this series, this one lets the energy out. Dark marks around the jaw give the bright smile a strong frame.'},
  {title:'Wide-Eyed Shock',description:'Round eyes, lifted eyebrows and a fully dropped jaw make this the series at full volume. The long, dark opening of the mouth contrasts with the bright eyes above it. Everything stretches vertically, as though the face has been caught at the instant of a shout.'},
  {title:'The Worried Grimace',description:'The inner brows rise into a crease while the mouth pulls into an uneven, anxious shape. The eyes stay wide, but the expression is more pleading than explosive. Short lines around the forehead and lips carry the tension.'},
  {title:'The Puckered Scowl',description:'A furrowed brow sits over tightly pursed lips, pulling the whole expression toward the centre of the face. The slanted eyes and hollowed cheeks turn a simple pout into a deliberately exaggerated scowl. Loose hair keeps the silhouette restless.'},
  {title:'A Moment of Composure',description:'The lips close into a faint, uneven smile and the eyes meet the viewer without the extreme stretch of the surrounding studies. This quieter portrait gives the sequence a pause. Small differences between the two brows keep even the calm face from becoming perfectly still.'},
  {title:'The Tight-Eyed Grimace',description:'Both eyes squeeze nearly shut as the brow knots and the mouth tightens. Compressed features replace the wide-open shapes of the louder portraits. Dense shading at the cheeks and jaw makes the expression feel held in rather than released.'},
  {title:'The Downturned Pout',description:'Bulging eyes look out above a dramatically downturned mouth. The tucked chin gathers the lower face into folds, creating a comic contrast between the open stare and the heavy pout. The darkest marks collect around the eyes, nose and curling lip.'},
  {title:'The Furious Shout',description:'Angled eyebrows press down over narrowed eyes while the mouth opens in a teeth-baring shout. Unlike the round-eyed surprise elsewhere in the series, this face is sharply drawn inward at the brow. Spiked hair and deep cheek lines push the expression to its most forceful extreme.'},
]
export const jimCarreyStudies: ArtPiece[] = jimExpressions.map((expression,index)=>({
  ...artPieces[0],id:100+index,title:`Jim Carrey · ${expression.title}`,
  description:expression.description,image:`/art/c${index+1}.png`,category:'Expression study',sequence:undefined,
}))
