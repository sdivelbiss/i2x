const MAX = 5;

export const waitForFunc = (condition) =>
  new Promise((resolve, reject) => {
    let count = 0;
    if (count > MAX) {
      reject();
    }
    function timer() {
      count++;
      setTimeout(() => {
        if (condition()) {
          resolve();
        } else {
          timer();
        }
      }, 1000);
    }
    timer();
  });
