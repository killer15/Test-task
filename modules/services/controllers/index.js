
const DAYS = {
  'day': 1,
  'week': 7,
  'month': 30,
  'year': 365
}

const _formatDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return `${yyyy}-${mm}-${dd}`;
}

const _processDate = (calendarIntervalUnit, calendarInterval, runningHoursInterval) => {
  const listDate = [];
  if (runningHoursInterval){
    calendarIntervalUnit = 'day';
    calendarInterval = runningHoursInterval/24;
  }
  for (let i = 1; i <= calendarInterval; i++){
    let today = new Date();
    today.setDate(today.getDate() + DAYS[calendarIntervalUnit] + i * DAYS[calendarIntervalUnit]);
    listDate.push(_formatDate(today))
  }
  return listDate;
}

const listServices = async (req, res) => {
  const data = [];
  await global.base('services').select({
    // returnFieldsByFieldId: true
  }).eachPage(function page(records, fetchNextPage) {

    records.forEach(record => {
      const dt = {
          name: record.get('name'),
          calendarInterval: record.get('calendar_interval'),
          calendarIntervalUnit: record.get('calendar_interval_unit'),
          runningHoursInterval: record.get('running_hours_interval'),
      }
      dt.listDate = _processDate(dt.calendarIntervalUnit, dt.calendarInterval, dt.runningHoursInterval);
      data.push(dt)
    });

    fetchNextPage();
  });

  res.render(`${process.cwd()}/modules/services/views/index.ejs`, {data});
}

module.exports = {
  listServices
}