import { CreateTypeScriptProjectOptions } from '@mui-internal/docs-utilities';

export interface ProjectSettings {
  typeScriptProject: CreateTypeScriptProjectOptions;
  rootPath: string;
  useExternalDocumentation?: Record<string, '*' | readonly string[]>;
  ignoreExternalDocumentation?: Record<string, readonly string[]>;
}
