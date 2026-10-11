// A pretend server (locked). "/users" works; any other URL fails. Answers after 600ms.
export function fakeApi(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "/users") resolve([{ name: "Asha" }, { name: "Ravi" }, { name: "Meera" }]);
      else reject(new Error(`Not found: ${url}`));
    }, 600);
  });
}
