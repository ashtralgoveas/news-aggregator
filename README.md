# The DailyScript (News Aggregator)

## A React-based news aggregator app built with Vite. This app aggregates and displays news from various sources.

- The project integrates APIs from NewsAPI.org, The Guardian, and The New York Times.
- It enables users to search and filter news articles according to various criteria, including keywords, date, category, and source.
- Users can personalize their news feed by selecting preferred sources, categories, and authors.
- The design is fully mobile-responsive, ensuring a seamless experience across different screen sizes.

## Installation

To get started with the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ashtralgoveas/news-aggregator.git
   cd news-aggregator
   ```

2. Install Dependencies:

```bash
  npm install
```

## Docker Setup

To containerize the application with Docker, follow these steps:

### 1. Install Docker

First, make sure you have Docker installed on your machine. If you don't have Docker installed, follow the instructions below:

- **For Windows**: [Install Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
- **For macOS**: [Install Docker for macOS](https://docs.docker.com/docker-for-mac/install/)
- **For Linux**: [Install Docker for Linux](https://docs.docker.com/engine/install/)

### 2. Build the Docker Image

Once Docker is installed, navigate to the root of your project (`news-aggregator`), where the `Dockerfile` is located. Build the Docker image by running the following command:

```bash
docker build -t news-aggregator .
```

### 3. Run the Docker Container

Once the Docker image is built, you can run the container with the following command:

```bash
docker run -p 3000:3000 news-aggregator
```

This will start the application inside a Docker container and map port 3000 on your local machine to port 3000 inside the container.

### 4. Access the Application

Once the container is running, you can access the application in your browser by going to:

http://localhost:3000
