interface Global {
  checkIfExistByTestId: (testId: string) => void
}

declare var global: Global
