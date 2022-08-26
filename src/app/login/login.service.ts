import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private listSource = new BehaviorSubject<any[]>([]);
  $getListSource = this.listSource.asObservable();


  constructor() { }
  sendListSource(dataList: any[]) {
    this.listSource.next(dataList)

  }
}
