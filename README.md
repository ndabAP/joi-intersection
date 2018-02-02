# joi-intersection

Validate against intersections of arrays and array singletons. Provide an array of allowed groups and validate it 
against a single intersection of a given group. Additionally, define an array of singletons and verify the input array 
occurs only once.

## Features

- Validate groups
- Validate singletons

## Installation

```js
npm install joi-intersection --save
```

## API

### `groups([[group: String]])`

A group contains array of strings. 

| Parameter             | Type              | Description                 |
|-----------------------|-------------------|-----------------------------|
| `group`               | `[group: String]` | Allowed intersection groups |

### `singleton([singleton: String])`

Singletons contain arrays of strings.

| Parameter             | Type                    | Description                 |
|-----------------------|-------------------------|-----------------------------|
| `singleton`           | `[singleton: string]`   | Allowed singleton           |

## Usage

### Extend Joi

You have to extend Joi first, then use it like other validation rules. You can also chain both rules.

```js
import JoiBase from 'joi'
import JoiIntersection from 'joi-intersection'
import * as assert from 'assert'

const Joi = JoiBase.extend(JoiIntersection)
```

### Groups

```js
const schema = Joi.array().groups([
  ['Bob', 'Alex', 'Peter'],
  ['Jack', 'Mike']
])

Joi.validate(['Bob', 'Alex'], schema, error => assert.ok(error, null))
Joi.validate(['Bob', 'Jack'], schema, error => assert.notEqual(error, null))
```

### Singleton

```js
const schema = Joi.array().singleton(['Bob', 'Alex', 'Peter'])

Joi.validate(['Bob'], schema, error => assert.ok(error, null))
Joi.validate(['Bob', 'Bob'], schema, error => assert.notEqual(error, null))
```

## Author

[Julian Claus](https://www.julian-claus.de) and contributors.

## License

MIT
