# Feedback form

### Use correct node version

Before installation please take a minute to ensure you have a compatible node version, the project uses [nvm](https://github.com/creationix/nvm) to specifies which NodeJS version is used you can also find it in `.nvmrc`.

```bash
nvm install
nvm use
```

### Use correct node version

Before installation please take a minute to ensure you have a compatible node version, the project uses [nvm](https://github.com/creationix/nvm) to specifies which NodeJS version is used you can also find it in `.nvmrc`.

```bash
nvm install
nvm use
```

### Project stack

This project is [Create React App](https://github.com/facebook/create-react-app) project with typescript.

For state management: React Context API.
For styling: css modules.
For testing: React testing library.

### Folder structure

```

src
├── `components/` Has all reusable components.
├── `pages/` Wraps components as pages.
├── `styles/` Used for common css modules that are needed in other components.
├── `store/` Used for state management, It has context and reducer
├── `utils/` Has all utils needed like constants or util functions
└── `__tests__/` Has all tests in the app

```

### Enhancements

UI:

- Add common style for typography and spacings
- Use some styling library like tailwind css for easier styling
- Add favicon and page title
- Use storybook for components documentation

Accessibilty:

- Adding a library like react-axe for accessibility testing.

Testing:

- Add Testing for the rendered chart labels and values in Results page.
- Add more unit tests for input and rating inputs.
- Move mock data to a separate file and use a mocking library to provide more confidence.

Product:

- Add an endpoint to save review, to list them later in results page

### State Management

For global state there is `FeedbackContextProvider` that has two atrributes:

1- `FeedbackList`: It has a list of reviews added and has `name`, `comment`, `rating` and `email` fields;
2- `RatingList`: This array gets updated when the feedback list changes, it's like a set which keeps track of the count of all ratings where the `[index + 1]` is the rate and the value is the count.
For example: [0, 2, 4, 1, 0], means that:

- 0 users rated 1 star.
- 2 users rated 2 stars.
- 4 users rated 3 stars.
- 1 user rated 4 stars.
- 0 user rated 5 stars

When user submits feedback, it's added to the global feedbackList

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
