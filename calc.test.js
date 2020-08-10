import {
  fireEvent,
  getByText
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import {
  JSDOM
} from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('calculator functionality', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, {
      runScripts: 'dangerously'
    });
    container = dom.window.document.body;
  })

  test('has an add button', () => {
    expect(container.querySelector('#addition')).not.toBeNull();
    expect(getByText(container, '+')).toBeInTheDocument();
  })

  test('has a subtract button', () => {
    expect(container.querySelector('#subtract')).not.toBeNull();
    expect(getByText(container, '-')).toBeInTheDocument();
  })

  test('can add two numbers', () => {
    let testList = [{
      "imp1": 5,
      "imp2": 3,
      "answer": 8
    }, {
      "imp1": 2,
      "imp2": 3,
      "answer": 5
    }, {
      "imp1": 5,
      "imp2": -5,
      "answer": 0
    }, {
      "imp1": 9,
      "imp2": 11,
      "answer": 20
    }, {
      "imp1": 3,
      "imp2": 7,
      "answer": 10
    }, {
      "imp1": 8,
      "imp2": 4,
      "answer": 12
    }];

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");
    const button = getByText(container, '+');
    let id = 0;
    for (id = 0; id < 6; id++) {

      fireEvent.change(number1, {
        target: {
          value: testList[id].imp1
        }
      });
      fireEvent.change(number2, {
        target: {
          value: testList[id].imp2
        }
      });

      fireEvent.click(button);

      let result = container.querySelector("#result");
      expect(parseFloat(result.innerHTML)).toBe(testList[id].answer);
    }
  });


  test('can subtract two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");

    fireEvent.change(number1, {
      target: {
        value: 5
      }
    });
    fireEvent.change(number2, {
      target: {
        value: 3
      }
    });

    const button = getByText(container, '-');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(2);
  })


  test('can multiple two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");
    const button = getByText(container, '*');

    fireEvent.change(number1, {
      target: {
        value: 5
      }
    });
    fireEvent.change(number2, {
      target: {
        value: 3
      }
    });

    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(15);
  })


  test('can divide two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");

    fireEvent.change(number1, {
      target: {
        value: 6
      }
    });
    fireEvent.change(number2, {
      target: {
        value: 3
      }
    });

    const button = getByText(container, '/');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(2);
  })



})