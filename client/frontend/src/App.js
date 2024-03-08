import Header from './components/header';
import './App.css';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="main-container">
          <Header />
      <div className="main-content">
        <div id="about-me">
          <AboutMe />
        </div>
        <div id="my-projects">
          <Projects />
        </div>
        <div id="contact-me">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
