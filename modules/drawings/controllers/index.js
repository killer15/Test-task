
const listDrawings = async (req, res) => {
  const data = [];
  await global.base('drawings').select({
    // returnFieldsByFieldId: true
  }).eachPage(function page(records, fetchNextPage) {

    records.forEach(record => {
      const dt = {
          name: record.get('name'),
          modelModel: record.get('model_model') ?? [],
      }
      if (dt.modelModel.length){
        dt.modelModel = dt.modelModel.join(',');
      }
      data.push(dt)
    });

    fetchNextPage();
  });

  res.render(`${process.cwd()}/modules/drawings/views/index.ejs`, {data});
}

const getModels = async (req, res) => {
  let {models} = req.query;
  models = models?.split(',') || [];
  if (!models.length){
    return res.status(401).json({message: 'Data is incorrect'});
  }
  const data = [];
  let modelList = [];
  const promiseArray = []
  for (const model of models){
    promiseArray.push(global.base('model_model').find(model));
  }
  let result = await Promise.all(promiseArray);
  result.forEach(model => {
    modelList = [...modelList, ...model.get('number')];
  })
  promiseArray.length = 0;
  for (const model of modelList){
    promiseArray.push(global.base('models').find(model));
  }
  result = await Promise.all(promiseArray);
  result.forEach(model => {
    data.push({
      name: model.get('number')
    })
  })
  res.render(`${process.cwd()}/modules/drawings/views/model.ejs`, {data});
}

module.exports = {
  listDrawings,
  getModels
}