export interface MetricFriendlyName {
  metric: string;
  friendlyName: string;
}

export const MetricFriendlyNames: MetricFriendlyName[] = [
  { metric: "positive", friendlyName: "Positive Tests" },
  { metric: "positiveIncrease", friendlyName: "New Positives" },
  { metric: "death", friendlyName: "Total Deaths" },
  { metric: "deathIncrease", friendlyName: "New Deaths" },
  { metric: "negative", friendlyName: "Negative Tests" },
  { metric: "negativeIncrease", friendlyName: "New Negatives" },
  { metric: "totalTestResults", friendlyName: "Total Tests" },
  { metric: "totalTestResultsIncrease", friendlyName: "New Tests" },
  { metric: "pending", friendlyName: "Pending Tests" },
  { metric: "hospitalizedCurrently", friendlyName: "Currently Hospitalized" },
  { metric: "hospitalizedCumulative", friendlyName: "Total Hospitalized" },
  { metric: "hospitalizedIncrease", friendlyName: "New Hospitalizations" },
  { metric: "inIcuCurrently", friendlyName: "Currently in ICU" },
  { metric: "inIcuCumulative", friendlyName: "Total ICU Patients" },
  { metric: "onVentilatorCurrently", friendlyName: "Currently on Ventilator" },
  {
    metric: "onVentilatorCumulative",
    friendlyName: "Total Ventilator Patients"
  },
  { metric: "recovered", friendlyName: "Total Recovered Patients" }
];
