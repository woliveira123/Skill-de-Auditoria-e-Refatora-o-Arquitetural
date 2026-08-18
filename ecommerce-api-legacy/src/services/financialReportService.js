class FinancialReportService {
  constructor(db) { this.db = db; }
  getReport(done) {
    const sql = `SELECT c.id, c.title, COALESCE(SUM(CASE WHEN p.status='PAID' THEN p.amount ELSE 0 END),0) revenue,
      u.name student, COALESCE(p.amount,0) paid
      FROM courses c LEFT JOIN enrollments e ON e.course_id=c.id
      LEFT JOIN users u ON u.id=e.user_id LEFT JOIN payments p ON p.enrollment_id=e.id
      GROUP BY c.id, c.title, e.id, u.name, p.amount`;
    this.db.all(sql, [], (error, rows) => {
      if (error) return done(error);
      const byCourse = new Map();
      for (const row of rows) {
        if (!byCourse.has(row.id)) byCourse.set(row.id, { course: row.title, revenue: 0, students: [] });
        const course = byCourse.get(row.id);
        course.revenue += row.revenue;
        if (row.student) course.students.push({ student: row.student, paid: row.paid });
      }
      done(null, [...byCourse.values()]);
    });
  }
}
module.exports = FinancialReportService;
