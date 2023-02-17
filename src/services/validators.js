// User validators
export function validateUsername(username, submitted) {
    if (submitted) {
        if (!username.trim()) {
            return "user.username_required";
        }
    }
    return "";
}
export function validatePassword(password, submitted) {
    if (submitted) {
        if (!password.trim()) {
            return "user.password_required";
        }
    }
    return "";
}