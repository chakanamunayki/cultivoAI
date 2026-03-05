const originalWarn = console.warn.bind(console);

const IGNORED_WARNING_PATTERNS = [
  /^\[baseline-browser-mapping\] The data in this module is over two months old\./,
];

console.warn = (...args) => {
  const message = args.map((value) => String(value)).join(" ");

  if (IGNORED_WARNING_PATTERNS.some((pattern) => pattern.test(message))) {
    return;
  }

  originalWarn(...args);
};
