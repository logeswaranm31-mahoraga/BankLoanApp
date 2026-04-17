import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Request URL " + req.url)
  console.log("Request method " + req.method)
  console.log("Request body " + req.body)
  let startTime = Date.now();
  return next(req).pipe(
    tap({
    error:(err)=>{console.log(err);
    },
    complete:()=>{
      console.log(`Time taken by Request "${req.url}" is ${Date.now() - startTime}ms`)
    }
  }));
};
