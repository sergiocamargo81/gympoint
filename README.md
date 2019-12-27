
# GYMPOINT
Rocketseat Gympoint
Desafio final do Bootcamp 9.0

# Requisitos
Postgres

Redis

Reactotron

Sentry.io

Mailtrap.io

Emulador Android

# Backend
1. Faça uma cópia do arquivo **.env.example** e renomei-o para **.env**.  <br>
  Preenchar os campos com suas configurações.
   
No terminal, no diretório do projeto, execute:

2. **yarn** <br>
  Para baixar todas as dependências.
   
3. **yarn sequelize db:create <br>
   yarn sequelize db:migrate <br>
   yarn sequelize db:seed:all** <br>
   Para criar o banco de dados, aplicar as migrações e iniciar suas tabelas.
   
4. **yarn queue** <br>
   Para iniciar o serviço de fila que envia os e-mails.
   
5. **yarn dev** <br>
   Para iniciar o backend
   
Nota: Caso queira testar as rotas no Insomnia, há um arquivo para importação chamado Insomnia.json na raiz do projeto com todas as rotas utilizadas.
   
# Frontend
1. Faça uma cópia do arquivo **.env.example** e renomei-o para **.env**.  <br>
   Preenchar os campos com suas configurações.
   
2. Inicie o **Reactotron**  <br>
   Para acompanhar eventos redux.

No terminal, no diretório do projeto, execute:

3. **yarn** <br>
   Para baixar todas as dependências.
   
4. **yarn start** <br>
   Para iniciar o frontend
   
Nota: Para logar na aplicação utilize o usuário **admin@gympoint.com** com a senha **123456**.
   
# Mobile
<b>IMPORTANTE</b>: Desenvolvido e testado apenas para <b>ANDROID</b>.

1. Faça uma cópia do arquivo **.env.example** e renomei-o para **.env**.  <br>
   Preenchar os campos com suas configurações.
   
2. Inicie o **Reactotron** <br>
   Para acompanhar eventos redux.

3. Inicie o **emulador Android** <br>

No terminal, no diretório do projeto, execute:

4. **yarn** <br>
   Para baixar todas as dependências.
   
5. **react-native start --reset-cache** <br>
   Para iniciar o bundle

6. **react-native run-android** <br>
   Para instalar e rodar o aplicativo gympoint
   
7. Caso **Reactotron** não conecte, executar **adb reverse tcp:9090 tcp:9090**, fechar o aplicativo gympoint e abri-lo novamente.
   