const contentSecurityPolicy = {
    'default-src': ["'self'", 'arbeidsgiver.nav.no'],
    'manifest-src': ["'self'", '*.nav.no'],
    'script-src': [
        "'self'",
        "'report-sample'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'www.googletagmanager.com',
        'static.hotjar.com',
        'script.hotjar.com',
        '*.psplugin.com',
        '*.nav.no',
        '*.taskanalytics.com/tm.js',
    ],
    'style-src': [
        "'self'",
        'blob:',
        '*.nav.no',
        "'unsafe-inline'",
        'fonts.googleapis.com',
        'translate.googleapis.com',
    ],
    'connect-src': [
        "'self'",
        '*.nav.no',
        'oidc-ver2.difi.no/idporten-oidc-provider/authorize',
        'idporten-ver2.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp4',
        'amplitude.nav.no',
        'data.brreg.no',
        '*.psplugin.com',
        '*.hotjar.com',
        '*.vc.hotjar.com',
        '*.hotjar.io',
        '*.vc.hotjar.io',
        'wss://*.hotjar.com',
        'api.puzzel.com',
        'nav.boost.ai',
        'sentry.gc.nav.no',
        'ta-survey-v2.herokuapp.com',
    ],
    'font-src': ['data:', '*.psplugin.com', '*.hotjar.com', 'fonts.gstatic.com', '*.nav.no'],
    'frame-src': ['vars.hotjar.com', '*.nav.no'],
    'img-src': [
        "'self'",
        '*.hotjar.com',
        'www.gstatic.com',
        'translate.google.com',
        '*.nav.no',
        'data:',
        'www.googletagmanager.com',
    ],
    'report-uri': [
        'https://sentry.gc.nav.no/api/13/security/?sentry_key=c4ef091d1fb54f01a7f808e621b28948',
    ],
    'worker-src': ["'self'", 'blob:'],
};

export function getCspValue() {
    return Object.entries(contentSecurityPolicy)
        .map((entry) => `${entry[0]} ${entry[1].join(' ')}`)
        .join('; ');
}
