import os

from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from typing import List, Optional



from app import models, schemas, crud
from app.database import engine, get_db
from app.models import Task

# Создаем таблицы
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo App", version="1.0.0")

# Настройка статических файлов и шаблонов
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# Главная страница
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# API эндпоинты
@app.get("/api/tasks/", response_model=List[schemas.Task])
def read_tasks(
        skip: int = 0,
        limit: int = 100,
        completed: Optional[bool] = None,
        category: Optional[str] = None,
        search: Optional[str] = None,
        db: Session = Depends(get_db)
):
    tasks = crud.get_tasks(db, skip=skip, limit=limit,
                           completed=completed, category=category,
                           search=search)
    return tasks


@app.get("/api/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.post("/api/tasks/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    try:
        db_task = crud.create_task(db=db, task=task)
        return {
            "success": True,
            "data": db_task,
            "message": "Task created successfully"
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error creating task: {str(e)}"
        }


@app.put("/api/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = crud.update_task(db=db, task_id=task_id, task_update=task)
    if db_task is None:
        return {
            "success": False,
            "message": "Task not found"
        }

    return {
        "success": True,
        "data": db_task,
        "message": "Task updated successfully"
    }


@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    success = crud.delete_task(db=db, task_id=task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"success": True, "message": "Task deleted successfully"}


@app.patch("/api/tasks/{task_id}/toggle", response_model=schemas.TaskResponse)
def toggle_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.toggle_task_complete(db=db, task_id=task_id)
    if db_task is None:
        return {
            "success": False,
            "message": "Task not found"
        }

    return {
        "success": True,
        "data": db_task,
        "message": "Task toggled successfully"
    }


@app.get("/api/categories/")
def get_categories(db: Session = Depends(get_db)):
    categories = crud.get_categories(db)
    return {"categories": categories}


# Статистика
@app.get("/api/stats/")
def get_stats(db: Session = Depends(get_db)):
    from sqlalchemy import func

    total = db.query(func.count(Task.id)).scalar() or 0
    completed = db.query(func.count(Task.id)).filter(Task.completed == True).scalar() or 0
    pending = total - completed

    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "completion_rate": round((completed / total * 100) if total > 0 else 0, 1)
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)