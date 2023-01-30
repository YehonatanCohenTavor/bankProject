function validateUpdate({ body }, res, next) {
    let errors = [];
    let { email, address, phone } = body;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email) {
        if (!emailRegex.test(email)) errors.push('Email')
    }
    if (address) {
        if (typeof address !== 'string' && address.length < 3) errors.push('Address');
    }
    if (phone) {
        if (!/^\d{3}-?\d{3}-?\d{4}$/.test(phone)) errors.push('Phone');
    }
    if (errors.length > 0) {
        return res.status(400).json(errors);
    } else {
        next();
    }
}

module.exports = validateUpdate;