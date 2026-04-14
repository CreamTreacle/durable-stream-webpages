import { useEffect, useState } from "react";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import { BLOG_GHOST_PATH, BLOG_PATH, getCurrentAppPath, PRICING_PATH } from "./utils/navigation";

function App() {
  const [currentPath, setCurrentPath] = useState(() => getCurrentAppPath());

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getCurrentAppPath());
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    document.title =
      currentPath === PRICING_PATH
        ? "Pricing | Long Code"
        : currentPath === BLOG_PATH
          ? "Blog | Long Code"
          : currentPath === BLOG_GHOST_PATH
            ? "Ghost Outside the Shell | Long Code"
            : "Long Code";
  }, [currentPath]);

  return (
    <div className="page-shell">
      {currentPath === PRICING_PATH ? (
        <PricingPage />
      ) : currentPath === BLOG_PATH ? (
        <BlogPage />
      ) : currentPath === BLOG_GHOST_PATH ? (
        <BlogPostPage />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;
