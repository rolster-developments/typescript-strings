# Rolster String Utilities

Utility package for manipulating String compatible with Typescript projects.

## Installation

```
npm i @rolster/strings
```

## Configuration

You must install the `@rolster/types` to define package data types, which are configured by adding them to the `files` property of the `tsconfig.json` file.

```json
{
  "files": ["node_modules/@rolster/types/index.d.ts"]
}
```

## Features

### Characters

| Function           | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `firstChar(value)` | Returns the first character, or `''` when the string is empty.|
| `lastChar(value)`  | Returns the last character, or `''` when the string is empty. |

```typescript
import { firstChar, lastChar } from '@rolster/strings';

firstChar('Rolster'); // 'R'
lastChar('Rolster'); // 'r'
firstChar(''); // ''
```

### Normalize accents

`normalize` removes diacritics (accents, tildes) using Unicode normalization,
which is handy for accent-insensitive comparisons and search.

```typescript
import { normalize } from '@rolster/strings';

normalize('Medellín'); // 'Medellin'
normalize('árbol'); // 'arbol'
```

### Search coincidence

`coincidence` performs a case-insensitive "contains" check. Set the third
argument to `true` to also ignore accents.

```typescript
import { coincidence } from '@rolster/strings';

coincidence('Daniel Castillo', 'castillo'); // true
coincidence('Medellín', 'medellin', true); // true (accent-insensitive)
coincidence('Rolster', 'angular'); // false
```

### Initials

`initials` builds an avatar-style label. With a single word it takes the first
`size` characters; with several words it combines the first character of the
first and last word.

```typescript
import { initials } from '@rolster/strings';

initials('Daniel Castillo'); // 'DC'
initials('Rolster'); // 'RO'
initials('Rolster', 3); // 'ROL'
```

### Template interpolation

`interpolation` replaces `{...}` placeholders in a template. It accepts an
object (keyed placeholders) or an array (indexed placeholders). When no value
is provided and the template still has placeholders, it returns `''`.

```typescript
import { interpolation } from '@rolster/strings';

interpolation('Hello {name}, welcome to {app}', {
  name: 'Daniel',
  app: 'Rolster'
});
// 'Hello Daniel, welcome to Rolster'

interpolation('{0} + {1} = {2}', [2, 3, 5]);
// '2 + 3 = 5'

interpolation('Plain text without placeholders');
// 'Plain text without placeholders'
```

## Contributing

- Daniel Andrés Castillo Pedroza :rocket:
