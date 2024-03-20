import './App.css';
import Navbar from './components/Navbar/Navbar';
import ToDoApp from './components/To-Do-App/ToDoApp'

function App() {
  return (
    <>
      <div className="page">
        <Navbar />
        <main className="main">
          <ToDoApp />
        </main>
      </div>
    </>
  );
}

export default App;