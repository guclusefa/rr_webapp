// Form submit validation
export function withSubmitValidation(callback) {
    return async function () {
        // Set submitted to true and validate form
        this.submitted = true;
        if (!this.validateForm()) {
            return;
        }
        // for each field, if it's empty, remove it from the body
        for (const [key, value] of Object.entries(this.body)) {
            if (value === "") delete this.body[key];
        }
        // The logic of the form submit
        await callback.apply(this, arguments);
    };
}
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
export function validateEmailConfirmation(email, emailConfirm, submitted) {
    if (submitted) {
        if (!emailConfirm.trim()) {
            return "user.email_confirmation_required";
        }
        if (email !== emailConfirm) {
            return "user.email_confirmation_invalid";
        }
    }
    return "";
}
export function validatePassword(password, submitted) {
    if (submitted) {
        if (!password.trim()) {
            return "user.password_required";
        }
        if (password.length < 6) {
            return "user.password_length";
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
export function validateAcceptTerms(acceptTerms, submitted) {
    if (submitted) {
        if (!acceptTerms) {
            return "register.accept_terms_required";
        }
    }
    return "";
}
export function validatePhoto(photo, submitted) {
    if (submitted) {
        if (photo.size) {
            // 5 MB
            if (photo.size > 5242880) {
                return "user.photo_size";
            }
            if (!photo.type.includes("image")) {
                return "user.photo_invalid";
            }
        }
    }
    return "";
}

export function validateTitle(title, submitted) {
    if (submitted) {
        if (!title.trim()) {
            return "resource.title_field_required";
        }
    }
    return "";
}

// wysiwyg
export function validateWysiwyg(content, submitted) {
    if (submitted) {
        if (!content.trim()) {
            return "resource.content_required";
        }
    }
    // check if not empty html tags
    if (content.replace(/<[^>]*>?/gm, "").trim() === "") {
        return "resource.content_required";
    }
    return "";
}

// content
export function validateContent(content, submitted) {
    if (submitted) {
        if (!content.trim()) {
            return "resource.content_required";
        }
    }
    return "";
}

// link, must be https
export function validateLink(link, submitted) {
    if (submitted && link) {
        if (!link.startsWith("https://")) {
            return "resource.link_invalid";
        }
    }
    return "";
}

// relation
export function validateRelation(relation, submitted) {
    if (submitted) {
        if (!relation) {
            return "resource.relation_required";
        }
    }
    return "";
}

export function validateMedia(media, submitted) {
    if (submitted) {
        if (media.size) {
            // 10 MB
            if (media.size > 10485760) {
                return "resource.media_size";
            }
            if (!media.type.includes("image") && !media.type.includes("video")) {
                return "resource.media_invalid";
            }
        }
    }
    return "";
}

// comment
export function validateComment(comment, submitted) {
    if (submitted) {
        if (!comment.trim()) {
            return "comment.comment_required";
        }
    }
    return "";
}