function status(request, response) {
  response.status(200).json({ chave: "Código 200, OK" });
}

export default status;
