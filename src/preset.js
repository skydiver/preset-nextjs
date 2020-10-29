const { Preset } = require('use-preset');

module.exports = Preset.make('preset-nextjs')

  /**
   * Install React + Next.js
  */
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

  /**
   * Add ESLint + Prettier dependencies
   */
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

  /**
   * Prompt for Tailwind CSS + Tailwind UI
   */
  .prompts()
    .confirm('Install Tailwind CSS + Tailwind UI?', 'tailwind')
    .chain()

  /**
   * Add Tailwind CSS + Tailwind UI dependencies
   */
  .editJson('package.json')
    .if(({ prompts }) => Boolean(prompts.tailwind))
    .title('Install Tailwind CSS + Tailwind UI')
    .merge({
      dependencies: {
        "@fullhuman/postcss-purgecss": "^3.0.0",
        "@tailwindcss/ui": "^0.6.2",
        "tailwindcss": "^1.9.6"
      }
    })
    .chain()

  /**
   * Copy project config files
   */
  .copyDirectory('project')
    .title('Copy project config files')
    .to('/')
    .chain()

  /**
   * Create Next.js homepage
   */
  .copyDirectory('nextjs')
    .if(({ prompts }) => !Boolean(prompts.tailwind))
    .title('Create index page')
    .to('/')
    .chain()

  /**
   * Copy Tailwind CSS + Tailwind UI config
   */
  .copyDirectory('tailwind')
    .if(({ prompts }) => Boolean(prompts.tailwind))
    .title('Copy Tailwind CSS + Tailwind UI config')
    .to('/')
    .chain()

  /**
   * Install npm dependencies
   */
  .command()
    .title('Install npm dependencies')
    .run('npm', ['install', '-s'])
    .chain()

  /**
   * Sort package.json
   */
  .command()
    .title('Cleanup package.json')
    .run('npx', ['sort-package-json'])
    .chain();