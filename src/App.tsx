import { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import type { Character, ApiResponse } from './types/character';
import useDebounce from './hooks/useDebounce';
import './index.css'

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const allCharacters: Character[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data: ApiResponse = await res.json();

        allCharacters.push(...data.results);

        if (!data.info?.next) {
          hasMore = false;
        }
        page++;
      }

      setCharacters(allCharacters);
      setLoading(false);
    };

    fetchAllCharacters();
  }, []);

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-2xl">Loading characters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Rick and Morty
          </h1>
          <p className="text-gray-400 text-lg">
            Explore {characters.length} characters from the multiverse
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center text-gray-400 text-xl mt-16">
            <p className="text-4xl mb-4"></p>
            <p>No characters found for "{debouncedSearch}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;