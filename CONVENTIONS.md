# Project Naming Conventions

## Overview

Establishing a consistent naming convention for projects helps ensure clarity, maintainability, and scalability. This document outlines best practices for naming projects across different environments and use cases.

---

## **1. General Naming Principles**

- Use **kebab-case** (lowercase words separated by hyphens) for project names.
- Keep names **short, descriptive, and meaningful**.
- Avoid special characters and spaces.
- Use **standard prefixes** for different project types.
- Follow a **modular structure** for sub-projects and services.

---

## **2. Naming Structure**

### **2.1. General Format**

```ts
<project-type>-<project-name>
```

- `project-type`: Defines the category of the project (e.g., `api`, `web`, `service`).
- `project-name`: The specific name of the project, describing its purpose.

### **2.2. Examples**

| **Project Type** | **Naming Convention** | **Example**          |
| ---------------- | --------------------- | -------------------- |
| Web Application  | `web-<name>`          | `web-dashboard`      |
| API Service      | `api-<name>`          | `api-authentication` |
| Backend Service  | `service-<name>`      | `service-email`      |
| Mobile App       | `mobile-<name>`       | `mobile-tracker`     |
| Library          | `@lib/<name>`         | `@lib/utils`         |
| CLI Tool         | `@cli/<name>`         | `@cli/generator`     |

---

## **3. Avoid These Naming Mistakes**

❌ **Using spaces or underscores** (`web_dashboard` ❌)  
❌ **Using overly generic names** (`service-1` ❌)  
❌ **Skipping project type** (`authentication` ❌ → `api-authentication` ✅)  
❌ **Using unnecessary abbreviations** (`svc-mail` ❌ → `service-email` ✅)

---

## **74. Types**

### **4.1 Database table types**

Database table types should get `Model` suffix which indicates that it is used for database tables, for example

```ts
export type ProductModel = {};
export type UserModel = {};
export type CategoryModel = {};
```

### **4.1.1 Database table types file names**

File name should be in dot format, for example `product.model.ts`, `category.model.ts`

### **4.2 Utility types**

Utility type names should describe the purpose of the type clearly, for example

```ts
export type KeOf<T> = keyof T;
export type Keys<T> = (keyof T)[];
export type PickRequired<T, R> = Omit<T, R> & Required<Pick<T, R>>;
```

### **4.2.1 Utility types file names**

File name should be in `kebab-case` format, for example `key-of`, `keys`, `pick-required`

## **5 Database entity classes**

Class name should be a plain name such as `Product`, `Category`, `Department`

## **5.1 Database entity classes file names**

File name should be in dot format such as `product.entity.ts`,`category.entity.ts`

## **5 Database view classes**

Class name should have `View` suffix such as `ProductView`, `CategoryView`, `DepartmentView`

## **5.1 Database view classes file names**

File name should be in dot format such as `product.view.ts`,`category.view.ts`

## **7 DTO classes**

Class name should be a plain name such as `Product`, `Category`, `Department`

## **7.1 DTO classes file names**

File name should be in dot format such as `create-product.dto.ts`,`update-category.dto.ts`, `query-product.dto.ts`

## **8. Conclusion**

A well-defined naming convention enhances collaboration and scalability. Adopting these best practices will ensure consistency across projects and teams.

For any questions, refer to the **project documentation** or contact the project maintainer.
