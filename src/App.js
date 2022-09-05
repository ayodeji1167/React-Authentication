import Registration from "./Components/Registration";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Book from "./Components/Book";
import Layout from "./Components/Layout";
import Unauthorized from './Components/Unauthorized'
import Linkpage from './Components/Linkpage';
import Admin from './Components/Admin';
import Editor from './Components/Editor';
import Home from './Components/Home';
import Missing from './Components/Missing';
import RequireAuth from "./Components/RequireAuth";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* {Public routes} */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="linkpage" element={<Linkpage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        
        {/* {Private routes} */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="editor" element={<Editor />} />
          <Route path="/" element={<Home />} />
          <Route path="book" element={<Book />} />
        </Route>
        {/* {Catch all} */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
