import {
  BrowserRouter as Router,
  Routes, // Switch (v5) -> Routes (v6)
  Route
} from "react-router-dom";
import MyBucketList from "./pages/MyBucketList";

function App() {
  return (<Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<MyBucketList />} />
    </Routes>
  </Router>);
}

export default App;