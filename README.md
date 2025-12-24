# TaskApp
web app on fastapi + sqlite
#  Code Snippets Hub

<div align="center">

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**✨ Платформа для обмена и сохранения полезных сниппетов кода**

[![Live Demo](https://img.shields.io/badge/🎯_Live_Demo-Click_Here-8A2BE2?style=for-the-badge&logo=vercel)](https://appfast-3.onrender.com)
[![Documentation](https://img.shields.io/badge/📚_Документация-Wiki-blue?style=for-the-badge)](https://github.com/Gabryelf/AppFast/wiki)
[![Issues](https://img.shields.io/github/issues/Gabryelf/AppFast?color=red&style=for-the-badge)](https://github.com/Gabryelf/AppFast/issues)

</div>

<div align="center">
  
![App Preview](https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80)

*💡 Делитесь, находите и сохраняйте полезные куски кода*

</div>

## ✨ **Особенности**

<table>
<tr>
<td width="33%">

### 🎯 **Быстро и просто**
- ⚡ Мгновенная регистрация
- 📝 Интуитивный интерфейс
- 🔍 Умный поиск по коду

</td>
<td width="33%">

### 🛡️ **Безопасность**
- 🔐 JWT аутентификация
- 🔒 Хэширование паролей
- 👑 Ролевой доступ

</td>
<td width="33%">

### 🌈 **Красота**
- 🎨 Современный дизайн
- 📱 Адаптивная верстка
- 🎭 Анимации и эффекты

</td>
</tr>
</table>

## 🚀 **Быстрый старт**

### 📋 **Предварительные требования**
```bash
🐍 Python 3.8+
🗄️ PostgreSQL 12+
🌐 Git
```

### ⚡ **Установка за 5 минут**

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Gabryelf/AppFast.git
cd code-snippets

# 2. Создайте виртуальное окружение
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Установите зависимости
pip install -r requirements.txt

# 4. Настройте базу данных
cp .env.example .env
# Отредактируйте .env файл

# 5. Запустите приложение
uvicorn app.main:app --reload
```

🎉 **Готово!** Откройте [http://localhost:8000](http://localhost:8000)

## 📁 **Структура проекта**

```
AppFast/
├── 📁 app/                 # Основная логика
│   ├── 🎯 main.py          # Точка входа
│   ├── 🗄️ database.py      # Модели БД
│   ├── 🔐 auth.py          # Аутентификация
│   └── 🚦 handlers.py       # Маршруты API
├── 📁 templates/           # HTML шаблоны
├── 📁 static/             # CSS/JS файлы
└── 📄 requirements.txt    # Зависимости
```

## 🎮 **Как использовать**

<table>
<tr>
<td>

### 👤 **Для пользователей**
1. **Зарегистрируйтесь** - создайте аккаунт
2. **Создайте сниппет** - поделитесь кодом
3. **Сохраняйте лайки** - отмечайте полезное
4. **Исследуйте** - находите новые решения

</td>
<td>

### 👨‍💻 **Для разработчиков**
1. **Fork репозитория**
2. **Создайте ветку** для фичи
3. **Запустите тесты**
4. **Создайте Pull Request**

</td>
</tr>
</table>

## 🌐 **API Документация**

<div align="center">

| Метод | Путь | Описание | Авторизация |
|-------|------|----------|-------------|
| `POST` | `/register` | Регистрация | ❌ |
| `POST` | `/login` | Вход | ❌ |
| `GET` | `/snippets` | Все сниппеты | ❌ |
| `POST` | `/snippets` | Создать сниппет | ✅ |
| `PUT` | `/snippets/{id}` | Обновить | ✅ |
| `DELETE` | `/snippets/{id}` | Удалить | ✅ |
| `POST` | `/snippets/{id}/like` | Лайк | ✅ |

</div>

🔗 **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
📖 **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🎨 **Скриншоты**

<div align="center">

### 📱 **Главная страница**
![Главная страница](screens/2025-12-10_16-29-51.png)

### 💾 **Авторизация**
![Панель сниппетов](screens/2025-12-10_16-30-38.png)

### 👤 **Регистрация**
![Панель сниппетов](screens/2025-12-10_16-30-18.png)

### 📈 **Кабинет пользователя**
![Панель сниппетов](screens/2025-12-10_16-30-55.png)

### 📁 **Панель сниппетов**
![Панель сниппетов](screens/2025-12-10_16-39-46.png)

### 📄 **Заполнение заметок**
![Панель сниппетов](screens/2025-12-10_16-40-09.png)

</div>

## 🏗️ **Технологический стек**

<div align="center">

| Категория | Технологии |
|-----------|------------|
| **Бэкенд** | FastAPI, SQLAlchemy, Pydantic |
| **База данных** | PostgreSQL, SQLAlchemy ORM |
| **Фронтенд** | Jinja2, HTML5, CSS3, JavaScript |
| **Аутентификация** | JWT, SHA-256 хэширование |
| **Деплой** | Render.com, Gunicorn |
| **Инструменты** | Git, GitHub Actions, Docker |

</div>

## 🤝 **Вклад в проект**

Мы ❤️ open-source! Хотите помочь?

1. 🐛 **Сообщите о баге** - [Создать Issue](https://github.com/Gabrielf/AppFast/issues)
2. 💡 **Предложите фичу** - [Feature Request](https://github.com/Gabryelf/AppFast/issues/new?template=feature_request.md)
3. 🔧 **Исправьте баг** - Fork и Pull Request
4. 📚 **Улучшите документацию** - Помогите другим разработчикам

## 📚 **Документация**

### 📖 **Полное руководство**
- [🚀 Начало работы](https://github.com/Gabryelf/AppFast/wiki/Getting-Started)
- [🗄️ Настройка БД](https://github.com/Gabryelf/AppFast/wiki/Database-Setup)
- [🔐 Аутентификация](https://github.com/Gabryelf/AppFast/wiki/Authentication)
- [☁️ Деплой](https://github.com/Gabryelf/AppFast/wiki/Deployment)

## 📄 **Лицензия**

Этот проект лицензирован под лицензией **MIT** - смотрите файл [LICENSE](LICENSE) для деталей.

```
MIT License

Copyright (c) 2024 Gabryelf

Разрешается свободное использование, копирование, изменение, объединение, публикация,
распространение, сублицензирование и/или продажа копий программного обеспечения...
```

## 🌟 **Поддержка проект**

Если вам нравится проект, поставьте ⭐ на GitHub!

<div align="center">

### 📊 **Достижения**

![GitHub Stars](https://img.shields.io/github/stars/Gabryelf/AppFast?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Gabryelf/AppFast?style=social)
![GitHub Issues](https://img.shields.io/github/issues/Gabryelf/AppFast)
![GitHub Last Commit](https://img.shields.io/github/last-commit/Gabryelf/AppFast)

</div>

---

<div align="center">

## 🚀 **Начните прямо сейчас!**

[![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
[![Run on Replit](https://replit.com/badge/github/Gabryelf/AppFast)](https://replit.com/github/Gabryelf/AppFast)

**Вопросы?** Создайте [Issue](https://github.com/Gabryelf/AppFast/issues) или присоединяйтесь к обсуждению!

</div>

---

## 🔮 **Дорожная карта**

- [x] ✅ Базовая функциональность
- [x] ✅ Аутентификация
- [x] ✅ Деплой на Render
- [ ] 🚧 Теги и категории
- [ ] 🚧 Комментарии
- [ ] 🚧 Поиск по коду
- [ ] 🚧 API для мобильных приложений
- [ ] 🚧 GitHub интеграция

---

**✨ Совет дня:** *"Лучший код - это код, который можно понять через 6 месяцев"*

---

<div align="center">

### 🎯 **Статус проекта**

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Gabryelf/AppFast/ci.yml)
![Code Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)
![Maintenance](https://img.shields.io/maintenance/yes/2025)

**Последнее обновление:** Декабрь 2025

</div>

---

<details>
<summary><b>🎨 Цветовая палитра проекта</b></summary>

```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --success: #48bb78;
  --danger: #f56565;
  --warning: #ed8936;
  --dark: #2d3748;
  --light: #f7fafc;
}
```
</details>

<details>
<summary><b>📊 Команды для разработки</b></summary>

```bash
# Запуск тестов
pytest

# Проверка типов
mypy app/

# Форматирование кода
black app/
isort app/

# Проверка безопасности
bandit -r app/
```
</details>

---

<div align="center">

## 🌈 **Присоединяйтесь к сообществу!**

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/MyWayGameDeva)

**💬 Обсуждайте, делитесь, обучайтесь вместе!**

</div>

---

**P.S.** Помните: каждый сниппет кода, который вы сохраняете сегодня, может помочь кому-то завтра! 🚀
