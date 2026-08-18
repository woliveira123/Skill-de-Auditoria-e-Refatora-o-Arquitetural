"""Application service for task use cases, independent from HTTP routes."""
from database import db
from models.task import Task


class TaskService:
    @staticmethod
    def get(task_id):
        return db.session.get(Task, task_id)

    @staticmethod
    def create(values):
        task = Task(**values)
        db.session.add(task)
        db.session.commit()
        return task

    @staticmethod
    def update(task, values):
        for field, value in values.items():
            setattr(task, field, value)
        db.session.commit()
        return task

    @staticmethod
    def delete(task):
        db.session.delete(task)
        db.session.commit()
