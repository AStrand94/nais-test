pipeline {
    agent any
/*
    tools {
        maven 'default'
    }
*/
    stages {
        stage('build') {
            steps {
                sh 'mvn -B -DskipTest clean package'
            }
        }

        stage('test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('deploy docker image') {
            steps {
                script {
                    checkout scm
                    docker.withRegistry('https://docker.adeo.no:5000/') {
                        def image = docker.build("nais-test:1.0.${env.BUILD_ID}")
                        image.push()
                        image.push 'latest'
                    }
                }
            }
        }

        stage('deploy nais.yaml to nexus m2internal') {
            steps {
                script {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexus-user', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD']]) {
                        sh "nais validate"
                        sh "nais upload --app nais-test -v 1.0.${env.BUILD_ID}"
                    }
                }
            }
        }

        stage('deploy to nice') {
            steps {
                script {
                    withCredentials([[$class: "UsernamePasswordMultiBinding", credentialsId: 'nais-user2', usernameVariable: "NAIS_USERNAME", passwordVariable: "NAIS_PASSWORD"]]) {
                        sh "nais deploy -c preprod-fss -z fss -a nais-test -v 1.0.${env.BUILD_ID} --skip-fasit --wait"
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