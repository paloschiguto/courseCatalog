import app from "./src/app";
import { appDataSource } from "./src/data-source";

const PORT = 3002;

app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    Status: "UP",
    Data_hora: new Date()
  });
});

appDataSource.initialize()
  .then(() => {
    console.log("O Banco de dados foi inicializado.");
    app.listen(PORT, () => {
      console.log(`O Servidor está sendo executado na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro na inicialização do Banco de Dados:", error);
  });
