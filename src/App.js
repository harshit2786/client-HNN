import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Home/homepage';
import Stories from './pages/Stories/stories';
import Poems from './pages/Poems/poems';
import SinglePoem from './pages/Poems/Poem/poem';
import SingleStory from './pages/Stories/Story/story';
import SingleEssay from './pages/Essays/Essay/Essay';
import SingleNote from './pages/Notes/Note/note';
import SingleQuote from './pages/Quotes/Quote/Quote';
import SingleOther from './pages/Others/Other/other';
import Others from './pages/Others/Others';
import Quotes from './pages/Quotes/Quotes';
import Notes from './pages/Notes/notes';
import Essays from './pages/Essays/Essays';
import Login from './pages/Login/Login';
import Editor from './pages/Editor/editor';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path='/editor' element={<Editor/>}>
          
        </Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/' element={<Homepage/>}>
          <Route exact path='' element={<Poems/>}></Route>
          <Route exact path='/stories'>
            <Route exact path="" element={<Stories/>} />
            <Route exact path='/stories/:story' element={<SingleStory/>} />
          </Route>
          <Route exact path='/essays'>
            <Route exact path="" element={<Essays/>} />
            <Route exact path='/essays/:essay' element={<SingleEssay/>} />
          </Route>
          <Route exact path='/notes'>
            <Route exact path="" element={<Notes/>} />
            <Route exact path='/notes/:note' element={<SingleNote/>} />
          </Route>
          <Route exact path='/quotes'>
            <Route exact path="" element={<Quotes/>} />
            <Route exact path='/quotes/:quote' element={<SingleQuote/>} />
          </Route>
          <Route exact path='/others'>
            <Route exact path="" element={<Others/>} />
            <Route exact path='/others/:other' element={<SingleOther/>} />
          </Route>
          <Route exact path='/poems'>
            <Route exact path='' element={<Poems/>}></Route>
            <Route exact path='/poems/:poem' element={<SinglePoem/>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
