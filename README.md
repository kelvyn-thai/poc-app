## Available scripts

In the project directory, you can run:

| Command        |        Description        |
| :------------- | :-----------------------: |
| npm install    |       Install NPM.        |
| npm start      | Runs the app on port 3000 |
| npm run build  |         Build app         |
| npm run deploy |        Deploy app         |

## Main Stack

- Build UI by React core: https://reactjs.org + CRA template typescript
- Manage build, deploy, start,...: [react-scripts](https://www.npmjs.com/package/react-scripts)
- Manage state application by Zustand: https://github.com/pmndrs/zustand
- Asynchronous state management by react-query: https://tanstack.com/query/v4/docs/overview
- Bundle application by Webpack: https://webpack.js.org
- UI core library: combine between [ant-design](https://ant.design/docs/react/introduce) + make by hand.
- CSS framework: https://tailwindcss.com
- Find, fix, format, v...v problems in JavaScript code :
  - Eslint: https://eslint.org/
  - Husky: https://typicode.github.io/husky
  - Lint-staged: https://github.com/okonet/lint-staged
  - Prettier: https://prettier.io/

## Deploy

- Github Pages: https://pages.github.com/
- Docker: https://www.docker.com/

## Production

- https://phattnh.github.io/poc-app/

## Developer

- From source ([src](./src/)) app folder:

  - [assets](./src/assets/): assets of application such as fonts, images, fonts,...
  - [components](./src/components/): define all component used to build application
  - [i18n](./src/i18n/): multiple language
  - [pages](./src/pages/): all pages - each page same as module
    - index.tsx or PageName.tsx: define Page
    - zustand: manage state
    - \*.scss: for stylesheet or we can use tailwind
    - components: child component or features
    - utils: utils logics
  - [zustand-store](./src/zustand-store/): define zustand store used for component / feature / page
  - [database](./src/database/): Storage on [Indexed DB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  - [hooks](./src/hooks/): declare some sharing hooks
  - [http-request](./src/http-request/): create http request by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

- From components(UI) ([components](./src/components)):
  - antd: Custom some ant-design component
  - charts: Combine many chart's library [d3](https://github.com/d3/d3/wiki), [echarts](https://echarts.apache.org/en/api.html#echarts), v...v
  - core: Basic / core component make by hand
