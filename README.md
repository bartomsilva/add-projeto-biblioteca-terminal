# add-projeto-biblioteca-terminal
## Todas funcionalidades básicas solicitadas foram implementadas:
- todas classes foram construídas dentro da pasta class
  
  ![image](https://github.com/bartomsilva/add-projeto-biblioteca-terminal/assets/106079184/988f67ff-82cd-44ef-8cf2-3c78c745a7d2)
  
- o index.ts faz apenas uso das funcionalidades implementadas, não fiz uma modularização, devido ao curto espaço de tempo.

![image](https://github.com/bartomsilva/add-projeto-biblioteca-terminal/assets/106079184/e098ea04-5b0b-4a42-8cc0-ef8bcb46ac42)

- para poder salvar os dados utilizei uma lib chamada localstorage (limita recursos de memória)
- gostei deste projetinho, breve vou transformar em um app react e mais refinado.
  

## DESCRIÇÃO ORIGINAL
Sistema de Gerenciamento de Biblioteca
Considere o desenvolvimento de um sistema de gerenciamento de biblioteca em TypeScript. Este 
sistema deve permitir a gestão de livros, autores e usuários. Os requisitos básicos são:
### Livro:
• Um livro possui atributos como título, autor, anoPublicacao, e genero.
• Implemente métodos para emprestar e devolver livros.

### Autor:
• Um autor possui atributos como nome, dataNascimento e nacionalidade.
• Implemente métodos para adicionar e remover livros associados ao autor.

### Usuário:
• Um usuário possui atributos como nome, email e livrosEmprestados.
• Implemente métodos para emprestar e devolver livros.

### Biblioteca:
• A biblioteca é responsável por manter registros de livros, autores e usuários.
• Implemente métodos para adicionar e remover livros, autores e usuários.
• Forneça métodos para buscar livros por autor, listar livros emprestados, etc.

### Relatórios:
• Crie um mecanismo para gerar relatórios, como listar todos os livros emprestados, livros 
disponíveis, etc.
Testes:
• Desenvolva testes unitários para garantir a integridade do sistema.
• Considere cenários como tentativa de empréstimo de livro indisponível, adição de autor sem 
livros associados, etc.

### Requisitos Técnicos:
• Utilize classes e interfaces para modelar livros, autores e usuários.
• Implemente métodos construtores, getters, setters e métodos específicos para cada classe.
• Utilize herança e composição conforme apropriado.
• Considere a utilização de decorators para adicionar funcionalidades específicas, como logging de 
operações.

### Observações:
Não existe código “mais correto”, existe abstração! Crie utilizando as melhores práticas de 
Orientações a Objetos.
Não se preocupe caso falte implementação de alguma funcionalidade, faça o melhor possível, o 
importante é aprender e demonstrar o que entendeu.

