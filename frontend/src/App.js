import { BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RoutesConfig from './routes';
import SmallNav from './components/SmallNav';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
