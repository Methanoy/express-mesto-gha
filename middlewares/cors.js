module.exports.corsOptions = {
  origin: [
    'http://localhost:3010',
    'https://localhost:3010',
    'http://methanoy.nomoredomains.sbs',
    'https://methanoy.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Accept', 'Authorization'],
  credentials: true,
};
