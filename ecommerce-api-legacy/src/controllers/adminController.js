class AdminController {
  constructor(reportService, db) { this.reportService = reportService; this.db = db; }
  report(_req, res) { this.reportService.getReport((error, report) => error ? res.status(500).json({ error: 'Erro no banco de dados' }) : res.json(report)); }
  deleteUser(req, res) {
    this.db.run('DELETE FROM users WHERE id=?', [req.params.id], function(error) {
      if (error) return res.status(500).json({ error: 'Erro no banco de dados' });
      if (!this.changes) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
  }
}
module.exports = AdminController;
