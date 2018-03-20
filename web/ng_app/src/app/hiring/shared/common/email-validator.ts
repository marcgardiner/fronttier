export function validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const emailListRegex = /^[A-Z0-9\._%-]+@[A-Z0-9]+\.[A-Z]{2,4}(?:[,][ A-Z0-9\._%-]+@[A-Z0-9]+\.[A-Z]{2,4})*$/i;

export function duplicateEmail(email, recipients): Boolean {
    let dupFlag = false;
    recipients.forEach((elem) => {
      if (elem === email) {
        dupFlag = true;
        return;
      }
    });
    return dupFlag;
  }
