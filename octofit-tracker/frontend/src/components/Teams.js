import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching from:', apiUrl);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const teamsData = data.results || data;
        setTeams(teamsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) => {
    const text = `${team.name || ''} ${team.description || ''}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const openModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  if (loading) return <div className="container py-5">Loading...</div>;
  if (error) return <div className="container py-5 text-danger">Error: {error}</div>;

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
            <div>
              <h1 className="h3 mb-2">Teams</h1>
              <p className="text-muted mb-0">Explore teams from the backend API.</p>
            </div>
            <form className="d-flex align-items-center">
              <input
                type="search"
                className="form-control"
                placeholder="Search teams"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </form>
          </div>

          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <tr key={team.id || index}>
                  <td>{index + 1}</td>
                  <td>{team.name || 'N/A'}</td>
                  <td>{team.members || team.member_count || 'N/A'}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => openModal(team)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedTeam && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(selectedTeam, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default Teams;