function jourtravaille(date) {
  const joursFeries = [
    "2020-01-01", "2020-04-13", "2020-05-01", "2020-05-08",
    "2020-05-21", "2020-06-01", "2020-07-14", "2020-08-15",
    "2020-11-01", "2020-11-11", "2020-12-25"
  ];

  const jour = date.getDate();
  const mois = date.getMonth() + 1;
  const annee = date.getFullYear();
  const jourSemaine = date.getDay();

  const dateStr = `${annee}-${String(mois).padStart(2, '0')}-${String(jour).padStart(2, '0')}`;

  if (joursFeries.includes(dateStr)) {
    console.log(`Le ${jour}/${mois}/${annee} est un jour férié`);
  } else if (jourSemaine === 0 || jourSemaine === 6) {
    console.log(`Non, le ${jour}/${mois}/${annee} est un week-end`);
  } else {
    console.log(`Oui, le ${jour}/${mois}/${annee} est un jour travaillé`);
  }
}
