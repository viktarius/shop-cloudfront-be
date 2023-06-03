import { Observable } from 'rxjs';

export interface IRequestHandler {
    getRequestHandler: (params: string) => Observable<any>
    postRequestHandler: (params: string, body: any) => Observable<any>
}
