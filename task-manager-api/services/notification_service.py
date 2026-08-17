import smtplib
from datetime import datetime
from flask import current_app

class NotificationService:
    def __init__(self):
        self.notifications = []

    def send_email(self, to, subject, body):
        try:

            host = current_app.config.get('SMTP_HOST')
            user = current_app.config.get('SMTP_USER')
            password = current_app.config.get('SMTP_PASSWORD')
            if not all((host, user, password)):
                raise RuntimeError('SMTP is not configured')
            server = smtplib.SMTP(host, current_app.config['SMTP_PORT'])
            server.starttls()
            server.login(user, password)
            message = f"Subject: {subject}\n\n{body}"
            server.sendmail(self.email_user, to, message)
            server.quit()
            print(f"Email enviado para {to}")
            return True
        except Exception as e:
            print(f"Erro ao enviar email: {str(e)}")
            return False

    def notify_task_assigned(self, user, task):
        subject = f"Nova task atribuída: {task.title}"
        body = f"Olá {user.name},\n\nA task '{task.title}' foi atribuída a você.\n\nPrioridade: {task.priority}\nStatus: {task.status}"
        self.send_email(user.email, subject, body)
        self.notifications.append({
            'type': 'task_assigned',
            'user_id': user.id,
            'task_id': task.id,
            'timestamp': datetime.utcnow()
        })

    def notify_task_overdue(self, user, task):
        subject = f"Task atrasada: {task.title}"
        body = f"Olá {user.name},\n\nA task '{task.title}' está atrasada!\n\nData limite: {task.due_date}"
        self.send_email(user.email, subject, body)

    def get_notifications(self, user_id):
        result = []
        for n in self.notifications:
            if n['user_id'] == user_id:
                result.append(n)
        return result
