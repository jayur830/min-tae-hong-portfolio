// Package

// Global
import { app, upload, config } from '@root/modules';

// Local

app.post(upload.single('img'), (request, response) => {
	response.send(200);
});

export default app;

export { config };
