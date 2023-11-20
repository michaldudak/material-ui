/* eslint-disable no-console */
import yargs from 'yargs';
import path from 'node:path';
import { formatDemos } from '@mui-internal/demo-formatter';

const projectSettings = {
  typeScriptProject: {
    name: 'docs',
    rootPath: path.join(process.cwd(), 'docs'),
    tsConfigPath: 'tsconfig.json',
  },
};

function run(argv) {
  const { watch: watchMode, pattern } = argv;
  formatDemos(projectSettings, watchMode, pattern);
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    description: 'transpile TypeScript demos',
    builder: (command) => {
      return command
        .option('watch', {
          default: false,
          description: 'transpiles demos as soon as they changed',
          type: 'boolean',
        })
        .option('pattern', {
          default: '',
          description:
            'Transpiles only the TypeScript demos whose filename matches the given pattern.',
          type: 'string',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
