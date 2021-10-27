module.exports = {
  // Retourne une date au format "yyyy-mm-dd H:m:s" à partir d'un timestamp (donné ou le timestamp de la date et heure actuelles)
  datetime: (timestamp = new Date().getTime()) => {
    const D = new Date(timestamp);
    const P = num => (`00${ num }`).slice(-2);

    return `${ D.getFullYear() }-${ P(D.getMonth() + 1) }-${ P(D.getDate()) } ${ P(D.getHours()) }:${ P(D.getMinutes()) }:${ P(D.getSeconds()) }`;
  }
};
