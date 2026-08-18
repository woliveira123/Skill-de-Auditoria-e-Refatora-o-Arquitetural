"""Controller boundary for task operations."""
from services.task_service import TaskService


class TaskController:
    def get(self, task_id):
        return TaskService.get(task_id)

    def create(self, values):
        return TaskService.create(values)

    def update(self, task, values):
        return TaskService.update(task, values)

    def delete(self, task):
        TaskService.delete(task)
