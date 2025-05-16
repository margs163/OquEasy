FROM python:3.12-slim

WORKDIR /app
COPY backend_api/requirements.txt .
RUN pip install --upgrade --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "backend_api.main:app", "--host", "0.0.0.0", "--port", "8000"]