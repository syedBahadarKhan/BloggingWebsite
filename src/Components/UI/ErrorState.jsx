export default function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <span className="text-red-500 text-xl">!</span>
      </div>
      <p className="text-gray-900 font-medium">We couldn't load this content</p>
      <p className="text-gray-500 text-sm mt-2 max-w-md">{message}</p>
    </div>
  );
}
