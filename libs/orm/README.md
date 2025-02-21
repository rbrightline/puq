<p align="center">
  <img src="https://raw.githubusercontent.com/rbrightline/puq/refs/heads/main/libs/orm/favicon.png" alt="Logo" />
</p>

# @puq/orm

## Summary

Database entity development is streamlined through the integration of `intuitive` and widely adopted implementations within decorators. These decorators are paired with `class-validator`, `class-transformer`, and `@nestjs/swagger`, enhancing efficiency in the development process. This approach achieves a minimum reduction of `60%` in both `code volume` and associated `errors`.

## Install

```bash
  pnpm add @puq/orm
```

## SQLite

- SQLite does not support `array` or `object` data types. To accommodate this limitation, data must be transformed into a string format.

## Postgres Datasource

To optimize datasource performance, implement the following configuration settings:

- **poolSize**: Set to 50. This defines the maximum number of connections allowed in the pool, ensuring efficient resource utilization while accommodating peak demand.
- **min**: Set to 10. This specifies the minimum number of connections maintained in the pool, keeping a baseline of readily available connections to reduce latency during low-traffic periods.
- **max**: Set to 50. This establishes the upper limit of open connections, balancing system performance with resource availability to prevent overloading.
- **idleTimeoutMillis**: Configure to 30,000 milliseconds. This determines the duration an idle connection remains open before being closed, minimizing unnecessary resource consumption during periods of inactivity.
- **connectionTimeoutMillis**: Configure to 2,000 milliseconds. This sets the maximum time allowed to establish a connection, enhancing application responsiveness by preventing prolonged delays.

## Postgres Server

Adjust the PostgreSQL server configuration file (**postgres.conf**) with the following settings:

- **max_connections**: Set to **200** to accommodate both application and administrative connections, ensuring sufficient capacity.
- **shared_buffers**: Allocate **25-40%** of the server's RAM for optimal performance, configured to **4GB**.
- **work_mem**: Define the memory allocation per query or sort operation, set to **16MB** to enhance query efficiency.

## Numbers

- The `number` data type is stored as a string (numeric) to ensure the preservation of precision.
- The `number` value is not converted to a JavaScript number to avoid disrupting query operations.

## Typeorm Column Transformer

- Refrain from using TypeORM column transformers, as they may interfere with query operations. Instead, implement transformations within the data transfer layer.

### Hashing and encrypion

- Hashing should be done in database layer. Typeorom column transformer is safe to use
- Encryption is done in controller layer
- For handling encrypted data, implement a dedicated data transfer object (DTO) class and apply it subsequent to the execution of the initial DTO class within the controller

## Funding

Thank you for using `@puq/orm` It's an open-source project, and maintaining it takes time and effort. If you find this library useful, please consider supporting its ongoing development. Your contributions help ensure that the project stays up-to-date, secure, and well-maintained.

[Instant Funding](https://cash.app/$puqlib)

### Your funding will go toward

- **Bug fixes and updates** to ensure compatibility with the latest versions of dependencies.
- **New features** that will make the library even more powerful.
- **Documentation** improvements to help users get the most out of [Your Library Name].
- **General maintenance** to keep the library running smoothly and securely.

Contact to the developer: [robert.brightline@gmail.com]

[Support the developer](https://cash.app/$puqlib)
