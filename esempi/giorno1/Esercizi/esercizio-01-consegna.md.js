/* # Esercizio 1 — Calcolatrice da riga di comando

**Argomenti coinvolti:** primo script Node.js, `process.argv`, codice sincrono.

## Obiettivo

Scrivere uno script `calcolatrice.js` che riceva da riga di comando due numeri e
un'operazione, e stampi il risultato.

```bash
node calcolatrice.js 12 30 somma
# Risultato: 42

node calcolatrice.js 12 30 sottrazione
# Risultato: -18

node calcolatrice.js 12 30 moltiplicazione
# Risultato: 360

node calcolatrice.js 12 30 divisione
# Risultato: 0.4
```

## Requisiti

1. I tre argomenti (`primoNumero`, `secondoNumero`, `operazione`) vanno letti da
   `process.argv`.
2. Le operazioni supportate sono: `somma`, `sottrazione`, `moltiplicazione`, `divisione`.
3. Se l'operazione non è una di queste quattro, stampa un messaggio d'errore chiaro
   e termina (`process.exit(1)`) invece di proseguire.
4. Se manca uno dei tre argomenti, stampa le istruzioni d'uso e termina.
5. In caso di divisione per zero, stampa un messaggio d'errore invece di stampare
   `Infinity`.
6. Tutto il codice è **sincrono**: nessuna callback, nessuna Promise, nessun `fs`.

## Suggerimento

Ricorda che gli argomenti passati da riga di comando arrivano sempre come stringhe:
vanno convertiti in numero con `Number(...)` o `parseFloat(...)` prima di fare i calcoli.

La soluzione completa è in `esercizio-01-soluzione.js` (`npm run es:g1:01`).
 */

/* const args = process.argv.slice(2); */
/* const args = process.argv; */

/* if (args.length < 3) {
  console.error("Uso: node calcolatrice.js <primoNumero> <secondoNumero> <operazione>");
  console.error("Operazioni supportate: somma, sottrazione, moltiplicazione, divisione");
  process.exit(1);
} */

const primoNumero = Number(process.argv[2]);
const secondoNumero = Number(process.argv[3]);
const operazione = process.argv[4].toLowerCase();

if (isNaN(primoNumero) || isNaN(secondoNumero)) {
  console.error("Errore: I primi due argomenti devono essere numeri validi.");
  process.exit(1);
}

let risultato;

switch (operazione) {
  case "somma":
    risultato = primoNumero + secondoNumero;
    break;
  case "sottrazione":
    risultato = primoNumero - secondoNumero;
    break;
  case "moltiplicazione":
    risultato = primoNumero * secondoNumero;
    break;
  case "divisione":
    if (secondoNumero === 0) {
      console.error("Errore: Impossibile dividere per zero.");
      process.exit(1);
    }
    risultato = primoNumero / secondoNumero;
    break;
  default:
    console.error(`Errore: Operazione "${operazione}" non riconosciuta.`);
    console.error("Usa una tra: somma, sottrazione, moltiplicazione, divisione.");
    process.exit(1);
}

console.log(`Risultato: ${risultato}`);