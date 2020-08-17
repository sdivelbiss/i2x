## Netlify App

https://i2x.netlify.app/

## Running the application

1. Run `npm install`
2. Run `npm start`
3. Open `localhost:3000`

## Run tests

`npm run test`

## Build

`npm run build`

## Build using Docker

```
docker build -t i2x .
docker run --rm -it  -p 3000:3000/tcp sdivelbiss/i2x:latest
```

## App architecture

- `asr` - contains `ASRClient` and `useASRClient` hook
- `components` - contains UI reusable components
- `utils`- Helper Functions
- `store` - contains `globalStore` utilizing the [Redux Ducks Pattern](https://github.com/erikras/ducks-modular-redux)
- `App.js` - main component file
- `index.js` - Renders `<App/>` and Initialized `redux` and `useASRClient`

- `Dockerfile` - docker `build`
- `public` - static/html files

## Libraries used

- `React` - build UI components
- `react-redux` - use to create app state management store
- `styled-components` - CSS-in-JS
- `react-html-parser` - Read html elements from text string
- `@testing-library/react` - Testing

## Testing approach

Tests were implemented to ensure that all interactions fire and update correctly.
Components are mounted (w/ mocked Context/Redux Store)
