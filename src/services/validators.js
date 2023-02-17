// User validations
export function validateUsername(username, submitted) {
    if (submitted) {
        if (!username.trim()) {
            return "login.username_required";
        }
    }
    return "";
}

export function validatePassword(password, submitted) {
    if (submitted) {
        if (!password.trim()) {
            return "login.password_required";
        }
    }
    return "";
}