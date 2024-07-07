# Formulário de Pedido - Desafio 2 - Jitterbit

## Índice

1. [Introdução](#introdução)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [JavaScript](#javascript)
4. [Componentes](#componentes)
5. [Funcionamento](#funcionamento)

## Introdução

Este projeto consiste em um formulário de pedido para um e-commerce, desenvolvido com HTML, CSS e JavaScript. O objetivo é coletar informações do cliente e do pedido, incluindo dados pessoais, endereço de entrega e detalhes do pedido.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
/
├── index.html
├── style.css
├── README.MD
├── .gitignore
└── src/
    └── assets/
        ├── logo-jitterbit.svg/
        └── images-redes-sociais.png
    └── components/
        ├── header/
        │   └── header.html
        ├── footer/
        │   └── footer.html
        └── endereco/
            └── estados.html
            └── uf.json
```

## JavaScript

### Validação e Exibição dos Dados do Formulário (script.js)

```javascript
function exibirDados(event) {
  event.preventDefault();
  const form = document.getElementById("order-form");
  const formData = new FormData(form);
  let dados = "";
  for (const pair of formData.entries()) {
    dados += `${pair[0]}: ${pair[1]}\n`;
  }
  alert(`Dados do formulário:\n${dados}`);
  return false;
}
```

## Componentes

### Header (header.html)

```html
<header>
  <!-- Conteúdo do header -->
</header>
```

### Footer (footer.html)

```html
<footer>
  <!-- Conteúdo do footer -->
</footer>
```

### Dropdown de Estados (estados.html)

```html
<label for="estado">Estado:</label>
<select id="estado" name="estado" required>
  <option value="">Selecione o estado</option>
  <option value="SP">São Paulo</option>
  <option value="RJ">Rio de Janeiro</option>
  <!-- Outros estados -->
</select>
```

## Funcionamento

1. O formulário é composto por três partes principais: Informações do Cliente, Endereço de Entrega e Informações do Pedido.
2. Campos obrigatórios são indicados com o atributo `required`.
3. O formulário é validado e exibido via JavaScript.
4. Componentes reutilizáveis, como o header, footer e dropdown de estados, são importados via `iframe`.

