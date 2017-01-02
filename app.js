// Logic (functional)
function main(sources) {
  const click$ = sources.DOM;

  const sinks = {
    DOM: click$
      .startWith(null)
      .flatMapLatest(() => Rx.Observable.timer(0, 1000).map(i => `Seconds elapsed ${i}`)),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i),
  };
  return sinks;
}

// Drivers (imperative)
function DOMDriver(text$) {
  text$.subscribe(text => {
    const container = document.querySelector('#app');
    container.textContent = text;
  });

  const DOMSource = Rx.Observable.fromEvent(document, 'click');
  return DOMSource;
}

function consoleLogDriver(msg$) {
  msg$.subscribe(msg => console.log(msg));
}

function run(mainFn, drivers) {
  const proxySources = {};
  Object.keys(drivers).forEach(key => {
    proxySources[key] = new Rx.Subject();
  });

  const sinks = mainFn(proxySources);
  Object.keys(drivers).forEach(key => {
    const source = drivers[key](sinks[key]);
    source.subscribe(x => proxySources[key].onNext(x));
  });
}

const driversFunctions = {
  DOM: DOMDriver,
  Log: consoleLogDriver,
}

run(main, driversFunctions);
