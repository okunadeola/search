
import {Routes, Route} from 'react-router-dom'

import Details from './page/Details';
import GithubSearch from './page/GithubSearch';


function App() {

  return (

    <Routes>
      <Route path='' element={<GithubSearch/>}/>
      <Route path='/details/:username' element={<Details/>}/>

    </Routes>

  
  );
}

export default App;
