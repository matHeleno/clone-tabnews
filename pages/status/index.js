import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  console.log(fetchAPI("/api/v1/status"));
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <Database />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 60000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <h2>Última atualização: {updatedAtText}</h2>;
}

function Database() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);

  let dataBaseInfo = "Carregando...";

  if (!isLoading && data) {
    dataBaseInfo = data.dependecies.database;
  }

  return (
    <div>
      <h2>Banco de dados:</h2>
      <h3>Versão: {dataBaseInfo.version}</h3>
      <h3>Máximo de conexões: {dataBaseInfo.max_connections}</h3>
      <h3>Conexões abertas: {dataBaseInfo.used_connections}</h3>
    </div>
  );
}
