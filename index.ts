import express, { Request, Response, NextFunction} from 'express';

import http from 'http';
import createError from 'http-errors'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import gatewaysRouter from './routes/gateways';
import peripheralsRouter from './routes/peripherals';

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/gateways', gatewaysRouter);
app.use('/peripherals', peripheralsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; send: (arg0: string) => void; }, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Error');
  // res.render('error')
});

export default app;