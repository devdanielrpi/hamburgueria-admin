export default function CupomTeste() {
  const produtos = [
    { nome: "X-Burguer", qtd: 2, preco: 18.5 },
    { nome: "Batata Frita", qtd: 1, preco: 12.0 },
    { nome: "Refrigerante", qtd: 2, preco: 6.0 },
  ];

  const total = produtos.reduce(
    (acc, item) => acc + item.qtd * item.preco,
    0
  );

  const imprimirRAWBT = () => {
    let cupom = "";

    cupom += "      HAMBURGUERIA TESTE\n";
    cupom += "==============================\n";
    cupom += "PEDIDO #001\n";
    cupom += "------------------------------\n";

    produtos.forEach((item) => {
      const subtotal = item.qtd * item.preco;

      cupom += `${item.qtd}x ${item.nome}\n`;
      cupom += `R$ ${subtotal.toFixed(2)}\n`;
    });

    cupom += "------------------------------\n";
    cupom += `TOTAL: R$ ${total.toFixed(2)}\n`;
    cupom += "PAGAMENTO: PIX\n";
    cupom += "==============================\n";
    cupom += "Obrigado!\n\n\n";

    try {
      const textoCodificado = btoa(
        unescape(encodeURIComponent(cupom))
      );

      const rawbtUrl =
        `rawbt:base64,${textoCodificado}`;

      window.open(rawbtUrl, "_self");
    } catch (error) {
      console.error(error);
      alert("Erro ao abrir RAWBT");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Teste RAWBT</h2>

      {produtos.map((produto, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <strong>{produto.nome}</strong>
          <p>Qtd: {produto.qtd}</p>
          <p>Preço: R$ {produto.preco}</p>
        </div>
      ))}

      <h3>Total: R$ {total.toFixed(2)}</h3>

      <button
        onClick={imprimirRAWBT}
        style={{
          width: "100%",
          padding: 14,
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 8,
        }}
      >
        Imprimir Cupom
      </button>
    </div>
  );
}