import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);

  const sommaCifre = (n) =>
    n.toString().split("").reduce((a, b) => a + Number(b), 0);

  const riduci = (n) => {
    while (n > 22 && n !== 33) n = sommaCifre(n);
    return n;
  };

  const calcolaMatrice = (data) => {
    const [giorno, mese, anno] = data.split("/").map(Number);
    const giornoSomma = sommaCifre(giorno);
    const meseSomma = sommaCifre(mese);
    const annoSomma = sommaCifre(anno);
    const sommaTotale = giornoSomma + meseSomma + annoSomma;
    const centrale = riduci(sommaTotale);
    const uno = riduci(giorno);
    const due = riduci(mese);
    const tre = riduci(anno % 100);
    const quattro = riduci(uno + due);
    const cinque = riduci(uno + tre);
    const sei = riduci(due + tre);

    return {
      centrale,
      talenti: [uno, sei, cinque],
      ritratto: [uno, sei, cinque],
      relazioni: [sei, cinque, quattro],
      sessualita: [centrale, riduci(centrale + 8), 3],
      paure: [13, 3, 17],
      karmaMateriale: [9, 13, 4],
      karmaPaterno: [20, 3, 10],
      karmaMaterno: [12, 5, 20],
      generazionaliPaterni: [2, 12, 10],
      generazionaliMaterni: [10, 18],
      codaKarmica: [11, 17, 6],
      compiti: {
        personale: centrale,
        sociale: 8,
        spirituale: 3,
        universale: 11,
        annoCorrente: 5,
      },
    };
  };

  const handleGenerate = async () => {
    if (!birthdate) return;
    setLoading(true);
    setReading("");

    const matrice = calcolaMatrice(birthdate);

    const prompt = `Nome: ${name || "Viaggiatore"}
Data di nascita: ${birthdate}

Numeri della Matrice:
- Zona di Comfort: ${matrice.centrale}
- Zona dei Talenti: ${matrice.talenti.join(", ")}
- Zona del Ritratto: ${matrice.ritratto.join(", ")}
- Relazioni: ${matrice.relazioni.join(", ")}
- Sessualità: ${matrice.sessualita.join(", ")}
- Paure: ${matrice.paure.join(", ")}
- Karma Materiale: ${matrice.karmaMateriale.join(", ")}
- Karma Generazionale Paterno: ${matrice.karmaPaterno.join(", ")}
- Karma Generazionale Materno: ${matrice.karmaMaterno.join(", ")}
- Talenti Generazionali Paterni: ${matrice.generazionaliPaterni.join(", ")}
- Talenti Generazionali Materni: ${matrice.generazionaliMaterni.join(", ")}
- Coda Karmica: ${matrice.codaKarmica.join(", ")}
- Compiti Evolutivi:
  - Personale: ${matrice.compiti.personale}
  - Sociale: ${matrice.compiti.sociale}
  - Spirituale: ${matrice.compiti.spirituale}
  - Universale: ${matrice.compiti.universale}
  - Anno corrente: ${matrice.compiti.annoCorrente}

Chris, esegui ora un'analisi spirituale completa secondo il metodo Beloesolnce, basata sui numeri forniti.`;

    const res = await fetch("/api/chris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setReading(data.result);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Chris – Lettore della Matrice del Destino
      </h1>
      <p style={{ marginBottom: "1rem", maxWidth: "600px" }}>
        Inserisci il tuo nome e la tua data di nascita per ricevere una lettura spirituale personalizzata, secondo il metodo Beloesolnce.
      </p>
      <input
        placeholder="Nome e Cognome (opzionale)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <input
        placeholder="Data di nascita (es. 01/01/1998)"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ padding: "0.5rem 1rem", fontWeight: "bold" }}
      >
        {loading ? "Calcolo in corso..." : "Ricevi la tua Lettura"}
      </button>

      {reading && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Lettura di Chris
          </h2>
          <p>{reading}</p>
        </div>
      )}
    </div>
  );
}
