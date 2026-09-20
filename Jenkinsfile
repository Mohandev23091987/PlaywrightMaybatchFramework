pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        skipDefaultCheckout(false)
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**, allure-results/**', allowEmptyArchive: true
        }
    }
}