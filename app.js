const {h, h1, span, makeDOMDriver} = CycleDOM;

// Logic (functional)
function main(sources) {
  const mouseover$ = sources.DOM.select('span').events('mouseover');

  const sinks = {
    DOM: mouseover$
      .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
          .map(i =>
            h1([
              span([
                `Seconds elapsed ${i}`
              ])
            ])
          )
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i),
  };
  return sinks;
}

// Drivers (imperative)

function consoleLogDriver(msg$) {
  msg$.subscribe(msg => console.log(msg));
}

const driversFunctions = {
  DOM: makeDOMDriver('#app'),
  Log: consoleLogDriver,
}

Cycle.run(main, driversFunctions);
