#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../src/main';

/**
  * Get port from environment and store in Express.
  */

const port = process.env.PORT || '3030';
app.set('port', port);

app.listen(app.get('port'), () => console.log(`Server started on port: ${port}`));
