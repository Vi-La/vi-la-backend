const baseUrl = process.env.SERVER_URL;
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'RCC-Rwanda',
			version: '1.0.0',
			description:
				'lorem ipsum',
		},
		servers: [
			{
				url: baseUrl || `http://localhost:5000`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					in: 'header',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./routes/**/*.js'],
};

module.exports = options;
