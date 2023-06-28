import { BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import RoutesConfig from './routes';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
