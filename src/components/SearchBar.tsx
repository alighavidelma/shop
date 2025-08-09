interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="جستجو ..."
      className="border p-2 rounded w-1/3"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
