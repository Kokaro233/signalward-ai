# Evaluation status
Automated checks use mocked model transport. They verify reconciliation, malformed response rejection, no risk conclusion in reviewer input, and image dependency disclosure. They do not measure model accuracy.

`evaluation-cases.json` contains 12 synthetic proposed cases: 4 ordinary, 4 explicit scams, 4 ambiguous. Expected labels are provisional human judgments. No live outcomes have been collected. Run each through the live API after configuring both providers; record raw outputs, false alarms, missed warnings, unsupported claims, disagreements, model IDs and dates. Do not publish an accuracy statistic from these fixtures.
