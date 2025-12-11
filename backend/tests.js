[
    {
        "method": "POST",
        "url": "http://localhost:5050/auth/register",
        "body": {
            "username": "testuser",
            "password": "password123",
            "email": "testuser@example.com",
            "birthdate": "2000-01-15"
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/auth/login",
        "body": {
            "username": "testuser",
            "password": "password123"
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/auth/logout",
        "body": {}
    },
    {
        "method": "GET",
        "url": "http://localhost:5050/user",
        "body": null
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/user/changeinfo",
        "body": {
            "email": "newemail@example.com",
            "birthdate": "2000-02-20"
        }
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/user/changepassword",
        "body": {
            "oldPassword": "password123",
            "newPassword": "newpassword456",
            "confirmNewPassword": "newpassword456"
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/categories/add",
        "body": {
            "name": "User Work",
            "description": "User side work category"
        }
    },
    {
        "method": "GET",
        "url": "http://localhost:5050/categories/list",
        "body": null
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/categories/edit",
        "body": {
            "categoryid": 1,
            "name": "User Work Updated",
            "description": "Updated user category"
        }
    },
    {
        "method": "DELETE",
        "url": "http://localhost:5050/categories/delete?categoryid=1",
        "body": null
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/tasks/add",
        "body": {
            "category": "Work",
            "title": "Complete project",
            "description": "Finish the todo app",
            "dueDate": "2025-12-25"
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/tasks/add",
        "body": {
            "category": "Work",
            "title": "Review code",
            "description": "Code review for main branch",
            "dueDate": "2025-12-24"
        }
    },
    {
        "method": "GET",
        "url": "http://localhost:5050/tasks/list/1",
        "body": null
    },
    {
        "method": "GET",
        "url": "http://localhost:5050/tasks/list",
        "body": null
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/tasks/edit",
        "body": {
            "id": 1,
            "title": "Updated title",
            "description": "Updated description",
            "dueDate": "2025-12-26",
            "isCompleted": true,
            "category": "Personal"
        }
    },
    {
        "method": "DELETE",
        "url": "http://localhost:5050/tasks/delete?id=1",
        "body": null
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/admin/category/add",
        "body": {
            "name": "Admin Work",
            "description": "Work related tasks",
            "userid": 1
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/admin/category/add",
        "body": {
            "name": "Admin Personal",
            "description": "Personal tasks",
            "userid": 1
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/admin/task/add",
        "body": {
            "title": "Admin Task",
            "description": "Task created by admin",
            "duedate": "2025-12-20",
            "categoryid": 3,
            "userid": 1
        }
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/admin/task/add",
        "body": {
            "title": "Another Admin Task",
            "description": "Another task for admin testing",
            "duedate": "2025-12-22",
            "categoryid": 3,
            "userid": 1
        }
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/admin/category/edit",
        "body": {
            "categoryid": 3,
            "name": "Updated Admin Work",
            "description": "Updated work tasks"
        }
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/admin/task/edit",
        "body": {
            "taskid": 3,
            "title": "Updated admin task",
            "description": "Updated by admin",
            "duedate": "2025-12-21",
            "iscompleted": false,
            "categoryid": 3
        }
    },
    {
        "method": "DELETE",
        "url": "http://localhost:5050/admin/task/delete?taskid=4",
        "body": null
    },
    {
        "method": "DELETE",
        "url": "http://localhost:5050/admin/category/delete?categoryid=4",
        "body": null
    },
    {
        "method": "PATCH",
        "url": "http://localhost:5050/admin/user/edit?userid=1",
        "body": {
            "username": "updateduser",
            "email": "updated@example.com",
            "birthdate": "2000-03-15",
            "password": "newadminpass123"
        }
    },
    {
        "method": "DELETE",
        "url": "http://localhost:5050/admin/user/delete?userid=1",
        "body": null
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/admin/user/suspend?userid=1",
        "body": {}
    },
    {
        "method": "POST",
        "url": "http://localhost:5050/admin/user/reactivate?userid=1",
        "body": {}
    }
]