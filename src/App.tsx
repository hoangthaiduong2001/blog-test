import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogsPage from "./pages/Blog";
import BlogDetailPage from "./pages/BlogDetailPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
