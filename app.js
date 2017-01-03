const {label, input, h1, hr, div, makeDOMDriver} = CycleDOM;

// Logic (functional)
function main(sources) {
  const inputEv$ = sources.DOM.select('.field').events('input');
  const name$ = inputEv$.map(ev => ev.target.value).startWith('');
  return {
    DOM: name$.map(name =>
      div([
        label('Name:'),
        input('.field', {type: 'text'}),
        hr(),
        h1(`Hello ${name}!`)
      ])
    )
  }
}

// Drivers (imperative)
const driversFunctions = {
  DOM: makeDOMDriver('#app'),
}

Cycle.run(main, driversFunctions);
