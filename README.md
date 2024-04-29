# React native email password + biometrics auth

This example app shows how you can use SuperTokens with a React Native app to authenticate users using email-password and biometrics (as a second factor).

The auth server (in the `backend` folder) is written in NodeJS and uses the `supertokens-node` SDK. The frontend app uses the `supertokens-react-native` SDK.

On first startup, the app shows an email password login UI where the user can sign in or sign up. After doing this, the user is shown the home page. The next time the user reopens the app, they are asked for their biometrics (touch ID / face ID / device pin) before they get access to the app. If the user hasn't configured any of these, they are logged out and have to relogin via the email password method.

## Setup instructions:

### 1) Install dependencies
```bash
npm i
```

### 2) Start the backend
This starts the node backend server on port `3001` of your machine.
```bash
npm run start:backend
```

### 3) Replace the `API_DOMAIN` in `constants.js` with your machine's local IP address

### 4) Start the frontend
```bash
npm run start
```