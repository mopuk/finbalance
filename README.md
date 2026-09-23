# FinBalance — Fintech Educational Web Service

FinBalance is a lightweight fintech web service. It provides personal financial modeling, wealth growth forecasting using compound interest and annuity models, and an educational knowledge base for financial literacy.

---

## Installation & Setup

### Prerequisites

- Python 3.11 or higher
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/finbalance.git](https://github.com/your-username/finbalance.git)
cd finbalance
```

### 2. Setup the environment

```bash
python -m venv venv
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Databse & Environment

```bash
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_NAME=finbalance_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### 5. Apply migrations and collect static files

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

Open your browser and navigate to http://127.0.0.1:8000/
