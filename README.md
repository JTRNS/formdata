# FormData Parser

A utility module for parsing FormData objects and converting them into plain JavaScript objects.

## Usage

### Demo

Available on Deno Deploy: https://dash.deno.com/playground/formdata-deno-demo

### Example

```ts
import { parseFormData } from "https://deno.land/x/formdata@v0.1.0-dev/mod.ts";

const formData = new FormData();
// handles multiple values for the same key
formData.append("name", "John");
formData.append("name", "Jane");
// integers and floats
formData.append("age", "23");
formData.append("price", "100.99");
// date input values
formData.append("created_at", "2013-01-07");
// checkbox input values
formData.append("is_ok", "on");
formData.append("send_spam", "false");

const parsedData = parseFormData(formData);
```

## Contributions

Contributions are welcome! To submit a contribution, fork the repository and create a pull request.

## License

The FormData Parser module is licensed under the MIT License. See the LICENSE file for details.
