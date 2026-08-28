pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.62.1-jammy'
      label 'playwright'
    }
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
      emailext (
        subject: "Playwright Run #${env.BUILD_NUMBER}: ${currentBuild.currentResult}",
        body: "Test email from DO Jenkins controller. Build ${env.BUILD_NUMBER} status: ${currentBuild.currentResult}.",
        to: 'kennethchuaqiyang@gmail.com'
      )
    }
  }
}