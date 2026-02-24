import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🚀 Interceptor is attaching credentials to:', req.url);

  const authReq= req.clone({
    withCredentials: true
  });

  return next(authReq);
};
