interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default ({ value, onChange }: FilterBarProps) => {
  return (
    <select
      className="border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">همه دسته‌ها</option>
      <option value="electronics">الکترونیک</option>
      <option value="fashion">مد و پوشاک</option>
      <option value="home">خانه</option>
      <option value="sports">ورزشی</option>
    </select>
  );
};
