// Lesson 28: errors and debugging.
const inputs = [
  '{"name":"Asha","age":24}',
  'not json',
  '{"name":"Ravi"}',
  '{"name":"","age":30}',
];

function parseUser(text) {
  const data = JSON.parse(text);
  // 3. Validate the name and age here
  return `${data.name.toUpperCase()} is ${data.age}`;
}

const valid = [];

inputs.forEach((text, index) => {
  const number = index + 1;
  // 2 & 4. Wrap this in try / catch / finally
  const result = parseUser(text);
  console.log(result);
  // 5. Keep the good ones
});

// 5. Show the valid users as a table

