pipeline {
  agent {
    docker { image 'mcr.microsoft.com/playwright:v1.62.1-jammy' }
  }
  triggers {
    cron('0 14 * * *')
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
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report'
      ])
      emailext (
        subject: "Playwright Run #${env.BUILD_NUMBER}: ${currentBuild.currentResult}",
        body: "Build ${env.BUILD_NUMBER} finished with status: ${currentBuild.currentResult}.\nConsole: ${env.BUILD_URL}console\nHTML Report: ${env.BUILD_URL}Playwright_20HTML_20Report/",
        to: 'kennethchuaqiyang@gmail.com'
      )
    }
  }
}