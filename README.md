# React + Django Full Stack Application

A modern full-stack application with React Vite frontend and Django backend.

## Project Structure

```
LCCAP/
├── frontend/          # React Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── backend/           # Django backend
│   ├── backend/       # Django project settings
│   ├── api/           # Django API app
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Python** (v3.8 or higher) - [Download here](https://www.python.org/downloads/)

## Setup Instructions

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## API Endpoints

The Django backend provides the following API endpoints:

- `GET /api/hello/` - Simple hello world endpoint
- `GET /api/data/` - List all sample data items
- `POST /api/data/` - Create a new sample data item
- `GET /api/data/<id>/` - Retrieve a specific sample data item
- `PUT /api/data/<id>/` - Update a specific sample data item
- `DELETE /api/data/<id>/` - Delete a specific sample data item

## Features

- **React Frontend**: Modern React with Vite for fast development
- **Django Backend**: RESTful API with Django REST Framework
- **CORS Configuration**: Properly configured for cross-origin requests
- **Proxy Configuration**: Frontend proxies API requests to backend
- **Responsive Design**: Clean and modern UI with Tailwind CSS styling

## Development

### Running Both Servers

For development, you'll need to run both servers simultaneously:

1. Terminal 1 - Backend:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Adding Sample Data

You can add sample data through the API or Django admin:

1. Access Django admin at `http://localhost:8000/admin/`
2. Login with your superuser credentials
3. Add SampleData items through the admin interface

## Configuration

### Backend Configuration

- Database: SQLite (default)
- Debug mode: Enabled for development
- CORS: Configured for `http://localhost:5173`

### Frontend Configuration

- Development server port: 5173
- API proxy: Routes `/api/*` requests to `http://localhost:8000`

## Production Considerations

For production deployment:

1. **Backend**:
   - Set `DEBUG = False` in settings.py
   - Configure production database (PostgreSQL recommended)
   - Set up proper `SECRET_KEY`
   - Configure static files serving
   - Set up proper CORS origins

2. **Frontend**:
   - Build the application: `npm run build`
   - Serve built files with a web server (Nginx, Apache, etc.)
   - Update API base URL for production

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS settings include your frontend URL
2. **Connection Refused**: Make sure both servers are running on correct ports
3. **Module Not Found**: Run `npm install` or `pip install -r requirements.txt`
4. **Database Errors**: Run migrations with `python manage.py migrate`

### Getting Help

If you encounter issues:

1. Check that all prerequisites are installed
2. Verify both servers are running
3. Check browser console for JavaScript errors
4. Check terminal output for server errors

## License

This project is open source and available under the [MIT License](LICENSE).

