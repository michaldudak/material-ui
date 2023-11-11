import path from 'node:path';
import yargs from 'yargs';
import { generatePropTypes } from './index';
import { ProjectSettings } from './ProjectSettings';

interface CommandOptions {
  pattern: string;
}

const projectSettings: ProjectSettings[] = [
  {
    rootPath: path.resolve(__dirname, '../mui-system/src'),
    typeScriptProjects: [
      {
        name: 'system',
        rootPath: path.join(process.cwd(), 'packages/mui-system'),
        entryPointPath: 'src/index.d.ts',
      },
    ],
  },
  {
    rootPath: path.resolve(__dirname, '../mui-base/src'),
    typeScriptProjects: [
      {
        name: 'base',
        rootPath: path.join(process.cwd(), 'packages/mui-base'),
        entryPointPath: 'src/index.d.ts',
      },
    ],
  },
  {
    rootPath: path.resolve(__dirname, '../mui-material/src'),
    typeScriptProjects: [
      {
        name: 'material',
        rootPath: path.join(process.cwd(), 'packages/mui-material'),
        entryPointPath: 'src/index.d.ts',
      },
    ],
  },
  {
    rootPath: path.resolve(__dirname, '../mui-lab/src'),
    typeScriptProjects: [
      {
        name: 'lab',
        rootPath: path.join(process.cwd(), 'packages/mui-lab'),
        entryPointPath: 'src/index.d.ts',
      },
    ],
  },
  {
    rootPath: path.resolve(__dirname, '../mui-material-next/src'),
    typeScriptProjects: [
      {
        name: 'material-next',
        rootPath: path.join(process.cwd(), 'packages/mui-material-next'),
        entryPointPath: 'src/index.ts',
      },
    ],
  },
  {
    rootPath: path.resolve(__dirname, '../mui-joy/src'),
    typeScriptProjects: [
      {
        name: 'joy',
        rootPath: path.join(process.cwd(), 'packages/mui-joy'),
        entryPointPath: 'src/index.ts',
      },
    ],
  },
];

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const pattern = argv.pattern == null || argv.pattern === '' ? null : new RegExp(argv.pattern);
  return generatePropTypes(projectSettings, pattern);
}

yargs(process.argv.slice(2))
  .command<CommandOptions>({
    command: '$0',
    describe: 'Generates Component.propTypes from TypeScript declarations',
    builder: (command) => {
      return command.option('pattern', {
        default: '',
        describe: 'Only considers declaration files matching this pattern.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
