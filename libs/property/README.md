<p align="center">
  <img src="https://raw.githubusercontent.com/rbrightline/puq/refs/heads/main/libs/property/favicon.png" alt="Logo" />
</p>

# @puq/property

## Install

```bash
  pnpm add @puq/property
```

## Summary

The `@Property({...})` decorator is a powerful and versatile property decorator designed for NestJS applications. It seamlessly integrates validation and API documentation, ensuring that Data Transfer Objects (DTOs) are strongly typed, validated, and well-documented using Swagger. This decorator supports a wide range of data types, making it an essential tool for streamlining development, reducing boilerplate code, and enhancing API clarity.

#### **Key Features**

- **Automatic Validation:** Leverages `class-validator` to enforce data integrity.
- **Seamless Swagger Integration:** Uses `class-transformer` and `@nestjs/swagger` to generate API documentation automatically.
- **Type-Specific Validations:** Provides built-in validation rules tailored to each data type.
- **Code Simplification:** Reduces the need for redundant decorators by combining validation and documentation into a single, intuitive decorator.

### **Supported Data Types and Validations**

#### **1. String**

Ensures the property is a valid string and allows customization of length, format, and pattern.

```typescript
@Property({ type: 'string', minLength: 3, maxLength: 50})
name: string;
```

**Validations:**

- Minimum and maximum length (`minLength`, `maxLength`)
- Email, URL, and UUID formats (`format: 'email' | 'url' | 'uuid'`)

#### **2. Number**

Validates numerical properties with range and precision constraints.

```typescript
@Property({ type: 'number', minimum: 1, maximum: 100 })
price: number;
```

**Validations:**

- Minimum and maximum value (`minimum`, `maximum`)
- Step/multiple enforcement (`multipleOf`)

#### **3. Integer**

Ensures the property is a valid integer within a specified range.

```typescript
@Property({ type: 'integer', minimum: 1, maximum: 1000 })
count: number;
```

**Validations:**

- Minimum and maximum value (`minimum`, `maximum`)
- Integer constraint (`type: 'integer'`)

#### **4. Boolean**

Ensures the property is a boolean value (`true` or `false`).

```typescript
@Property({ type: 'boolean' })
isActive: boolean;
```

**Validations:**

- Accepts only `true` or `false` values

#### **5. Date**

Validates date properties and ensures proper formatting.

```typescript
@Property({ type: 'string', format: 'date-time' })
createdAt: Date;
```

**Validations:**

- ISO 8601 date format enforcement (`format: 'date-time'`)
- Custom validation for past or future dates (`minimum`, `maximum`)

#### **6. Array**

Ensures the property is an array with specific item types and length constraints.

```typescript
@Property({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 })
tags: string[];
```

**Validations:**

- Minimum and maximum length (`minItems`, `maxItems`)
- Item type enforcement (`items: { type: 'string' | 'number' | 'object' }`)

#### **7. Object**

Validates nested objects within DTOs, ensuring structure and required fields.

```typescript
@Property({ type: 'object', target: ()=> ObjectDto})
object:ObjectDto
```

### **Conclusion**

The `@Property({...})` decorator significantly simplifies DTO validation and documentation in NestJS by combining validation logic with API documentation. By supporting a wide range of data types and providing granular control over validation rules, it enhances code maintainability, reduces errors, and improves API clarity. This decorator is ideal for developers looking to build robust, well-documented, and type-safe applications effortlessly. 🚀

## Funding

Thank you for using `@puq/property` It's an open-source project, and maintaining it takes time and effort. If you find this library useful, please consider supporting its ongoing development. Your contributions help ensure that the project stays up-to-date, secure, and well-maintained.

[Instant Funding](https://cash.app/$puqlib)

### Your funding will go toward

- **Bug fixes and updates** to ensure compatibility with the latest versions of dependencies.
- **New features** that will make the library even more powerful.
- **Documentation** improvements to help users get the most out of [Your Library Name].
- **General maintenance** to keep the library running smoothly and securely.

Contact to the developer: [robert.brightline@gmail.com]

[Support the developer](https://cash.app/$puqlib)
