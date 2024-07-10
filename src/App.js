import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/homepage";
import Stories from "./pages/Stories/stories";
import Poems from "./pages/Poems/poems";
import SinglePoem from "./pages/Poems/Poem/poem";
import SingleStory from "./pages/Stories/Story/story";
import SingleEssay from "./pages/Essays/Essay/Essay";
import SingleNote from "./pages/Notes/Note/note";
import SingleQuote from "./pages/Quotes/Quote/Quote";
import SingleOther from "./pages/Others/Other/other";
import Others from "./pages/Others/Others";
import Quotes from "./pages/Quotes/Quotes";
import Notes from "./pages/Notes/notes";
import Essays from "./pages/Essays/Essays";
import Login from "./pages/Login/Login";
import Editor from "./pages/Editor/editor";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import EditorMemoir from "./pages/Editor/memoir/memoir";
import EditorNotes from "./pages/Editor/notes/notes";
import EditorOthers from "./pages/Editor/others/others";
import EditorPoems from "./pages/Editor/poems/poems";
import EditorQuotes from "./pages/Editor/quotes/quotes";
import EditorStory from "./pages/Editor/story/story";
import PoemEdit from "./pages/Editor/poems/singlePoem";
import StoryEdit from "./pages/Editor/story/singleStory";
import MemoirEdit from "./pages/Editor/memoir/singleMemoir";
import NoteEdit from "./pages/Editor/notes/singleNote";
import QuoteEdit from "./pages/Editor/quotes/singleQuote";
import OtherEdit from "./pages/Editor/others/singleOther";
import Create from "./pages/Editor/Create";
import DraftPoem from "./pages/Editor/poems/DraftPoem";
import DraftStory from "./pages/Editor/story/DraftStory";
import DraftMemoir from "./pages/Editor/memoir/DraftMemoir";
import DraftNote from "./pages/Editor/notes/DraftNote";
import DraftQuote from "./pages/Editor/quotes/DraftQuote";
import DraftOther from "./pages/Editor/others/DraftOther";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/editor">
            <Route exact path="" element={<Editor />} />
            <Route exact path="/editor/poems" element={<EditorPoems />} />
            <Route exact path="/editor/poems/draft/:draft" element={<DraftPoem />} />
            <Route exact path="/editor/poems/:name" element={<PoemEdit />} />
            <Route exact path="/editor/stories" element={<EditorStory />} />
            <Route exact path="/editor/stories/draft/:draft" element={<DraftStory />} />
            <Route exact path="/editor/stories/:name" element={<StoryEdit />} />
            <Route exact path="/editor/memoirs" element={<EditorMemoir />} />
            <Route exact path="/editor/memoirs/draft/:draft" element={<DraftMemoir />} />
            <Route
              exact
              path="/editor/memoirs/:name"
              element={<MemoirEdit />}
            />
            <Route exact path="/editor/notes" element={<EditorNotes />} />
            <Route exact path="/editor/notes/draft/:draft" element={<DraftNote />} />
            <Route exact path="/editor/notes/:name" element={<NoteEdit />} />
            <Route exact path="/editor/quotes" element={<EditorQuotes />} />
            <Route exact path="/editor/quotes/draft/:draft" element={<DraftQuote/>} />
            <Route exact path="/editor/quotes/:name" element={<QuoteEdit />} />
            <Route exact path="/editor/others" element={<EditorOthers />} />
            <Route exact path="/editor/others/draft/:draft" element={<DraftOther />} />
            <Route exact path="/editor/others/:name" element={<OtherEdit />} />
            <Route exact path="/editor/create-new" element={<Create />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Homepage />}>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/stories">
              <Route exact path="" element={<Stories />} />
              <Route exact path="/stories/:story" element={<SingleStory />} />
            </Route>
            <Route exact path="/memoirs">
              <Route exact path="" element={<Essays />} />
              <Route exact path="/memoirs/:memoir" element={<SingleEssay />} />
            </Route>
            <Route exact path="/notes">
              <Route exact path="" element={<Notes />} />
              <Route exact path="/notes/:note" element={<SingleNote />} />
            </Route>
            <Route exact path="/quotes">
              <Route exact path="" element={<Quotes />} />
              <Route exact path="/quotes/:quote" element={<SingleQuote />} />
            </Route>
            <Route exact path="/others">
              <Route exact path="" element={<Others />} />
              <Route exact path="/others/:other" element={<SingleOther />} />
            </Route>
            <Route exact path="/poems">
              <Route exact path="" element={<Poems />}></Route>
              <Route exact path="/poems/:poem" element={<SinglePoem />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
