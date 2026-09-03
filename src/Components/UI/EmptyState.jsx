export default function EmptyState({
  title = "Nothing here yet",
  message = "Check back soon for new content.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <span className="text-gray-400 text-xl">□</span>
      </div>
      <p className="text-gray-900 font-medium">{title}</p>
      <p className="text-gray-500 text-sm mt-2 max-w-md">{message}</p>
    </div>
  );
}
