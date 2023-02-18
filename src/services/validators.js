// User validators
export function validateUsername(username, submitted) {
    if (submitted) {
        if (!username.trim()) {
            return "user.username_required";
        }
    }
    return "";
}
export function validateEmail(email, submitted) {
    if (submitted) {
        if (!email.trim()) {
            return "user.email_required";
        }
        // check if valid email
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return "user.email_invalid";
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
export function validatePasswordConfirmation(password, passwordConfirm, submitted) {
    if (submitted) {
        if (!passwordConfirm.trim()) {
            return "user.password_confirmation_required";
        }
        if (password !== passwordConfirm) {
            return "user.password_confirmation_invalid";
        }
    }
    return "";
}