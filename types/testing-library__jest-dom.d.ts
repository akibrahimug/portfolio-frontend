import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeChecked(): R
      toBeEmpty(): R
      toBeRequired(): R
      toHaveFocus(): R
      toHaveValue(value: string | string[] | number | null): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(html: string): R
    }
  }
}
