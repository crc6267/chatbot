# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip setuptools
RUN pip install --no-cache-dir absl-py==0.9.0 SQLAlchemy==1.3.24 PyJWT==1.7.1 protobuf==3.20.3
RUN pip install --no-cache-dir rasa==2.8.0

# Make port 5005 available to the world outside this container
EXPOSE 5005

# Define environment variable
ENV NAME RasaBot

# Run Rasa server
CMD ["rasa", "run", "--enable-api", "--cors", "*"]
