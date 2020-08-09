import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
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
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  })

  test('has an add button', () => {
    expect(container.querySelector('.btn-plus')).not.toBeNull();
    expect(getByText(container, '+')).toBeInTheDocument();
  })

  test('has a subtract button', () => {
    expect(container.querySelector('.btn-subtract')).not.toBeNull();
    expect(getByText(container, '-')).toBeInTheDocument();
  })

  test('can add two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");

    fireEvent.change(number1, {target: { value: 5 } });
    fireEvent.change(number2, {target: { value: 3 } });

    const button = getByText(container, '+');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(8);
  })


  test('can subtract two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");

    fireEvent.change(number1, {target: { value: 5 } });
    fireEvent.change(number2, {target: { value: 3 } });

    const button = getByText(container, '+');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(2);
  })


  test('can multiple two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");

    fireEvent.change(number1, {target: { value: 5 } });
    fireEvent.change(number2, {target: { value: 3 } });

    const button = getByText(container, '+');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(15);
  })


  test('can divide two numbers', () => {

    let number1 = container.querySelector("#Input_1");
    let number2 = container.querySelector("#Input_2");

    fireEvent.change(number1, {target: { value: 6 } });
    fireEvent.change(number2, {target: { value: 3 } });

    const button = getByText(container, '+');
    fireEvent.click(button);

    let result = container.querySelector("#result");
    expect(parseFloat(result.innerHTML)).toBe(2);
  })


})