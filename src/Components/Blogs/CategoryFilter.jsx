export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-56 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="">All Categories</option>
      {categories?.map((cat) => (
        <option key={cat.sys.id} value={cat.fields.slug}>
          {cat.fields.title}
        </option>
      ))}
    </select>
  );
}
