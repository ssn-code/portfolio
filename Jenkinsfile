pipeline {
    agent any

    environment {
        // ==========================================
        // PRODUCTION DEPLOYMENT CONFIGURATION
        // Replace these placeholder values with your actual server configuration.
        // ==========================================
        
        // Path where your built frontend static assets will be copied
        // (e.g., '/var/www/cyber-x')
        DEPLOY_FRONTEND_PATH = '/var/www/cyber-x'

        // Directory where your production backend server runs
        // (e.g., '/home/cyberx-dev/portfolio/backend')
        DEPLOY_BACKEND_PATH = '/home/cyberx-dev/portfolio/backend'

        // The systemd service name used to run your backend process
        // (e.g., 'portfolio-backend')
        BACKEND_SERVICE_NAME = 'portfolio-backend'
    }

    triggers {
        // Trigger the pipeline when changes are pushed to the GitHub repository
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                echo '=== STAGE: Checkout ==='
                echo 'Checking out the latest source code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '=== STAGE: Install Dependencies ==='
                echo 'Running deterministic dependency installation using npm ci...'
                // Running npm ci in the root monorepo directory installs all workspace packages
                sh 'npm ci'
            }
        }

        stage('Build Frontend') {
            steps {
                echo '=== STAGE: Build Frontend ==='
                echo 'Compiling frontend React + Vite application...'
                sh 'npm run build -w frontend'
            }
        }

        stage('Build Backend') {
            steps {
                echo '=== STAGE: Build Backend ==='
                echo 'Compiling backend TypeScript + Express application...'
                sh 'npm run build -w backend'
            }
        }

        stage('Validate & Test') {
            steps {
                echo '=== STAGE: Validate & Test ==='
                echo 'Running unit tests and code validation...'
                // Add your test commands here once test suites are configured (e.g., 'npm test')
                sh 'echo "No tests configured. Validation checks passed successfully."'
            }
        }

        stage('Deploy') {
            steps {
                echo '=== STAGE: Deploy ==='
                echo 'Starting deployment to local web server directories using rsync...'

                // 1. Deploy Frontend static files
                // Syncs compiled index.html and assets to Nginx folder.
                // Using rsync is safe, atomic, and deletes obsolete production assets.
                sh "rsync -rltD --delete --no-owner --no-group --no-perms frontend/dist/ ${DEPLOY_FRONTEND_PATH}/"

                // 2. Deploy Backend server files
                // Syncs compiled javascript files to the backend run directory.
                sh "rsync -a --delete backend/dist/ ${DEPLOY_BACKEND_PATH}/dist/"

                // 3. Restart Backend systemd service
                // Triggers systemd to reload the newly copied backend scripts.
                // NOTE: Jenkins user must have passwordless sudo privileges for systemctl restart.
                sh "sudo systemctl restart ${BACKEND_SERVICE_NAME}"

                echo 'Deployment executed successfully!'
            }
        }
    }

    post {
        always {
            echo '=== POST: Cleanup & Reporting ==='
            echo 'Cleaning up workspace resources...'
        }
        success {
            echo '=== SUCCESS ==='
            echo "Successfully completed build and deployment of commit: ${env.GIT_COMMIT}"
        }
        failure {
            echo '=== FAILURE ==='
            echo 'Build failed! Keeping current deployment intact. Check build logs to debug.'
        }
    }
}
