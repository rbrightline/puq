import { program } from 'commander';
import { parseRename } from './rename/parse-rename.js';
import { parseReplace } from './replace/parse-replace.js';

async function boot() {
  program
    .name('Development tools | Brightline Software')
    .description(
      [
        'Powerful CLI for Advanced File & Development Operations',
        'Boost your command-line productivity with this robust CLI library built on the Commander framework. Designed for developers and power users, it streamlines essential I/O operations such as recursive and asynchronous file renaming, replacing, and copying with ease.',
        "Beyond file management, the library includes a suite of developer-friendly commands to enhance workflow automation and efficiency. Whether you're handling bulk file operations or optimizing your development environment, this CLI is your go-to tool for seamless execution.",
        'Empower your command-line experience—effortlessly!',
      ].join('\n')
    )
    .version('0.0.15');

  parseRename(program);

  parseReplace(program);

  program.parse();
}

boot();
