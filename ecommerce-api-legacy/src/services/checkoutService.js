class CheckoutService {
  constructor(db) { this.db = db; }
  checkout(data, done) {
    const { usr: name, eml: email, pwd: password, c_id: courseId, card } = data;
    if (!name || !email || !courseId || !card) return done({ status: 400, message: 'Dados de checkout inválidos' });
    const database = this.db;
    database.get('SELECT * FROM courses WHERE id=? AND active=1', [courseId], (err, course) => {
      if (err || !course) return done({ status: 404, message: 'Curso não encontrado' });
      this.db.get('SELECT id FROM users WHERE email=?', [email], (findErr, user) => {
        if (findErr) return done({ message: 'Erro no banco de dados' });
        const enroll = (userId) => this.db.run('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [userId, courseId], function(enrollErr) {
          if (enrollErr) return done({ message: 'Erro ao matricular usuário' });
          const enrollmentId = this.lastID;
          database.run('INSERT INTO payments (enrollment_id, amount, status) VALUES (?, ?, ?)', [enrollmentId, course.price, 'PAID'], (paymentErr) => paymentErr ? done({ message: 'Erro ao registrar pagamento' }) : done(null, { msg: 'Sucesso', enrollment_id: enrollmentId }));
        });
        if (user) return enroll(user.id);
        this.db.run('INSERT INTO users (name, email, pass) VALUES (?, ?, ?)', [name, email, password], function(createErr) { if (createErr) return done({ message: 'Erro ao criar usuário' }); enroll(this.lastID); });
      });
    });
  }
}
module.exports = CheckoutService;
