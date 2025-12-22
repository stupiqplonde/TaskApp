from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate


def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def get_tasks(db: Session, skip: int = 0, limit: int = 100,
              completed: bool = None, category: str = None,
              search: str = None):
    query = db.query(Task)

    if completed is not None:
        query = query.filter(Task.completed == completed)

    if category:
        query = query.filter(Task.category == category)

    if search:
        query = query.filter(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%")
            )
        )

    return query.order_by(Task.priority, Task.created_at.desc()).offset(skip).limit(limit).all()


def create_task(db: Session, task: TaskCreate):
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: int, task_update: TaskUpdate):
    db_task = get_task(db, task_id)
    if not db_task:
        return None

    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if not db_task:
        return False

    db.delete(db_task)
    db.commit()
    return True


def toggle_task_complete(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if not db_task:
        return None

    db_task.completed = not db_task.completed
    db.commit()
    db.refresh(db_task)
    return db_task


def get_categories(db: Session):
    categories = db.query(Task.category).distinct().all()
    return [cat[0] for cat in categories if cat[0]]