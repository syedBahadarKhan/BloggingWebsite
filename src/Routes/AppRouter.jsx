import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layouts/Layout";
import Home from "../pages/Home";
import BlogListing from "../pages/BlogListing";
import BlogPost from "../pages/BlogPost";
import CategoryPage from "../pages/CategoryPage";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
