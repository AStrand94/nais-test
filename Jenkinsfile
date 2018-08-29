pipeline {
    agent any

    stages {

        stage('test backend') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('build backend') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('deploy backend docker image') {
            steps {
                script {
                    //checkout scm
                    docker.withRegistry('https://docker.adeo.no:5000/') {
                        def image = docker.build("nais-test:1.0.${env.BUILD_ID}", "--build-arg JAR_FILE=nais-test-0.0.1-SNAPSHOT.jar .")
                        image.push()
                        image.push 'latest'
                    }
                }
            }
        }

        stage('deploy frontend docker image') {
            steps {
                script {
                    checkout scm
                    docker.withRegistry('https://docker.adeo.no:5000/') {
                        def image = docker.build("nais-test-frontend:1.0.${env.BUILD_ID}", "--build-arg PROXY='http://webproxy-utvikler.nav.no:8088'")
                        image.push()
                        image.push 'latest'
                    }
                }
            }
        }

        stage('deploy nais.yaml to nexus m2internal') {
            steps {
                script {
                        sh "nais validate"
                        sh "nais upload --app nais-test -v 1.0.${env.BUILD_ID}"

                        dir('frontend'){
                            sh "nais validate"
                            sh "nais upload --app nais-test-frontend -v 1.0.${env.BUILD_ID}"
                        }
                }
            }
        }

        stage('deploy to nais') {
            steps {
                script {

                        sh "nais deploy -c preprod-fss -z fss -a nais-test -v 1.0.${env.BUILD_ID} --skip-fasit"

                        dir('frontend'){
                            sh "nais deploy -c preprod-fss -z fss -a nais-test-frontend -v 1.0.${env.BUILD_ID} --skip-fasit"
                        }

                }
            }
        }


    }

    post {
        always {
            archive 'target/*.jar'
            deleteDir()
        }

    }
}