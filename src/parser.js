const DATEINDEX = 2;
const USAGEINDEX = 4;
const CREDITORINDEX = 7;
const TARGETINDEX = 11;
const VALUEINDEX = 14;

export const Parser = function (rawData) {
  const turnover = {
    rawData,
    rawRows: rawData.split('\n'),
    entries: rawData.split('\n').map(item => item.split(';')),
    creditors: {}
  };
  turnover.entries.splice(0, 1);
  turnover.entries.forEach(item => {
    item = item.map(entry => entry.replace('"', '').replace('"', ''));
    if (_.isEmpty(item) || item.length !== 17) {
      return;
    }
    if (!_.has(turnover.creditors, item[TARGETINDEX])) {
      turnover.creditors[item[TARGETINDEX]] = {
        id: item[TARGETINDEX],
        entries: []
      }
    }
    turnover.creditors[item[TARGETINDEX]].entries.push({
      date: item[DATEINDEX],
      usage: item[USAGEINDEX],
      creditor: item[CREDITORINDEX],
      target: item[TARGETINDEX],
      value: _.toNumber(item[VALUEINDEX].replace(",", "."))
    })
  });

  Object.keys(turnover.creditors).forEach(key=>{
    turnover.creditors[key].sum = turnover.creditors[key].entries.reduce((prev, cur)=> prev += cur.value, 0);
  });

  return turnover;
}