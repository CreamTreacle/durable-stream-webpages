import { useEffect, useState } from "react";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import { BLOG_PATH, getCurrentAppPath, PRICING_PATH } from "./utils/navigation";

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
      currentPath === PRICING_PATH ? "Pricing | Long Code" : currentPath === BLOG_PATH ? "Blog | Long Code" : "Long Code";
  }, [currentPath]);

  return (
    <div className="page-shell">
      {currentPath === PRICING_PATH ? <PricingPage /> : currentPath === BLOG_PATH ? <BlogPage /> : <HomePage />}
    </div>
  );
}

export default App;
