const loginTab = (myUrl) => {
  const windowArea = {
    width: Math.floor(window.outerWidth * 0.8),
    height: Math.floor(window.outerHeight * 0.5),
  };

  if (windowArea.width < 1200) {
    windowArea.width = 1200;
  }
  if (windowArea.height < 800) {
    windowArea.height = 800;
  }
  windowArea.left = Math.floor(
    window.screenX + (window.outerWidth - windowArea.width) / 2
  );
  windowArea.top = Math.floor(
    window.screenY + (window.outerHeight - windowArea.height) / 8
  );

  //   const sep = myUrl.indexOf("?") !== -1 ? "&" : "?";
  //   const url = `${myUrl}${sep}`;
  const url = myUrl;

  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
        width=${windowArea.width},height=${windowArea.height},
        left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(url, "_blank", windowOpts);
  // Create IE + others compatible event handler
  const eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  const eventer = window[eventMethod];
  const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  const authPromise = new Promise((resolve, reject) => {
    eventer(
      messageEvent,
      (msg) => {
        // if (
        //   !~msg.origin.indexOf(
        //     `${window.location.protocol}//${window.location.host}`
        //   )
        // ) {
        //     console.log()
        //   authWindow.close();
        //   reject("Not allowed");
        // }

        if (msg.data.payload) {
          try {
            resolve(JSON.parse(msg.data.payload));

            authWindow.close();
          } catch (e) {
            resolve(msg.data.payload);
            console.log(msg.data.payload);
            // authWindow.close();
          }
        } else {
          authWindow.close();
          reject("Unauthorised");
        }
      },
      false
    );
  });

  return authPromise;
};

export default loginTab;
