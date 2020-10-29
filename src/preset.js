const { Preset } = require('use-preset');

module.exports = Preset.make('preset-nextjs')
  .copyTemplates()
  .editJson('package.json')
    .title('Install React + Next.js')
    .merge({
      scripts: {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "eslint --fix .",
        "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
      },
      dependencies: {
        "next": "^10.0.0",
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
      }
    })
    .delete([
      'scripts.test'
    ])
    .chain()
  .editJson('package.json')
    .title('Install ESLint + Prettier')
    .merge({
      devDependencies: {
        "eslint": "^7.12.1",
        "eslint-config-prettier": "^6.15.0",
        "eslint-plugin-jsx-a11y": "^6.4.1",
        "eslint-plugin-prettier": "^3.1.4",
        "eslint-plugin-react": "^7.21.5",
        "eslint-plugin-react-hooks": "^4.2.0",
        "prettier": "^2.1.2"
      }
    })
    .chain()
  .command()
    .title('Install npm dependencies')
    .run('npm', ['install', '-s'])
    .chain()
  .command()
    .title('Cleanup package.json')
    .run('npx', ['sort-package-json'])
    .chain()