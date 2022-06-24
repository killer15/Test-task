

const listModels = async (req, res) => {
  const data = [];
  let route = null;
  let html = '<li>';
  const _processTree = (children) => {
    html += `<ul>`;
    children.forEach(c => {
      data.forEach(dt => {
        if(dt.parents.includes(c)){
          html += `<li><span>${dt.name}</span>`;
          if (dt.children.length){
            _processTree(dt.children);
          }else{
            html += '</li>';
          }
        }
      })
    });
    html += `</ul>`;
  }
  await global.base('models').select({
    // returnFieldsByFieldId: true
  }).eachPage(function page(records, fetchNextPage) {

    records.forEach(record => {
      const dt = {
          name: record.get('number'),
          parents: record.get('parents') ?? [],
          children: record.get('children') ?? []
      }

      if (!dt.parents.length){
        route = dt;
      }else{
        data.push(dt)
      }
    });

    fetchNextPage();
  });
  html += `<span>${route.name}</span>`
  html += '<ul>';
  _processTree(route.children)
  html += '</ul>';
  html += '</li>'

  res.render(`${process.cwd()}/modules/models/views/index.ejs`, {html});
}

module.exports = {
  listModels
}