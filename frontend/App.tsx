import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first" element={<FirstPage />} />
      </Routes>
    </BrowserRouter>
  )
}