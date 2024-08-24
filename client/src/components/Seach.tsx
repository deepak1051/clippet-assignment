interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search cards"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 p-2 border rounded"
    />
  );
};

export default Search;
