import { Næring, Næringskode5Siffer } from '../enhetsregisteret/domene/underenhet';

const næringsbeskrivelser = [
    { kode: '01', navn: 'Jordbruk og tjenester tilknyttet jordbruk, jakt og viltstell' },
    { kode: '02', navn: 'Skogbruk og tjenester tilknyttet skogbruk' },
    { kode: '03', navn: 'Fiske, fangst og akvakultur' },
    { kode: '05', navn: 'Bryting av steinkull og brunkull' },
    { kode: '06', navn: 'Utvinning av råolje og naturgass' },
    { kode: '07', navn: 'Bryting av metallholdig malm' },
    { kode: '08', navn: 'Bryting og bergverksdrift ellers' },
    { kode: '09', navn: 'Tjenester tilknyttet bergverksdrift og utvinning' },
    { kode: '10', navn: 'Produksjon av nærings- og nytelsesmidler' },
    { kode: '11', navn: 'Produksjon av drikkevarer' },
    { kode: '12', navn: 'Produksjon av tobakksvarer' },
    { kode: '13', navn: 'Produksjon av tekstiler' },
    { kode: '14', navn: 'Produksjon av klær' },
    { kode: '15', navn: 'Produksjon av lær og lærvarer' },
    {
        kode: '16',
        navn: 'Produksjon av trelast og varer av tre, kork, strå og flettematerialer, unntatt møbler',
    },
    { kode: '17', navn: 'Produksjon av papir og papirvarer' },
    { kode: '18', navn: 'Trykking og reproduksjon av innspilte opptak' },
    { kode: '19', navn: 'Produksjon av kull- og raffinerte petroleumsprodukter' },
    { kode: '20', navn: 'Produksjon av kjemikalier og kjemiske produkter' },
    { kode: '21', navn: 'Produksjon av farmasøytiske råvarer og preparater' },
    { kode: '22', navn: 'Produksjon av gummi- og plastprodukter' },
    { kode: '23', navn: 'Produksjon av andre ikke-metallholdige mineralprodukter' },
    { kode: '24', navn: 'Produksjon av metaller' },
    { kode: '25', navn: 'Produksjon av metallvarer, unntatt maskiner og utstyr' },
    { kode: '26', navn: 'Produksjon av datamaskiner og elektroniske og optiske produkter' },
    { kode: '27', navn: 'Produksjon av elektrisk utstyr' },
    {
        kode: '28',
        navn: 'Produksjon av maskiner og utstyr til generell bruk, ikke nevnt annet sted',
    },
    { kode: '29', navn: 'Produksjon av motorvogner og tilhengere' },
    { kode: '30', navn: 'Produksjon av andre transportmidler' },
    { kode: '31', navn: 'Produksjon av møbler' },
    { kode: '32', navn: 'Annen industriproduksjon' },
    { kode: '33', navn: 'Reparasjon og installasjon av maskiner og utstyr' },
    { kode: '35', navn: 'Elektrisitets-, gass-, damp- og varmtvannsforsyning' },
    { kode: '36', navn: 'Uttak fra kilde, rensing og distribusjon av vann' },
    { kode: '37', navn: 'Oppsamling og behandling av avløpsvann' },
    { kode: '38', navn: 'Innsamling, behandling, disponering og gjenvinning av avfall' },
    { kode: '39', navn: 'Miljørydding, miljørensing og lignende virksomhet' },
    { kode: '41', navn: 'Oppføring av bygninger' },
    { kode: '42', navn: 'Anleggsvirksomhet' },
    { kode: '43', navn: 'Spesialisert bygge- og anleggsvirksomhet' },
    { kode: '45', navn: 'Handel med og reparasjon av motorvogner' },
    { kode: '46', navn: 'Agentur- og engroshandel, unntatt med motorvogner' },
    { kode: '47', navn: 'Detaljhandel, unntatt med motorvogner' },
    { kode: '49', navn: 'Landtransport og rørtransport' },
    { kode: '50', navn: 'Sjøfart' },
    { kode: '51', navn: 'Lufttransport' },
    { kode: '52', navn: 'Lagring og andre tjenester tilknyttet transport' },
    { kode: '53', navn: 'Post og distribusjonsvirksomhet' },
    { kode: '55', navn: 'Overnattingsvirksomhet' },
    { kode: '56', navn: 'Serveringsvirksomhet' },
    { kode: '58', navn: 'Forlagsvirksomhet' },
    {
        kode: '59',
        navn: 'Film-, video- og fjernsynsprogramproduksjon, utgivelse av musikk- og lydopptak',
    },
    { kode: '60', navn: 'Radio- og fjernsynskringkasting' },
    { kode: '61', navn: 'Telekommunikasjon' },
    { kode: '62', navn: 'Tjenester tilknyttet informasjonsteknologi' },
    { kode: '63', navn: 'Informasjonstjenester' },
    { kode: '64', navn: 'Finansieringsvirksomhet' },
    {
        kode: '65',
        navn: 'Forsikringsvirksomhet og pensjonskasser, unntatt trygdeordninger underlagt offentlig forvaltning',
    },
    { kode: '66', navn: 'Tjenester tilknyttet finansierings- og forsikringsvirksomhet' },
    { kode: '68', navn: 'Omsetning og drift av fast eiendom' },
    { kode: '69', navn: 'Juridisk og regnskapsmessig tjenesteyting' },
    { kode: '70', navn: 'Hovedkontortjenester, administrativ rådgivning' },
    {
        kode: '71',
        navn: 'Arkitektvirksomhet og teknisk konsulentvirksomhet, og teknisk prøving og analyse',
    },
    { kode: '72', navn: 'Forskning og utviklingsarbeid' },
    { kode: '73', navn: 'Annonse- og reklamevirksomhet og markedsundersøkelser' },
    { kode: '74', navn: 'Annen faglig, vitenskapelig og teknisk virksomhet' },
    { kode: '75', navn: 'Veterinærtjenester' },
    { kode: '77', navn: 'Utleie- og leasingvirksomhet' },
    { kode: '78', navn: 'Arbeidskrafttjenester' },
    { kode: '79', navn: 'Reisebyrå- og reisearrangørvirksomhet og tilknyttede tjenester' },
    { kode: '80', navn: 'Vakttjeneste og etterforsking' },
    { kode: '81', navn: 'Tjenester tilknyttet eiendomsdrift' },
    { kode: '82', navn: 'Annen forretningsmessig tjenesteyting' },
    {
        kode: '84',
        navn: 'Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning',
    },
    { kode: '85', navn: 'Undervisning' },
    { kode: '86', navn: 'Helsetjenester' },
    { kode: '87', navn: 'Pleie- og omsorgstjenester i institusjon' },
    { kode: '88', navn: 'Sosiale omsorgstjenester uten botilbud' },
    { kode: '90', navn: 'Kunstnerisk virksomhet og underholdningsvirksomhet' },
    { kode: '91', navn: 'Drift av biblioteker, arkiver, museer og annen kulturvirksomhet' },
    { kode: '92', navn: 'Lotteri og totalisatorspill' },
    { kode: '93', navn: 'Sports- og fritidsaktiviteter og drift av fornøyelsesetablissementer' },
    { kode: '94', navn: 'Aktiviteter i medlemsorganisasjoner' },
    {
        kode: '95',
        navn: 'Reparasjon av datamaskiner, husholdningsvarer og varer til personlig bruk',
    },
    { kode: '96', navn: 'Annen personlig tjenesteyting' },
    { kode: '97', navn: 'Lønnet arbeid i private husholdninger' },
    { kode: '99', navn: 'Internasjonale organisasjoner og organer' },
];

export const næringskodeTilNæring = (næringskode?: Næringskode5Siffer): Næring | undefined => {
    if (næringskode === undefined || næringskode.kode.length < 2) {
        return undefined;
    }
    const næring = næringskode.kode.substring(0, 2);
    return { kode: næring, beskrivelse: mapTilNæringsbeskrivelse(næring) };
};

export const mapTilNæringsbeskrivelse = (næringskode2siffer: string): string | undefined =>
    næringsbeskrivelser.find((beskrivelse) => beskrivelse.kode === næringskode2siffer)?.navn;
