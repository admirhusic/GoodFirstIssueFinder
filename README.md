# GoodFirstIssueFinder

GoodFirstIssueFinder is a simple web application designed to help developers discover and contribute to "good first issues" on GitHub.

Pull requests are welcome to enhance this project.

## Installation

To get started, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/admirhusic/GoodFirstIssueFinder.git
    cd GoodFirstIssueFinder
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the environment variables**:
    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and update the `VITE_APP_GITHUB_TOKEN` variable with your GitHub token:
      ```bash
      VITE_APP_GITHUB_TOKEN='INSERT GITHUB TOKEN HERE'
      ```
      You can create a personal access token in your GitHub account settings [here](https://github.com/settings/tokens).

4. **Start the project**:
    ```bash
    npm start
    ```

## Demo

Check out the live demo of the GoodFirstIssueFinder app [here](https://good-first-issue-finder.vercel.app).
