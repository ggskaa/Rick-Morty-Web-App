import { type Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  const statusColor =
    character.status === 'Alive' ? 'bg-green-500' :
    character.status === 'Dead' ? 'bg-red-500' :
    'bg-gray-500';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border border-gray-700/50">
      <div className="relative">
        <img
          src={character.image} 
          alt={character.name}
          className="w-full h-64 object-cover"
        />
        <div className={`absolute top-4 right-4 ${statusColor} w-3 h-3 rounded-full animate-pulse`}></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white">{character.name}</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <span className={`${statusColor} w-2 h-2 rounded-full`}></span>
          <span>{character.status} - {character.species}</span>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;