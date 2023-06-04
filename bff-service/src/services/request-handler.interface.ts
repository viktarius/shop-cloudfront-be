import { Observable } from 'rxjs';

export interface IRequestHandler {
    getRequestHandler: (params: string) => Observable<any>
    postRequestHandler: (body: any) => Observable<any>
    deleteRequestHandler: (params: any) => Observable<any>
}
