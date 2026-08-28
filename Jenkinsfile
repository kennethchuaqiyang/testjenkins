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
      emailext (
        subject: "Playwright Run #${env.BUILD_NUMBER}: ${currentBuild.currentResult}",
        body: "Build ${env.BUILD_NUMBER} finished with status: ${currentBuild.currentResult}.\nConsole: ${env.BUILD_URL}console",
        to: 'kennethchuaqiyang@gmail.com'
      )
    }
  }
}