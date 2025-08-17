# Finansys FrontEnd
# teste
## Requisitos
- Node.js (recomendado: versão 18.x ou superior)
- npm (geralmente instalado junto com o Node.js)

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Guilherme1997/Finansys.git
   ```
2. Acesse a pasta do FrontEnd:
   ```sh
   cd Finansys/FrontEnd
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Executando o Projeto Localmente


### Importante para usuários Windows

Antes de iniciar o servidor, execute o comando abaixo no terminal:

```sh
set NODE_OPTIONS=--openssl-legacy-provider
```

**Motivo:**
Em algumas versões do Node.js, especialmente a partir da v17, o Angular pode apresentar erros relacionados ao OpenSSL ao iniciar o projeto. O parâmetro `--openssl-legacy-provider` garante compatibilidade com dependências que ainda não suportam a versão mais recente do OpenSSL.

1. Inicie o servidor de desenvolvimento Angular:
   ```sh
   npm start
   ```
   ou
   ```sh
   ng serve
   ```
2. Acesse no navegador:
   [http://localhost:4200](http://localhost:4200)

## Testes

Para rodar os testes unitários:
```sh
npm test
```

## Observações
- Certifique-se de que a API (backend) esteja rodando, caso o projeto dependa dela.
- Para outras configurações, consulte o arquivo `angular.json` ou a documentação do Angular.
