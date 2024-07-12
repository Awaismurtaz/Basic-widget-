import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Jobs from './components/pages/Jobs';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAcv5iO_kbpqe_qe3qAgX1uGqtdmwPRPF8",
  authDomain: "widget-fa6dd.firebaseapp.com",
  projectId: "widget-fa6dd",
  storageBucket: "widget-fa6dd.appspot.com",
  messagingSenderId: "928719126986",
  appId: "1:928719126986:web:fde59c7bd99a3801f00f33",
  measurementId: "G-S1CL2B6HH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Jobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);