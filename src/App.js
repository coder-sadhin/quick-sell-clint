import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './Route/Routes';

function App() {
  return (
    <div className='bg-slate-100'>
      <div className='max-w-[1440px] mx-auto'>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
