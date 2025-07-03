#!/bin/bash

# Set project folder name
PROJECT_NAME="Real-Time-Sensor-Project"

# Step 1: Create root project directory
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME || exit

echo "Creating backend..."
# Step 2: Backend setup
mkdir server-backend
cd server-backend || exit

npm init -y

npm install express cors ws mongoose dotenv


# Create base files
touch index.js .env

cd ..

echo "Creating frontend..."
# Step 3: Frontend setup
npx create-react-app dashboard-frontend

cd dashboard-frontend || exit

npm install axios chart.js react-chartjs-2

cd ..

echo "Project setup complete!"
echo "Structure:"
tree -L 2
