<p align="center">
  <img src="https://raw.githubusercontent.com/rbrightline/puq/refs/heads/main/libs/tools/favicon.png" alt="Logo" />
</p>

# @puq/tools

## Summary

Powerful CLI for Advanced File & Development Operations

Boost your command-line productivity with this robust CLI library built on the Commander framework. Designed for developers and power users, it streamlines essential I/O operations such as recursive and asynchronous file renaming, replacing, and copying with ease.

Beyond file management, the library includes a suite of developer-friendly commands to enhance workflow automation and efficiency. Whether you're handling bulk file operations or optimizing your development environment, this CLI is your go-to tool for seamless execution.

Empower your command-line experience—effortlessly!

## Install

```bash
  pnpm add @puq/tools
```

## Usage: rename [options]

Rename files recursively

Options:

- **-e, --expression**: <string> regular expression to match files (optional)-
- **-d, --directory**: <string> root directory (optional) (default: ".")-
- **-f, --from**: <items...> placeholder (optional)-
- **-t, --to**: <items...> replacement (required)-
- **-p, --prefix**: <string> prefix-
- **-s, --suffix**: <string> suffix-
- **-r, --recursive**: <boolean> recursive-
- **-h, --help**: display help for command

### Example: rename

```bash
# files
# dto/
#     - create-category.dto.ts
#     - update-category.dto.ts
# - category.entity.ts
# - category.view.ts

tools rename -e category -f category -t __fileName__ -s ".template"

# output files
# dto/
#     - create-__fileName__.dto.ts
#     - update-__fileName__.dto.ts
# - __fileName__.entity.ts
# - __fileName__.view.ts

```

## Usage: replace [options]

Replace files's content recursively

Options:

- **-d, --directory**: <string> root directory (optional) (default: ".")
- **-e, --expression**: <string> regular expression to match files (optional) (default: "")
- **-f, --from**: <items...> placeholders (requried)
- **-t, --to**: <items...> replacements (requried)
- **-p, --prefix**: <string> prefix (optional)
- **-s, --suffix**: <string> suffix (optional)
- **-h, --help**: display help for command

### Example: replace

This command will replace **Category** text in each file with **<%- className %>** and **category** with **<%- propertyName %>**

```bash
tools replace -e category -f Category category  -t className propertyName -p "<%-" -s "%>"
```

## Funding

Thank you for using `@puq/tools` It's an open-source project, and maintaining it takes time and effort. If you find this library useful, please consider supporting its ongoing development. Your contributions help ensure that the project stays up-to-date, secure, and well-maintained.

[Instant Funding](https://cash.app/$puqlib)

### Your funding will go toward

- **Bug fixes and updates** to ensure compatibility with the latest versions of dependencies.
- **New features** that will make the library even more powerful.
- **Documentation** improvements to help users get the most out of [Your Library Name].
- **General maintenance** to keep the library running smoothly and securely.

Contact to the developer: [robert.brightline@gmail.com]

[Support the developer](https://cash.app/$puqlib)
