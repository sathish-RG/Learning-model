// Maps the backend's validation details ([{ field, message }]) to { field: message }
export const toFieldErrors = (details = []) => Object.fromEntries(details.map((d) => [d.field, d.message]));
