import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import WordCountForm from "./components/WordCountForm";
import InsightsTable from "./components/InsightsTable";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";
function App() {
  return (
   
    <Router>

      <Routes>
        <Route path="/" element={<WordCountForm/>} />
        <Route path="/table" element={<InsightsTable/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  
  );
}

export default App;
