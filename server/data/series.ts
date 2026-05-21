export type Series = {
  id: number;
  title: string;
  genre: string;
  seasons: number;
  description: string;
  imageUrl: string;
};

// Hårdkodad lista med serier (8 av mina favoriter)
export let seriesList: Series[] = [
  {
    id: 1,
    title: "Breaking Bad",
    genre: "Crime",
    seasons: 5,
    description: "A chemistry teacher turns to crime.",
    imageUrl: "http://localhost:3001/uploads/breakingbad.jpg",
  },
  {
    id: 2,
    title: "Stranger Things",
    genre: "Sci-Fi",
    seasons: 4,
    description: "Kids uncover supernatural mysteries.",
    imageUrl: "http://localhost:3001/uploads/strangerthings.png",
  },
  {
  id: 3,
  title: "Dark",
  genre: "Sci-Fi",
  seasons: 3,
  description: "Families uncover a time travel conspiracy.",
  imageUrl: "http://localhost:3001/uploads/dark.png",
},
{
  id: 4,
  title: "Severance",
  genre: "Thriller",
  seasons: 2,
  description: "Employees separate work and personal memories.",
  imageUrl: "http://localhost:3001/uploads/severance.png",
},
{
  id: 5,
  title: "Game of Thrones",
  genre: "Fantasy",
  seasons: 8,
  description: "Noble families battle for the Iron Throne.",
  imageUrl: "http://localhost:3001/uploads/gameofthrones.jpg",
},
{
  id: 6,
  title: "A Knight of the Seven Kingdoms",
  genre: "Fantasy",
  seasons: 1,
  description: "A hedge knight travels through Westeros.",
  imageUrl: "http://localhost:3001/uploads/knightofthesevenkingdoms.png",
},
{
  id: 7,
  title: "From",
  genre: "Horror",
  seasons: 3,
  description: "Residents are trapped in a nightmarish town.",
  imageUrl: "http://localhost:3001/uploads/from.png",
},
{
  id: 8,
  title: "The Boys",
  genre: "Action",
  seasons: 4,
  description: "Vigilantes fight corrupt superheroes.",
  imageUrl: "http://localhost:3001/uploads/theboys.png"
}
];