import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { GroupPage } from './pages/GroupPage/GroupPage';
import { CreateGroup } from './pages/CreateGroup/CreateGroup';
import { CreateStudent } from './pages/CreateStudent/CreateStudent';
import { CreateMark } from './pages/CreateMark/CreateMark';
import { MarkPage } from './pages/MarkPage/MarkPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/groups/:groupId' element={<GroupPage />} />
        <Route path='/marks/:markId' element={<MarkPage />} />
        <Route path='/create/group' element={<CreateGroup />} />
        <Route path='/create/student' element={<CreateStudent />} />
        <Route path='/create/mark' element={<CreateMark />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
