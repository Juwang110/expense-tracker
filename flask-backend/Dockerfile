FROM python:3.9-slim

# Working dir
WORKDIR /app

COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . /app

# Expose port 5000 for Flask
EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_ENV=development
ENV JAWSDB_URL=${JAWSDB_URL}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV FRED_KEY=${FRED_KEY}
ENV FRONTEND_ORIGIN=${FRONTEND_ORIGIN}

CMD ["python", "app.py"]
