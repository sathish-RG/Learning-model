// A pretend server (locked): answers after 800 milliseconds.
export function fetchUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ name: "Asha" }, { name: "Ravi" }, { name: "Meera" }]), 800);
  });
}
