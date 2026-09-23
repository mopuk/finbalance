# Finbalance — Локальное развертывание проекта

Инструкция по настройке окружения, созданию локальной базы данных PostgreSQL и запуску сервера разработки Django.

---

## 1. Настройка переменных окружения

В корневой директории проекта создайте файл `.env` и заполните его следующими параметрами:

```env
DEBUG=True
SECRET_KEY=your_secret_key_here

DB_NAME=finbalance
DB_USER=finbalance_admin
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=5432
```

---

## 2. Инициализация базы данных

В терминале подключитесь к postgres, через

```
psql -U postgres
```

Далее введите:

```sql

CREATE DATABASE finbalance;
CREATE USER finbalance_admin WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE finbalance TO finbalance_admin;

\c finbalance
GRANT ALL ON SCHEMA public TO finbalance_admin;

\q
```

---

## 3. Установка зависимостей и миграции

```bash
pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser
```

`createsuperuser` - создает суперпользователя для админ панели Django

---

## 4. Запуск сервера разработки

Для запуска локального сервера выполните команду:

```bash
python manage.py runserver
```

После этого проект будет доступен в браузере по адресу: [http://127.0.0](http://127.0.0)
