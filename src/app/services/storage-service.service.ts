import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage.config';
import { LocalUser } from '../models/users/local-user';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  constructor(private router: Router) { }
  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser) {

    if (obj == null){
        localStorage.removeItem(STORAGE_KEYS.localUser);

    }else{
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }

  }

  theresAnyUserLogged(){
    if(this.getLocalUser()===null){
      this.router.navigateByUrl('/sign-page');
    }
  }

  logout(){
    this.setLocalUser(null);
  }

}
