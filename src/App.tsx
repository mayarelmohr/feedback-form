import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FeedbackForm from "pages/Home";
import Results from "pages/Results";
import Header from "components/Header";
import { FeedbackListProvider } from "store/context/feedbackProvider";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <FeedbackListProvider>
          <Routes>
            <Route path="/" element={<FeedbackForm />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </FeedbackListProvider>
      </main>
    </Router>
  );
}

export default App;
