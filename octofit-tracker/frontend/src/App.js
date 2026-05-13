import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <main className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="lead">Browse activities, teams, workouts, users, and leaderboard data from the Django REST API.</p>
          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link className="btn btn-primary" to="/activities">Activities</Link>
            <Link className="btn btn-primary" to="/leaderboard">Leaderboard</Link>
            <Link className="btn btn-primary" to="/teams">Teams</Link>
            <Link className="btn btn-primary" to="/users">Users</Link>
            <Link className="btn btn-primary" to="/workouts">Workouts</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
