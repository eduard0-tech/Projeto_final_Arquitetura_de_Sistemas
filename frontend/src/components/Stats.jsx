function Stats({ stats }) {
  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-icon">📋</div>

        <div>
          <h3>Total</h3>
          <p>{stats.total || 0}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon success">✅</div>

        <div>
          <h3>Concluídas</h3>
          <p className="success-text">
            {stats.concluidas || 0}
          </p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon warning">⏰</div>

        <div>
          <h3>Pendentes</h3>
          <p className="warning-text">
            {stats.pendentes || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;