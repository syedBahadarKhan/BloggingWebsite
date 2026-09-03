export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} TheBlog. Built with React &amp; Contentful.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="/blog" className="hover:text-gray-900">Blog</a>
          <a href="/" className="hover:text-gray-900">Home</a>
        </div>
      </div>
    </footer>
  );
}
