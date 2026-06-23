import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import App from "./App";

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterAll(() => {
  delete global.IntersectionObserver;
});

describe("App GitHub links", () => {
  test("renders GitHub links with the correct profile URL", () => {
    render(<App />);

    const viewGithubLink = screen.getByRole("link", { name: /view github/i });
    expect(viewGithubLink).toBeInTheDocument();
    expect(viewGithubLink).toHaveAttribute("href", "https://github.com/Kanishkumarp");
    expect(viewGithubLink).toHaveAttribute("target", "_blank");
    expect(viewGithubLink).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

    const githubContactLink = screen
      .getAllByRole("link", { name: /github/i })
      .find((link) => link.textContent?.includes("github.com/Kanishkumarp"));

    expect(githubContactLink).toBeDefined();
    expect(githubContactLink).toHaveAttribute("href", "https://github.com/Kanishkumarp");
  });

  test("does not render an incorrect GitHub profile link", () => {
    render(<App />);

    expect(screen.queryByRole("link", { name: /github.com\/invaliduser/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href="https://github.com/invaliduser"]')).not.toBeInTheDocument();
  });
});
