import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NotiService {
  constructor() {}

  Noti(msg: string) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      this.doNoti(msg);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          this.doNoti(msg);
        }
      });
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }

  doNoti(msg: string) {
    const notification = new Notification("Bitkub", {
      body: msg,
      icon: "https://www.bitkub.com/static/images/logo-128.png"
    });
    notification.close();
  }
}
