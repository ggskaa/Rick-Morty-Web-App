interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search characters... (e.g. Rick, Morty)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 rounded-full bg-gray-800/50 backdrop-blur-sm text-white border-2 border-green-500/30 focus:outline-none focus:border-green-500 transition-all placeholder-gray-500 text-lg"
      />
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500"></span>
    </div>
  );
}

export default SearchBar;