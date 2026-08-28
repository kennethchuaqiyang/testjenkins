pipeline {
  agent {
  docker { image 'mcr.microsoft.com/playwright:v1.62.1-jammy' }
}
    triggers {
    cron('H/5 * * * *')
  }
  stages {
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Test') {
      steps { sh 'npx playwright test' }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}