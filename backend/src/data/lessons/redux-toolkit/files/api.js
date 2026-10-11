// A pretend server (locked): returns the starter tasks after 600ms.
export function fakeFetchTasks() {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: 1, title: "Learn Redux Toolkit", done: false },
          { id: 2, title: "Understand slices", done: true },
        ]),
      600,
    );
  });
}
