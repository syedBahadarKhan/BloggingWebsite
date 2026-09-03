import { Link } from "react-router-dom";
import Button from "../Components/UI/Button";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-blue-600">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Page not found</h1>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-6">
        <Button as={Link} to="/">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
