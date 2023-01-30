function validateForm({ body }, res, next) {
    let errors = [];
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    if (body.password.length < 2) errors.push("Password");
    if (body.username < 4 || body.uesrname > 10) errors.push("Username");
    if (!emailRegex.test(body.email)) errors.push('Email ')
    if (body.first_name.length < 2 || typeof body.first_name !== 'string') errors.push('First name');
    if (body.last_name.length < 2 || typeof body.last_name !== 'string') errors.push('Last name');
    if (!(/^\d{9}/).test(body.identity_number)) errors.push('identity number');
    if (typeof body.address !== 'string' && body.address.length < 3) errors.push('Address');
    if (!dateRegex.test(body.birth_date)) errors.push('Birth date');
    if (!/^\d{3}-?\d{3}-?\d{4}$/.test(body.phone)) errors.push('Phone');
    if (typeof body.branch !== 'string') errors.push('Branch');
    if (errors.length > 0) {
        return res.status(400).json(errors);
    } else {
        next();
    }
}

module.exports = validateForm;