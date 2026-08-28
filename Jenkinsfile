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
      script {
        env.TEST_SUMMARY = sh(script: 'node summarize.js', returnStdout: true).trim()
      }
      emailext (
        subject: "Playwright Run #${env.BUILD_NUMBER}: ${currentBuild.currentResult}",
        body: """Build ${env.BUILD_NUMBER} finished with status: ${currentBuild.currentResult}.

${env.TEST_SUMMARY}

Full report: ${env.BUILD_URL}Playwright_20HTML_20Report/
Console: ${env.BUILD_URL}console""",
        to: 'kennethchuaqiyang@gmail.com'
      )
    }
  }
}