# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt into the container
COPY requirements.txt ./

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . /app

# Expose port 5000 for Flask
EXPOSE 5000

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Set environment variables for database and mail configuration
ENV JAWSDB_URL=${JAWSDB_URL}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV FRED_KEY=${FRED_KEY}
ENV FRONTEND_ORIGIN=${FRONTEND_ORIGIN}

# Run the application
CMD ["python", "app.py"]
