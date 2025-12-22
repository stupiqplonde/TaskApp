// API base URL
const API_BASE = '/api';

// DOM Elements
const tasksList = document.getElementById('tasks-list');
const noTasks = document.getElementById('no-tasks');
const taskForm = document.getElementById('task-form');
const editTaskForm = document.getElementById('edit-task-form');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const categoryList = document.getElementById('category-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('edit-modal');
const closeModalBtns = document.querySelectorAll('.close, .close-modal');
const stats = {
    total: document.getElementById('total-tasks'),
    completed: document.getElementById('completed-tasks'),
    pending: document.getElementById('pending-tasks')
};

// State
let currentFilter = 'all';
let currentSearch = '';
let tasks = [];
let categories = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadCategories();
    loadStats();

    // Set up event listeners
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Task form submission
    taskForm.addEventListener('submit', handleCreateTask);

    // Edit task form submission
    editTaskForm.addEventListener('submit', handleUpdateTask);

    // Search
    searchInput.addEventListener('input', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Modal close buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            editModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
}

// Load tasks from API
async function loadTasks() {
    try {
        const response = await fetch(`${API_BASE}/tasks/`);
        if (response.ok) {
            tasks = await response.json();
            renderTasks();
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        showNotification('Error loading tasks', 'error');
    }
}

// Load categories from API
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories/`);
        if (response.ok) {
            const data = await response.json();
            categories = data.categories;
            renderCategories();
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats/`);
        if (response.ok) {
            const data = await response.json();
            updateStats(data);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Create new task
async function handleCreateTask(e) {
    e.preventDefault();

    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        priority: parseInt(document.getElementById('priority').value)
    };

    try {
        const response = await fetch(`${API_BASE}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        });

        const result = await response.json();

        if (result.success) {
            showNotification('Task created successfully!', 'success');
            taskForm.reset();
            loadTasks();
            loadCategories();
            loadStats();
        } else {
            showNotification(result.message || 'Error creating task', 'error');
        }
    } catch (error) {
        console.error('Error creating task:', error);
        showNotification('Error creating task', 'error');
    }
}

// Update task
async function handleUpdateTask(e) {
    e.preventDefault();

    const taskId = document.getElementById('edit-task-id').value;
    const taskData = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        category: document.getElementById('edit-category').value,
        priority: parseInt(document.getElementById('edit-priority').value),
        completed: document.getElementById('edit-completed').checked
    };

    try {
        const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        });

        const result = await response.json();

        if (result.success) {
            showNotification('Task updated successfully!', 'success');
            editModal.style.display = 'none';
            loadTasks();
            loadCategories();
            loadStats();
        } else {
            showNotification(result.message || 'Error updating task', 'error');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        showNotification('Error updating task', 'error');
    }
}

// Toggle task completion
async function toggleTaskCompletion(taskId) {
    try {
        const response = await fetch(`${API_BASE}/tasks/${taskId}/toggle`, {
            method: 'PATCH'
        });

        const result = await response.json();

        if (result.success) {
            loadTasks();
            loadStats();
        }
    } catch (error) {
        console.error('Error toggling task:', error);
        showNotification('Error updating task', 'error');
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Task deleted successfully!', 'success');
            loadTasks();
            loadCategories();
            loadStats();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Error deleting task', 'error');
    }
}

// Open edit modal
function openEditModal(task) {
    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-description').value = task.description || '';
    document.getElementById('edit-category').value = task.category;
    document.getElementById('edit-priority').value = task.priority.toString();
    document.getElementById('edit-completed').checked = task.completed;

    editModal.style.display = 'flex';
}

// Handle search
function handleSearch(e) {
    currentSearch = e.target.value.toLowerCase();
    renderTasks();
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    currentSearch = '';
    renderTasks();
}

// Filter tasks based on current filter and search
function getFilteredTasks() {
    let filtered = tasks;

    // Apply filter
    if (currentFilter === 'pending') {
        filtered = filtered.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
    }

    // Apply search
    if (currentSearch) {
        filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(currentSearch) ||
            (task.description && task.description.toLowerCase().includes(currentSearch)) ||
            task.category.toLowerCase().includes(currentSearch)
        );
    }

    return filtered;
}

// Render tasks to the DOM
function renderTasks() {
    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '';
        noTasks.style.display = 'block';
        return;
    }

    noTasks.style.display = 'none';

    const tasksHtml = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority)}">
            <input type="checkbox"
                   class="task-checkbox"
                   ${task.completed ? 'checked' : ''}
                   onchange="toggleTaskCompletion(${task.id})">

            <div class="task-content">
                <div class="task-title ${task.completed ? 'completed' : ''}">
                    ${escapeHtml(task.title)}
                    <span class="task-category">${escapeHtml(task.category)}</span>
                </div>

                ${task.description ? `
                    <div class="task-description">${escapeHtml(task.description)}</div>
                ` : ''}

                <div class="task-meta">
                    <span class="task-priority">
                        <i class="fas fa-flag"></i> ${getPriorityText(task.priority)}
                    </span>
                    <span class="task-date">
                        <i class="far fa-calendar"></i> ${formatDate(task.created_at)}
                    </span>
                </div>
            </div>

            <div class="task-actions">
                <button class="action-btn edit-btn" onclick="openEditModal(${JSON.stringify(task).replace(/"/g, '&quot;')})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    tasksList.innerHTML = tasksHtml;

    // Update tasks title
    const tasksTitle = document.getElementById('tasks-title');
    let title = 'All Tasks';
    if (currentFilter === 'pending') title = 'Pending Tasks';
    if (currentFilter === 'completed') title = 'Completed Tasks';
    if (currentSearch) title += ` (Search: "${currentSearch}")`;
    tasksTitle.textContent = `${title} (${filteredTasks.length})`;
}

// Render categories
function renderCategories() {
    if (categories.length === 0) {
        categoryList.innerHTML = '<p>No categories yet</p>';
        return;
    }

    const categoryCounts = {};
    tasks.forEach(task => {
        categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
    });

    const categoriesHtml = categories.map(category => `
        <div class="category-item" onclick="filterByCategory('${category}')">
            <span>${escapeHtml(category)}</span>
            <span class="category-count">${categoryCounts[category] || 0}</span>
        </div>
    `).join('');

    categoryList.innerHTML = categoriesHtml;
}

// Filter by category
function filterByCategory(category) {
    searchInput.value = category;
    currentSearch = category.toLowerCase();
    renderTasks();
}

// Update statistics display
function updateStats(data) {
    stats.total.textContent = data.total;
    stats.completed.textContent = data.completed;
    stats.pending.textContent = data.pending;
}

// Helper functions
function getPriorityClass(priority) {
    if (priority === 1) return 'high-priority';
    if (priority === 2) return 'medium-priority';
    return 'low-priority';
}

function getPriorityText(priority) {
    switch(priority) {
        case 1: return 'High';
        case 2: return 'Medium';
        default: return 'Low';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                border-left: 4px solid;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .notification-success {
                border-left-color: var(--success-color);
            }

            .notification-error {
                border-left-color: var(--danger-color);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .notification-success .notification-content i {
                color: var(--success-color);
            }

            .notification-error .notification-content i {
                color: var(--danger-color);
            }

            .notification-close {
                background: none;
                border: none;
                color: var(--secondary-color);
                cursor: pointer;
                padding: 5px;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Make functions available globally
window.toggleTaskCompletion = toggleTaskCompletion;
window.deleteTask = deleteTask;
window.openEditModal = openEditModal;
window.filterByCategory = filterByCategory;