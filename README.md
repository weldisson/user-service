# Serverless Framework Project
[![Coverage Status](https://coveralls.io/repos/github/weldisson/user-service/badge.svg)](https://coveralls.io/github/weldisson/user-service)

## Requirements

- Node.js (version 18.x.x)
- AWS CLI

## Configuration

### 1. Clone the repository:
```sh
   git clone https://github.com/weldisson/user-service.git
```
### 2. Create a .env file at the root of your project and define the following environment variable:
```
USER_TABLE=your_user_table
```

### 3. Install project dependencies:

```sh
$ npm install

```
## Usage:

### 1. Run Locally
- To run your service locally, use the following command:

```sh
$ npm run local-server
```
This will start a local server using the Serverless Offline plugin, allowing you to test your endpoints locally.

### 2. Deploy to Production
- To deploy your service to a production environment, use the following command:

```sh
$ npm run deploy-prod
```
This will deploy your service to the specified AWS region and stage defined in your serverless.yml.

### 3. Running Tests
To run tests for your project, you can use the following commands:

- Run unit tests:

```sh
$ npm run test
```
- Run unit tests with coverage report:

```sh
$ npm run test-cov
```

## License
- This project is licensed under the MIT License.