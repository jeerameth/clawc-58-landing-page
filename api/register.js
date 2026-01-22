export default function handler(request, response) {
    const registrationUrl = process.env.REGISTRATION_URL || 'https://script.google.com/macros/s/AKfycbzvMONezj4jEJtFh2oWdh9PKjiXSn__h9cft5PAt6B_TcFJ88JJLWbDdC8rOsON5ixVKg/exec';

    response.redirect(307, registrationUrl);
}
