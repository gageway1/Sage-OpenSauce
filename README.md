# Sage

## Description

Sage is a react native application ran in expo go to allow for text to speech of GPT completions.

Ideally, this will eventually also have a speech to text feature that works similar to Siri or Alexa.
That's all it is right now.

## Installation

1. Install React Native

```bash
npm install -g react-native-cli
```

2. Move to the project directory

```bash
cd sage
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
npx expo start
```

##### <hr />

## Connecting to your phone

1. Download the Expo Go app on your phone
2. Scan the QR code in the terminal or in the browser
3. The app should open on your phone
4. If you have any issues, try running `npm start` instead of `npx expo start`
5. If you still have issues, try running `npm install` again
6. If you still have issues, try running `npm install -g expo-cli` and then `npm install` again

##### <hr />

## Known Issues
1. If you get an error saying something about a weird number, shake your phone and click "Reload"
2. The conversation array doesn't append the most recent message, so you have to refresh the app to see the most recent message, it says `undefined`, so if you see that, just refresh the app