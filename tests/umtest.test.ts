// Seu código que contém o console.log
function minhaFuncao() {
  console.log('Olá, mundo!');
}

// Seu arquivo de teste usando Jest
test('Testando console.log', () => {
  // Espionar o console.log
  const consoleSpy = jest.spyOn(console, 'log');

  // Chamar a função que contém o console.log
  minhaFuncao();

  // Verificar se o console.log foi chamado com os argumentos corretos
  expect(consoleSpy).toHaveBeenCalledWith('Olá, mundo!');

  // Restaurar a implementação original do console.log
  consoleSpy.mockRestore();
});
