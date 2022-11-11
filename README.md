![poster](./poster.png)

<section style="padding: 1rem; font-size: 1.4rem; background-color: #EC315A; color: #FFF4F1; border-radius: 4px; margin: 1rem 0;">
Hej och välkommen till detta lilla kodtest som kommer ta dig ca 1 - 2h att genomföra. Syftet med testet är <em>flexa dina utvecklar-muskler</em> samt <em>förse oss med samtalsunderlag vid inbokad avstämning.</em> Visa vad du går för! 
</section>

# Frontend / Mobilapp

## Om projektet

**Strajk bowling är en nyöppnad bowlinghall i centrala Bromölla. Ägaren K. Ägla gillar tekniska lösningar och har tillsammans med brorsonen Keso Ägla [designat en mockup](https://www.figma.com/file/67YvtKEq7iljjXqjGvJRMx/Strajk-1.0?node-id=0%3A1).**
**Herr Ägla är väldigt nöjd med designen och vill att appen ser ut och fungerar enligt angiven spec. Gränssnittet behöver endast vara anpassat efter mobila enheter.**

## Val av tekniker

Om inget annat gjorts upp, är du fri att välja språk och tekniker.

## Krav

**Användaren ska i frontend kunna:**

- Boka en bana för N antal personer
- Boka N antal skor
- Se en bekräftelse på sin bokning
- Checka in när det är strike-dags

| View Namn    | Funktionalitet                                                                                                                                                                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loading      | Kan visas vid inläsning av cachead sida. Optional.                                                                                                                                                                                                                                              |
| Booking      | Användaren ska kunna boka _datum_ och _tid_ samt ange _antal spelare_. Vid val av spelare skall formulär för skobokning dyka upp. Väljs ex. 3 spelare, dyker 3 inputfält upp. Vid knapp på strike skickas _request_ iväg till servern. Finns bana ej tillgäng skall detta visas i gränssnittet. |
| Confirmation | Vid ivägskickad request fås en bokning tillbaka inkl totalsumma ( 120kr / pers + 100kr / bana )och bokningsnummer.                                                                                                                                                                              |
| Check In     | Denna vy visas ( och scannas ) vid inchecking vid bokat tillfället. Tänk på det som en biljett.                                                                                                                                                                                                 |
| Meny         | Vid klick på _naviconen_ visas menyn på lämpligt sätt.                                                                                                                                                                                                                                          |

![screens](./screens.png)

# Backend

## Om projektet

**Strajk bowling är en nyöppnad bowlinghall i centrala Bromölla. Ägaren K. Ägla gillar tekniska lösningar och har tillsammans med brorsonen Keso Ägla [byggt en frontend](https://www.figma.com/file/67YvtKEq7iljjXqjGvJRMx/Strajk-1.0?node-id=0%3A1), och skissat ihop en kravspec för backendfunktionalitet. Ditt jobb är att bygga backenden.**

## Val av teknik

Om inget annat gjorts upp, är du fri att välja språk, tekniker och databas.

## Krav

**Backend ska ha följande egenskaper:**

- 6st bokningsbara banor tillgängliga mellan kl 9.00 och 22.00 varje dag.
- Visa ett REST API ta emot och validera `booking request` från frontend.
- Kika upp om banor finns tillgängliga önskad tid.
- _Om tillgänglig_, räkna ut totalt _pris_, generera _id_ samt _active_-egenskap för att aktivera bokning.
- _Om ej tillgänglig_, skicka 400-response och meddelandet "lane not available".
- Ta emot och validera bokning vid en `checkin request`.
- Spara banor samt bokningar i valfri databas.
- Visa banornas bokningar.

## API Spec

| Resurs   | Metod | Beskrivning                                                         |
| -------- | ----- | ------------------------------------------------------------------- |
| /book    | POST  | Validera input samt vid tillgänglig bana och tid, skapa en bokning. |
| /checkin | POST  | Validerar och checkar in.                                           |
| /lanes   | GET   | Returnerar array av `Lane`                                          |

## Booking Model

**Request**

```json
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43]
}
```

**Response**

```json
{
  "when": "2022-11-11T18:00",
  "lanes": 1,
  "people": 4,
  "shoes": [38, 39, 44, 43],
  "price": 580, // räknas ut på serversidan
  "id": "str7283472", // genereras på serversidan
  "active": true // anges på serversidan. Ändras av vid validering av bokning ( check in)
}
```

## Lane Model

```json
{
  "id": 1,
  "title": "Lane 1",
  "bookings": [Booking]
}
```
