import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
reloadOnUpdate("pages/background");
console.log("background loaded broooooo");


// import { createMachine, interpret } from 'xstate';

// const serviceWorkerMachine = createMachine({
//   id: 'serviceWorker',
//   initial: 'registered',
//   states: {
//     registered: {
//       on: {
//         INSTALL: 'installed',
//         MESSAGE: 'messageReceived',
//       },
//     },
//     installed: {
//       on: {
//         ACTIVATE: 'activated',
//         MESSAGE: 'messageReceived',
//       },
//     },
//     activated: {
//       on: {
//         MESSAGE: 'messageReceived',
//       },
//     },
//     messageReceived: {
//       on: {
//         ACTIVATE: 'activated',
//       },
//     },
//   },
// });


// const serviceWorkerService = interpret(serviceWorkerMachine).start();

// serviceWorkerService.onTransition((state) => {
//   console.log('Current state from xstate message:', state.value);
// });

// // Triggering events
// // serviceWorkerService.send('INSTALL'); 
// // serviceWorkerService.send('ACTIVATE'); 
// // serviceWorkerService.send('MESSAGE');
// // serviceWorkerService.send('ACTIVATE'); 





// chrome.runtime.onStartup.addListener(() => {
//     console.log("Service worker registered (onStartup)");
//   });
  

//   self.addEventListener("install", (event) => {
//     console.log("Service worker installed (install event)");
//     serviceWorkerService.send('INSTALL');
//   });
  
  
//   self.addEventListener("activate", (event) => {
//     console.log("Service worker activated (activate event)");
//     serviceWorkerService.send('ACTIVATE');
//   });
  
  
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Message received:", message);
//     serviceWorkerService.send('MESSAGE');
    
//   });
  





import { createMachine, interpret } from 'xstate';
import { fromEvent } from 'rxjs';

const serviceWorkerMachine = createMachine({
  id: 'serviceWorker',
  initial: 'registered',
  states: {
    registered: {
      on: {
        INSTALL: 'installed',
        MESSAGE: 'messageReceived',
      },
    },
    installed: {
      on: {
        ACTIVATE: 'activated',
        MESSAGE: 'messageReceived',
      },
    },
    activated: {
      on: {
        MESSAGE: 'messageReceived',
        
      },
    },
    messageReceived: {
      on: {
        ACTIVATE: 'activated',
      },
    },
  },
});


// Usage
const serviceWorkerService = interpret(serviceWorkerMachine).start();


 serviceWorkerService.onTransition((state) => {
    console.log('Current State from xstate:', state.value);
   });


// Use RxJS fromEvent to create observables for the 'install', 'activate', and 'message' events
fromEvent(self, 'install').subscribe((event) => {
  console.log('Service worker installed (install event)');
  serviceWorkerService.send('INSTALL');
});

fromEvent(self, 'activate').subscribe((event) => {
  console.log('Service worker activated (activate event)');
  serviceWorkerService.send('ACTIVATE');
  fetch('http://ip.jsontest.com/', {
    method: 'GET',
  }).then(res => {
   
    return res.json();
  }).then(res => {
    console.log(res)
    console.log(res.ip)
  }).catch((err)=>{
    console.log("error bro",err);
  })
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  serviceWorkerService.send('MESSAGE');
  // You can use sendResponse to send a response back to the sender if needed.
});

chrome.runtime.onInstalled.addListener(function(details) {
  console.log("extension installed ...................")
});


// We no longer need to unsubscribe from the RxJS observables because this code runs within a service worker or extension background page.
