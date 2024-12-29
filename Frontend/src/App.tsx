import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotesPage } from "./components/NotesPage";
import { AuthLayout } from "./components/AuthLayout";   
import { PrivateRoute } from "./components/PrivateRoute";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/signup" element={<AuthLayout />} />
        <Route
          path="/notes"
          element={<PrivateRoute element={<NotesPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
