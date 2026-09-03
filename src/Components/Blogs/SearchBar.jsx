import { useState, useEffect } from "react";

/**
 * Debounced search input so we don't fire an API call on every keystroke.
 */
export default function SearchBar({ value, onChange, placeholder = "Search posts..." }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setLocalValue(value), 0);
    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      className="w-full sm:w-72 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
