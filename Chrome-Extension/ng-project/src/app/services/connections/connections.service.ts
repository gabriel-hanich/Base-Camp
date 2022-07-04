import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  constructor(private httpClient: HttpClient) { }

  getPublicKey():Promise<String>{ // Gets the current RSA public key from the server
    return new Promise<String>((resolve, reject)=>{
      this.httpClient.get(environment.apiURL + "/encryption/pubKey").subscribe((res)=>{
        resolve(res as any);
      });
    })
  }

  createNewUser(name: String, email: String, password: String, publicKey: string): Observable<Object>{ 
    // Sends the backend initial data about the user and recieves the encrypted
    // password token for local storage 

    // Encrypt the password using the public key
    const rsa = Forge.pki.publicKeyFromPem(publicKey);
    let pwd = window.btoa(rsa.encrypt(password.toString()));
    return this.httpClient.post(environment.apiURL + "/userData/create", {"name": name, "email": email.toString(), "pwd": pwd});
  }
  
  getUserData(email: String, passwordToken: String): Observable<any>{
    return this.httpClient.post(environment.apiURL + "/userData/read", {"email": email.toString(), "pwdToken": passwordToken});
  }

  validateUserEmail(email: String): Observable<boolean>{
    return this.httpClient.post<boolean>(environment.apiURL + "/userData/validateEmail", {"email": email})
  }

  login(email: string, password: string, publicKey: string){
    // Encrypt the password using the public key
    const rsa = Forge.pki.publicKeyFromPem(publicKey);
    let pwd = window.btoa(rsa.encrypt(password.toString()));
    return this.httpClient.post(environment.apiURL + "/userData/logIn", {"email": email.toString(), "pwd": pwd});
  }

  setUserData(email: string, passwordToken: string, valueKey: string, value: string){
    console.log("SETTING " + valueKey)
    return this.httpClient.post(environment.apiURL + "/userData/set", {"email": email.toString(), "pwdToken": passwordToken, "valKey": valueKey, "val": value});
  }
}
