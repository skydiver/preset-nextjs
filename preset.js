import { color, Preset } from 'apply';

Preset.setName('Next.js + ESLint + Prettier');

  /**
   * Install React + Next.js
  */
  Preset.editJson('package.json')
    .withTitle('Install React + Next.js')
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
    ]);

  /**
   * Add ESLint + Prettier dependencies
   */
  Preset.editJson('package.json')
    .withTitle('Install ESLint + Prettier')
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
    });

  /**
   * Prompt for Tailwind CSS
   */
  Preset.confirm('tailwind', 'Install Tailwind CSS?');

  /**
   * Add Tailwind CSS dependencies
   */
  Preset.editJson('package.json')
    .ifPrompt('tailwind')
    .withTitle('Install Tailwind CSS')
    .merge({
      dependencies: {
        "autoprefixer": "^10.0.2",
        "postcss": "^8.1.9",
        "tailwindcss": "^2.0.1"
      }
    });

  // /**
  //  * Copy project config files
  //  */
  // .copyDirectory('project')
  //   .title('Copy project config files')
  //   .to('/')
  //   .chain()

  // /**
  //  * Create Next.js homepage
  //  */
  // .copyDirectory('nextjs')
  //   .if(({ prompts }) => !Boolean(prompts.tailwind))
  //   .title('Create index page')
  //   .to('/')
  //   .chain()

  // /**
  //  * Copy Tailwind CSS config
  //  */
  // .copyDirectory('tailwind')
  //   .if(({ prompts }) => Boolean(prompts.tailwind))
  //   .title('Copy Tailwind CSS config')
  //   .to('/')
  //   .chain()

  // /**
  //  * Install npm dependencies
  //  */
  // .command()
  //   .title('Install npm dependencies')
  //   .run('npm', ['install', '-s'])
  //   .chain()

  /**
   * Sort package.json
   */
  Preset.execute('npx', 'sort-package-json')
    .withTitle('Cleanup package.json');