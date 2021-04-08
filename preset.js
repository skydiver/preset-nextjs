import { Preset } from 'apply';

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
        "next": "^10.1.0",
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
      devDependencies: {
        "autoprefixer": "^10.2.5",
        "postcss": "^8.2.9",
        "tailwindcss": "^2.1.0"
      }
    });

  /**
   * Copy project config files
   */
  Preset.extract('config')
    .withTitle('Copy project config files')
    .withDots();

  /**
   * Create Next.js homepage
   */
  Preset.extract('nextjs')
    .ifNotPrompt('tailwind')
    .withTitle('Create index page')
    .withDots();

  /**
   * Copy Tailwind CSS config
   */
  Preset.extract('tailwind')
    .ifPrompt('tailwind')
    .withTitle('Copy Tailwind CSS config')
    .withDots();

  /**
   * Install npm dependencies
   */
  Preset.installDependencies('node');

  /**
   * Sort package.json
   */
  Preset.execute('npx', 'sort-package-json')
    .withTitle('Cleanup package.json');