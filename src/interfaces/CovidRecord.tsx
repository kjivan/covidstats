export class CovidRecord {
  date = 0;
  state = "";
  positive = 0;
  negative = 0;
  pending = 0;
  hospitalizedCurrently = 0;
  hospitalizedCumulative = 0;
  inIcuCurrently = 0;
  inIcuCumulative = 0;
  onVentilatorCurrently = 0;
  onVentilatorCumulative = 0;
  recovered = 0;
  hash = "";
  dateChecked = "";
  death = 0;
  hospitalized = 0;
  total = 0;
  totalTestResults = 0;
  posNeg = 0;
  fips = "";
  deathIncrease = 0;
  hospitalizedIncrease = 0;
  negativeIncrease = 0;
  positiveIncrease = 0;
  totalTestResultsIncrease = 0;
}

export type CovidRecordKey = keyof CovidRecord;

