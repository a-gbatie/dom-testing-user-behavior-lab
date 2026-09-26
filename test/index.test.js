/**
 * @jest-environment jsdom
 */

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require("../index.js");

describe("DOM Testing", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="simulate-click">Simulate Click</button>

      <form id="user-form">
        <input type="text" id="user-input">
        <button type="submit">Submit</button>
      </form>

      <div id="dynamic-content"></div>
      <div id="error-message" class="hidden"></div>
    `;
  });

  it("adds content to the correct DOM element", () => {
    addElementToDOM("dynamic-content", "Hello");

    const container = document.getElementById("dynamic-content");

    expect(container.innerHTML).toBe("Hello");
  });

  it("removes an element from the DOM", () => {
    removeElementFromDOM("dynamic-content");

    const container = document.getElementById("dynamic-content");

    expect(container).toBeNull();
  });

  it("updates the DOM when a click is simulated", () => {
    simulateClick("dynamic-content", "Button Clicked!");

    const container = document.getElementById("dynamic-content");

    expect(container.innerHTML).toBe("Button Clicked!");
  });

  it("displays valid form input", () => {
    const input = document.getElementById("user-input");

    input.value = "Hello World";

    handleFormSubmit("user-form", "dynamic-content");

    const container = document.getElementById("dynamic-content");

    expect(container.innerHTML).toBe("Hello World");
  });

  it("displays an error when input is empty", () => {
    const input = document.getElementById("user-input");

    input.value = "";

    handleFormSubmit("user-form", "dynamic-content");

    const errorMessage = document.getElementById("error-message");

    expect(errorMessage.textContent).toBe("Input cannot be empty");
    expect(errorMessage.classList.contains("hidden")).toBe(false);
  });
});